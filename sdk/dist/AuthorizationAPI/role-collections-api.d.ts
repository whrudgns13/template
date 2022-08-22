import { OpenApiRequestBuilder } from '@sap-cloud-sdk/openapi';
import type { RoleCollection, RoleCollectionDescription, Role, RoleReference } from './schema';
export declare const RoleCollectionsApi: {
    getRoleCollections: (queryParameters?: {
        'showGroups'?: boolean;
        'showRoles'?: boolean;
        'showUsers'?: boolean;
    }) => OpenApiRequestBuilder<RoleCollection[]>;
    createRoleCollection: (body: RoleCollection) => OpenApiRequestBuilder<any>;
    getRoleCollectionsByPaging: (queryParameters?: {
        'showGroups'?: boolean;
        'showRoles'?: boolean;
        'showUsers'?: boolean;
    }) => OpenApiRequestBuilder<RoleCollection[]>;
    getRoleCollectionsByPaging2: (pageId: string, queryParameters?: {
        'showGroups'?: boolean;
        'showRoles'?: boolean;
        'showUsers'?: boolean;
    }) => OpenApiRequestBuilder<RoleCollection[]>;
    getRoleCollectionByName: (roleCollectionName: string, queryParameters?: {
        'withUsers'?: boolean;
    }) => OpenApiRequestBuilder<RoleCollection>;
    changeRoleCollectionDescription: (roleCollectionName: string, body: RoleCollectionDescription) => OpenApiRequestBuilder<Record<string, any>>;
    deleteRoleCollectionByName: (roleCollectionName: string) => OpenApiRequestBuilder<any>;
    getRolesByRoleCollectionName: (roleCollectionName: string) => OpenApiRequestBuilder<Role[]>;
    addRolesToRoleCollection: (roleCollectionName: string, body: RoleReference[]) => OpenApiRequestBuilder<Record<string, any>>;
    addRoleToRoleCollection: (roleCollectionName: string, roleName: string, roleTemplateAppId: string, roleTemplateName: string) => OpenApiRequestBuilder<any>;
    deleteRoleFromRoleCollection: (roleCollectionName: string, roleName: string, roleTemplateAppId: string, roleTemplateName: string) => OpenApiRequestBuilder<any>;
};
