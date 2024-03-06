import { IEventBus } from './interface';
export declare class EventBus implements IEventBus {
    private eventBusCore;
    private areFuncEqual;
    private isKeyValueObjInArr;
    private removeFuncInFuncArr;
    private getKeyValueObjInArr;
    private addEvent;
    add(eventName: any, callbacks: any): void;
    remove(eventName: any, callbacks: any): never[] | undefined;
    trigger(eventName: any, data: any): void;
}
