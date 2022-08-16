/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { OpenApiRequestBuilder } from '@sap-cloud-sdk/openapi';
import type { BusinessEventsResponseCollection, BusinessEventTypeResponseObject } from './schema';
/**
 * Representation of the 'EventsApi'.
 * This API is part of the 'APIEventsService' service.
 */
export const EventsApi = {
  /**
   * Get all events associated with administrative operations in your global accounts.<br/> The events you get depend on the scopes you used to access the API.<br/>To learn more about the scopes, see [SAP Cloud Management Service - Service Plans](https://help.sap.com/viewer/65de2977205c403bbc107264b8eccf4b/Cloud/en-US/a508b724bf6d457ca7ac024b8e4b8457.html).<br/><br/>Required scope: $XSAPPNAME.event.read
   * @param queryParameters - Object containing the following keys: entityId, entityType, eventType, fromActionTime, fromCreationTime, id, pageNum, pageSize, sortField, sortOrder, toActionTime, toCreationTime.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  getBusinessEvents: (queryParameters?: {'entityId'?: string[],
  'entityType'?: string[],
  'eventType'?: string[],
  'fromActionTime'?: number,
  'fromCreationTime'?: number,
  'id'?: number[],
  'pageNum'?: number,
  'pageSize'?: number,
  'sortField'?: string,
  'sortOrder'?: 'ASC' | 'DESC',
  'toActionTime'?: number,
  'toCreationTime'?: number}) => new OpenApiRequestBuilder<BusinessEventsResponseCollection>(
    'get',
    '/cloud-management/v1/events',
    {
          queryParameters
        }
  ),
  /**
   * Get all available event types, including their categories and their available search parameters.<br/>The event types you get are either for a central or for a local region, and the region you get depends on the scopes you used to access the API.<br/> To learn more about the scopes, see [SAP Cloud Management Service - Service Plans](https://help.sap.com/viewer/65de2977205c403bbc107264b8eccf4b/Cloud/en-US/a508b724bf6d457ca7ac024b8e4b8457.html).<br/><br/>Required scope: $XSAPPNAME.event.read
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  getBusinessEventTypes: () => new OpenApiRequestBuilder<BusinessEventTypeResponseObject>(
    'get',
    '/cloud-management/v1/events/types'
  )
};
