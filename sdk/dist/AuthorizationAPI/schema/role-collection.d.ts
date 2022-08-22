import type { GroupReference } from './group-reference';
import type { RoleReference } from './role-reference';
import type { UserReference } from './user-reference';
import type { SamlAttrAssignment } from './saml-attr-assignment';
export declare type RoleCollection = {
    'name'?: string;
    'description'?: string;
    'groupReferences'?: GroupReference[];
    'roleReferences'?: RoleReference[];
    'userReferences'?: UserReference[];
    'samlAttrAssignment'?: SamlAttrAssignment[];
    'isReadOnly'?: boolean;
} | Record<string, any>;
