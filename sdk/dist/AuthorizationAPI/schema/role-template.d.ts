import type { AttributeReference } from './attribute-reference';
import type { Role } from './role';
export declare type RoleTemplate = {
    'appDescription'?: string;
    'appId'?: string;
    'appName'?: string;
    'attribute-references'?: AttributeReference[];
    'default-role-name'?: string;
    'description'?: string;
    'name'?: string;
    'role-references'?: Role[];
    'scope-references'?: string[];
    'version'?: string;
} | Record<string, any>;
