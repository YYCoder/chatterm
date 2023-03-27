#! /usr/bin/env node

/* eslint-disable node/shebang */
import chalk from 'chalk';
import inquirer from 'inquirer';
import inquirerPrompt from 'inquirer-autocomplete-prompt';
import { marked } from 'marked';
import TerminalRenderer from 'marked-terminal';
import * as Rx from 'rxjs';
import { ChatController } from './chat.controller';
import { eventBus } from './event-bus';
import { init } from './init';
import { InquirerAnswerData } from './types';
import { handleError } from './utils';

inquirer.registerPrompt('autocomplete', inquirerPrompt);

marked.setOptions({
    // Define custom renderer
    renderer: new TerminalRenderer()
});

const prompts = new Rx.Subject();

export const main = async () => {
    try {
        init();
    } catch (err) {
        handleError(err);
    }

    const chatController = new ChatController(eventBus, prompts);

    inquirer.prompt(prompts).ui.process.subscribe(
        (data: InquirerAnswerData) => {
            eventBus.emit('data', data);
        },
        handleError,
        () => {
            console.log(chalk.bold.bgCyan('done, have a good day!'));
        }
    );

    chatController.pushPrompt();
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
process.on('unhandledRejection', (reason, promise) => {
    console.error(chalk.bold.redBright('[UnhandledRejection]:'), promise);
});
