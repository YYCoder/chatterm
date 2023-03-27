import { ChatCompletionResponseMessage } from 'openai';

export const enum PromptType {
    SingleLine = 1,
    MultiLine,
    List,
    Confirm
}

export type Prompt = {
    id: string;
    type: PromptType;
    prefix: string;
    choices?: string[];
    request?: InquirerAnswer;
    response?: ChatCompletionResponseMessage | null;
};

export type InquirerAnswer = boolean | string | number;

export type InquirerAnswerData = {
    name: string;
    answer: InquirerAnswer;
};
