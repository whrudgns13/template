import { OpenApiRequestBuilder } from '@sap-cloud-sdk/openapi';
import type { BusinessEventsResponseCollection, BusinessEventTypeResponseObject } from './schema';
export declare const EventsApi: {
    getBusinessEvents: (queryParameters?: {
        'entityId'?: string[];
        'entityType'?: string[];
        'eventType'?: string[];
        'fromActionTime'?: number;
        'fromCreationTime'?: number;
        'id'?: number[];
        'pageNum'?: number;
        'pageSize'?: number;
        'sortField'?: string;
        'sortOrder'?: 'ASC' | 'DESC';
        'toActionTime'?: number;
        'toCreationTime'?: number;
    }) => OpenApiRequestBuilder<BusinessEventsResponseCollection>;
    getBusinessEventTypes: () => OpenApiRequestBuilder<BusinessEventTypeResponseObject>;
};
