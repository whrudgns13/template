import { OpenApiRequestBuilder } from '@sap-cloud-sdk/openapi';
import type { RoleTemplate } from './schema';
export declare const RoleTemplatesApi: {
    getRoleTemplates: (queryParameters?: {
        'showRoles'?: boolean;
    }) => OpenApiRequestBuilder<RoleTemplate[]>;
    getRoleTemplateByAppName: (appId: string) => OpenApiRequestBuilder<RoleTemplate[]>;
    getRoleTemplateByName: (appId: string, templateName: string) => OpenApiRequestBuilder<RoleTemplate>;
};
