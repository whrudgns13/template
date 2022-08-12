/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
    import type { ScimUser } from './scim-user';
    /**
     * Representation of the 'ScimUsers' schema.
     */
    export type ScimUsers = {
      'resources'?: ScimUser[];
      /**
       * Specifies the index of the first response page in the current set of search results.
       * Default: 1.
       */
      'startIndex'?: number;
      /**
       * Specifies the maximum number of search results returned per response page.
       * Default: 100.
       */
      'itemsPerPage'?: number;
      /**
       * Specifies the total number of results matching the query. The service returns a maximum of 500 results.
       * @example 235
       */
      'totalResults'?: number;
      'schemas'?: string[];
    } | Record<string, any>;
