import chalk from 'chalk';
import inquirer from 'inquirer';
import inquirerPrompt from 'inquirer-autocomplete-prompt';
import { marked } from 'marked';
import TerminalRenderer from 'marked-terminal';
import {
    ChatCompletionRequestMessage,
    ChatCompletionResponseMessage,
    Configuration,
    CreateCompletionResponseUsage,
    OpenAIApi
} from 'openai';
import * as Rx from 'rxjs';
import Spinnies from 'spinnies';
import { v4 as uuid } from 'uuid';
import {
    DEFAULT_ERR_MSG,
    ERROR_TOKEN_COUNT,
    WARN_TOKEN_COUNT
} from './constants';
import { Prompt, PromptType } from './types';

inquirer.registerPrompt('autocomplete', inquirerPrompt);

const spinnies = new Spinnies();

marked.setOptions({
    // Define custom renderer
    renderer: new TerminalRenderer()
});

const handleError = (err: any) => {
    console.error(chalk.bold.redBright(`Error: ${err.message}`));
    console.error(marked(err.stack));
    process.exit(1);
};

const userPrefix = chalk.bold.bgBlackBright('You >');

let openai: OpenAIApi;
let configuration: Configuration;
const GPT_35_MODEL = 'gpt-3.5-turbo';

const init = () => {
    if (typeof process.env.ORGANIZATION === 'undefined') {
        console.error(
            chalk.bold.redBright('must provide ORGANIZATION in environment')
        );
        process.exit(1);
    }
    if (typeof process.env.OPENAI_API_KEY === 'undefined') {
        console.error(
            chalk.bold.redBright('must provide OPENAI_API_KEY in environment')
        );
        process.exit(1);
    }
    configuration = new Configuration({
        organization: process.env.ORGANIZATION,
        apiKey: process.env.OPENAI_API_KEY
    });
    openai = new OpenAIApi(configuration);
};

const chatHistory: string[] = [];
const promptMap = new Map<string, Prompt>();
const prompts = new Rx.Subject();
const pushPrompt = (prompt?: Prompt | string): string => {
    let p: Prompt;
    if (!prompt) {
        p = {
            id: uuid(),
            type: PromptType.SingleLine,
            prefix: userPrefix,
            request: null,
            response: null
        };
    } else if (typeof prompt === 'string') {
        p = {
            id: uuid(),
            type: PromptType.SingleLine,
            prefix: prompt,
            request: null,
            response: null
        };
    } else {
        p = {
            id: uuid(),
            ...prompt
        };
    }
    chatHistory.push(p.id);
    promptMap.set(p.id, p);
    prompts.next(genInquirerOptFromPrompt(p));
    return p.id;
};
const genInquirerOptFromPrompt = (prompt: Prompt): any => {
    const { id, type, prefix, choices } = prompt;
    let opt: any;
    if (type === PromptType.SingleLine) {
        opt = {
            type: 'autocomplete',
            suggestOnly: true,
            name: id,
            message: prefix,
            searchText: ' ',
            emptyText: ' ',
            source: async (_, s: string) => {
                if (s?.startsWith?.('/')) {
                    return ['/mode'].filter((cmd) => cmd.startsWith(s));
                }
                return [];
            }
        };
    } else if (type === PromptType.MultiLine) {
        opt = {
            type: 'editor',
            name: id,
            message: prefix
        };
    } else if (type === PromptType.List) {
        opt = {
            choices,
            type: 'list',
            name: id,
            message: prefix
        };
    } else {
        throw new Error(DEFAULT_ERR_MSG);
    }
    return opt;
};

const generateRespContent = (
    message: ChatCompletionResponseMessage,
    usage: CreateCompletionResponseUsage
): string => {
    const { content, role } = message ?? {};
    const {
        total_tokens = 0,
        prompt_tokens = 0,
        completion_tokens = 0
    } = usage ?? {};
    let tokenContent = `total tokens: ${total_tokens}, prompt_tokens: ${prompt_tokens} completion_tokens: ${completion_tokens}`;
    if (total_tokens < WARN_TOKEN_COUNT) {
        tokenContent = chalk.bold.greenBright(tokenContent);
    } else if (
        total_tokens > WARN_TOKEN_COUNT &&
        total_tokens < ERROR_TOKEN_COUNT
    ) {
        tokenContent = chalk.bold.yellowBright(tokenContent);
    } else {
        tokenContent = chalk.bold.redBright(tokenContent);
    }

    return `${chalk.bold.bgCyan(`🤖 ${role ? ' ' + role : ''} >`)}
${marked(content) ?? ''}${tokenContent}`;
};

const main = async () => {
    try {
        init();
    } catch (err) {
        handleError(err);
    }

    const messages: ChatCompletionRequestMessage[] = [
        {
            role: 'system',
            content: 'You are a helpful assistant.'
        }
    ];

    inquirer.prompt(prompts).ui.process.subscribe(
        async (data) => {
            let role = '';
            const { answer = '', name: promptId } = data;
            // update the prompt
            const prompt = promptMap.get(promptId);
            if (!prompt) throw new Error(DEFAULT_ERR_MSG);
            if (answer === '/mode') {
                // select input type
                pushPrompt({
                    id: uuid(),
                    type: PromptType.List,
                    prefix: 'please select an input type',
                    choices: ['single-line', 'multi-line']
                });
                return;
            } else if (answer === 'single-line') {
                pushPrompt();
                return;
            } else if (answer === 'multi-line') {
                pushPrompt({
                    id: uuid(),
                    type: PromptType.MultiLine,
                    prefix: userPrefix
                });
                return;
            }

            prompt.request = answer;
            messages.push({
                role: 'user',
                content: answer
            });
            const req = {
                messages,
                model: GPT_35_MODEL
            };
            try {
                spinnies.add(promptId, {
                    text: chalk.bold.bgCyan(
                        `🤖 ${role ? ' ' + role : ''} Thinking...`
                    )
                });
                const { data: resp } = await openai.createChatCompletion(req);
                const { usage } = resp ?? {};
                const { message } = resp.choices?.[0] ?? {};
                prompt.response = message;
                // logJson(message);

                spinnies.succeed(promptId, {
                    text: generateRespContent(message, usage)
                });

                // add new prompt
                pushPrompt();
            } catch (err) {
                handleError(err);
            }
        },
        handleError,
        () => {
            console.log(chalk.bold.bgCyan('done, have a good day!'));
        }
    );

    pushPrompt();
};

main();

process.on('SIGINT', () => {
    console.error('[CaughtSignal]: SIGINT');
    process.exit(1);
});
process.on('SIGTERM', () => {
    console.error('[CaughtSignal]: SIGTERM');
    process.exit(1);
});
process.on('uncaughtException', (err) => {
    console.error(
        chalk.bold.redBright('[UncaughtException]:'),
        marked(err.stack)
    );
});
process.on('unhandledRejection', (reason, _) => {
    console.error(
        chalk.bold.redBright('[UnhandledRejection]:'),
        marked(reason.toString())
    );
});
