import type { ScimGroupMember } from './scim-group-member';

export type ScimGroupPost = {
    'displayName'?: string;
    'description'?: string;
    'members'?: ScimGroupMember[];
} | Record<string, any>;
