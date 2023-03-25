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
    request?: string | null;
    response?: ChatCompletionResponseMessage | null;
};
