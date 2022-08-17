import { EventsService } from './events.service';
export declare class EventsController {
    private readonly eventsService;
    constructor(eventsService: EventsService);
    getEvents(): Promise<import("../../APIEventsService").BusinessEventsResponseCollection>;
}
