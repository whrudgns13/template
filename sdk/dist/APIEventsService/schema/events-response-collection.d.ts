import type { EventResponseObject } from './event-response-object';
export declare type EventsResponseCollection = {
    'events'?: EventResponseObject[];
    'morePages'?: boolean;
    'pageNum'?: number;
    'total'?: number;
    'totalPages'?: number;
} | Record<string, any>;
