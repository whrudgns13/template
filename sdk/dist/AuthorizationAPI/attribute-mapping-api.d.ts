import { OpenApiRequestBuilder } from '@sap-cloud-sdk/openapi';
import type { RoleCollectionAttribute, App, IdentityProviderMapping } from './schema';
export declare const AttributeMappingApi: {
    getIdpAttributeValues: (origin: string) => OpenApiRequestBuilder<RoleCollectionAttribute[]>;
    getIdpAttributeValuesFromRoleCollection: (origin: string, roleCollectionName: string) => OpenApiRequestBuilder<RoleCollectionAttribute[]>;
    getRoleCollectionByAttributeValue: (origin: string, attributeName: string, attributeValue: string) => OpenApiRequestBuilder<App[]>;
    getIdpAttributeValuesFromRoleCollectionByAttribute: (attributeName: string, origin: string, roleCollectionName: string) => OpenApiRequestBuilder<App[]>;
    addIdpAttributeToRoleCollection: (origin: string, body: IdentityProviderMapping) => OpenApiRequestBuilder<any>;
    deleteIdpAttributeToRoleCollection: (attributeName: string, attributeValue: string, operator: string, origin: string, roleCollectionName: string) => OpenApiRequestBuilder<App[]>;
};
