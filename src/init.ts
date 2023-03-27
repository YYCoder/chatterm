import chalk from 'chalk';
import { Configuration, OpenAIApi } from 'openai';

export let openai: OpenAIApi;

export const init = () => {
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
    const configuration = new Configuration({
        organization: process.env.ORGANIZATION,
        apiKey: process.env.OPENAI_API_KEY
    });
    openai = new OpenAIApi(configuration);
};
