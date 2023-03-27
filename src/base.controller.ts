import { debug as rawDebug } from 'debug';
import { EventBus } from './event-bus';

type BaseOptions = {
    name: string;
    eventBus: EventBus;
};

export class BaseController {
    protected debug: ReturnType<rawDebug.IDebug>;
    protected eventBus: EventBus;
    protected name: string;

    constructor(opt: BaseOptions) {
        const { name, eventBus } = opt;
        this.eventBus = eventBus;
        this.name = name;
        this.debug = rawDebug(`${name}`);
    }
}
