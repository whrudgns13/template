import { Injectable } from '@nestjs/common';
import {EventsApi} from "../../APIEventsService/events-api";
@Injectable()
export class EventsService {
    private destination = { destinationName: 'cis' };
    async getEvents(){
        const events = await EventsApi.getBusinessEvents().execute(this.destination);
        return events;
    }
}
