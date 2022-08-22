import type { RoleAttribute } from './role-attribute';
import type { RoleCollectionReference } from './role-collection-reference';
import type { Scope } from './scope';
export declare type Role = {
    'appDescription'?: string;
    'appName'?: string;
    'attributeList'?: RoleAttribute[];
    'description'?: string;
    'isReadOnly'?: boolean;
    'name'?: string;
    'roleCollectionReferences'?: RoleCollectionReference[];
    'roleTemplateAppId'?: string;
    'roleTemplateName'?: string;
    'scopes'?: Scope[];
} | Record<string, any>;
