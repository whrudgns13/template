import { OpenApiRequestBuilder } from '@sap-cloud-sdk/openapi';
import type { App, Scope, Subscriptions } from './schema';
export declare const ApplicationsApi: {
    getApps: (queryParameters?: {
        'onlyForOrgId'?: string;
        'onlyWithClientId'?: boolean;
    }) => OpenApiRequestBuilder<App[]>;
    getGrantedAuthorities: (appId: string, queryParameters?: {
        'grantedByAppGuid'?: string;
        'grantedByAppId'?: string;
    }) => OpenApiRequestBuilder<string[]>;
    listScopes: (appId: string) => OpenApiRequestBuilder<Scope[]>;
    getScope: (appId: string, scopeName: string) => OpenApiRequestBuilder<Scope>;
    getAppById: (id: string, queryParameters?: {
        'hideDetails'?: boolean;
        'isServiceInstanceId'?: boolean;
    }) => OpenApiRequestBuilder<App>;
    getOwnApp: () => OpenApiRequestBuilder<App>;
    getAppByToken: (queryParameters: {
        'tenant': string;
        'listSubscriptions'?: string;
        'listCloneSubscriptions'?: string;
    }) => OpenApiRequestBuilder<Subscriptions>;
    getRoleCollectionsByAppIdTemplateNameAndRoleName: (appId: string, roleName: string, roleTemplateName: string) => OpenApiRequestBuilder<any>;
};
