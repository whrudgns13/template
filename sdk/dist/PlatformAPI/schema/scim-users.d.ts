import type { ScimUser } from './scim-user';
export declare type ScimUsers = {
    'resources'?: ScimUser[];
    'startIndex'?: number;
    'itemsPerPage'?: number;
    'totalResults'?: number;
    'schemas'?: string[];
} | Record<string, any>;
