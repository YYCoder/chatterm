import chalk from 'chalk';
import { marked } from 'marked';
import { DEFAULT_ERR_MSG } from './constants';
import { Prompt, PromptType } from './types';

export const sleep = (timeout = 1000) =>
    new Promise((resolve) => setTimeout(resolve, timeout));

export const logJson = (arg: any) => console.log(JSON.stringify(arg, null, 4));

export const genInquirerOptFromPrompt = (prompt: Prompt): any => {
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

export const handleError = (err: any) => {
    console.error(chalk.bold.redBright(`Error: ${err.message}`));
    console.error(marked(err.stack));
    process.exit(1);
};
