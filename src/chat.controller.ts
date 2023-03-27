import chalk from 'chalk';
import { marked } from 'marked';
import {
    ChatCompletionRequestMessage,
    ChatCompletionResponseMessage,
    CreateCompletionResponseUsage
} from 'openai';
import * as Rx from 'rxjs';
import Spinnies from 'spinnies';
import { v4 as uuid } from 'uuid';
import { BaseController } from './base.controller';
import {
    DEFAULT_ERR_MSG,
    ERROR_TOKEN_COUNT,
    WARN_TOKEN_COUNT
} from './constants';
import { EventBus } from './event-bus';
import { openai } from './init';
import { InquirerAnswerData, Prompt, PromptType } from './types';
import { genInquirerOptFromPrompt, handleError } from './utils';

const USER_PREFIX = chalk.bold.bgBlackBright('You >');
const GPT_35_MODEL = 'gpt-3.5-turbo';

export class ChatController extends BaseController {
    messages: ChatCompletionRequestMessage[] = [
        {
            role: 'system',
            content: 'You are a helpful assistant.'
        }
    ];
    private readonly promptHistory: string[] = [];
    private readonly spinnies: any = new Spinnies();
    private readonly prompts: Rx.Subject<unknown>;
    private readonly promptMap: Map<string, Prompt> = new Map();

    constructor(eventBus: EventBus, prompts: Rx.Subject<unknown>) {
        super({
            eventBus,
            name: 'ChatController'
        });

        this.prompts = prompts;
        eventBus.on('data', this.handleData);
    }

    private readonly generateRespContent = (
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

    public pushPrompt = (prompt?: Prompt | string): string => {
        let p: Prompt;
        if (!prompt) {
            p = {
                id: uuid(),
                type: PromptType.SingleLine,
                prefix: USER_PREFIX,
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
        this.promptHistory.push(p.id);
        this.promptMap.set(p.id, p);
        this.prompts.next(genInquirerOptFromPrompt(p));
        return p.id;
    };

    private readonly handleData = async (data: InquirerAnswerData) => {
        let role = '';
        const { answer = '', name: promptId } = data;
        // update the prompt
        const prompt = this.promptMap.get(promptId);
        if (!prompt) throw new Error(DEFAULT_ERR_MSG);
        if (answer === '/mode') {
            // select input type
            this.pushPrompt({
                id: uuid(),
                type: PromptType.List,
                prefix: 'please select an input type',
                choices: ['single-line', 'multi-line']
            });
            return;
        } else if (answer === 'single-line') {
            this.pushPrompt();
            return;
        } else if (answer === 'multi-line') {
            this.pushPrompt({
                id: uuid(),
                type: PromptType.MultiLine,
                prefix: USER_PREFIX
            });
            return;
        }

        prompt.request = answer;
        this.messages.push({
            role: 'user',
            content: `${answer}`
        });
        const req = {
            messages: this.messages,
            model: GPT_35_MODEL
        };
        try {
            this.spinnies.add(promptId, {
                text: chalk.bold.bgCyan(
                    `🤖 ${role ? ' ' + role : ''} Thinking...`
                )
            });
            const { data: resp } = await openai.createChatCompletion(req);
            const { usage } = resp ?? {};
            const { message } = resp.choices?.[0] ?? {};
            prompt.response = message;
            // logJson(message);

            this.spinnies.succeed(promptId, {
                text: this.generateRespContent(message, usage)
            });

            // add new prompt
            this.pushPrompt();
        } catch (err) {
            handleError(err);
        }
    };
}
