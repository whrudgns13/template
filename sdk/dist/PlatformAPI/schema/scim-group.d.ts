import type { ScimMeta } from './scim-meta';
import type { ScimGroupMember } from './scim-group-member';
export declare type ScimGroup = {
    'id'?: string;
    'meta'?: ScimMeta;
    'displayName'?: string;
    'zoneId'?: string;
    'description'?: string;
    'members'?: ScimGroupMember[];
    'schemas'?: string[];
} | Record<string, any>;
