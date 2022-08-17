import type { BusinessEventResponseObject } from './business-event-response-object';
export declare type BusinessEventsResponseCollection = {
    'events'?: BusinessEventResponseObject[];
    'morePages'?: boolean;
    'pageNum'?: number;
    'total'?: number;
    'totalPages'?: number;
} | Record<string, any>;
