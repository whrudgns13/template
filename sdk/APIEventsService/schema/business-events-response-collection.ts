/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
    import type { BusinessEventResponseObject } from './business-event-response-object';
    /**
     * Representation of the 'BusinessEventsResponseCollection' schema.
     */
    export type BusinessEventsResponseCollection = {
      /**
       * Lists of the events associated with the API call and used scopes.
       */
      'events'?: BusinessEventResponseObject[];
      /**
       * Whether there are more pages.
       */
      'morePages'?: boolean;
      /**
       * The current page number.
       * Format: "int32".
       */
      'pageNum'?: number;
      /**
       * Total numbers of results.
       * Format: "int64".
       */
      'total'?: number;
      /**
       * Total numbers of pages.
       * Format: "int64".
       */
      'totalPages'?: number;
    } | Record<string, any>;
