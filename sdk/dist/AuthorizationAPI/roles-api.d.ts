import { OpenApiRequestBuilder } from '@sap-cloud-sdk/openapi';
import type { Role, RoleUpdate } from './schema';
export declare const RolesApi: {
    createRole: (body: Role) => OpenApiRequestBuilder<Role>;
    getRolesByAppId: (appId: string) => OpenApiRequestBuilder<Role[]>;
    getRoleByAppAndRoleTemplate: (appId: string, roleName: string, templateName: string) => OpenApiRequestBuilder<Role>;
    updateRole: (appId: string, roleName: string, templateName: string, body: RoleUpdate) => OpenApiRequestBuilder<Role>;
    deleteRoleByRoleName: (appId: string, roleName: string, templateName: string) => OpenApiRequestBuilder<any>;
    getRoles: () => OpenApiRequestBuilder<Role[]>;
};
