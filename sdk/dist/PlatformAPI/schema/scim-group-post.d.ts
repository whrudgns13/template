import type { ScimGroupMember } from './scim-group-member';
export declare type ScimGroupPost = {
    'displayName'?: string;
    'description'?: string;
    'members'?: ScimGroupMember[];
    'schemas'?: string[];
} | Record<string, any>;
