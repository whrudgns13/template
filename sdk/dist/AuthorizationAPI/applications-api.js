"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationsApi = void 0;
const openapi_1 = require("@sap-cloud-sdk/openapi");
exports.ApplicationsApi = {
    getApps: (queryParameters) => new openapi_1.OpenApiRequestBuilder('get', '/sap/rest/authorization/v2/apps', {
        queryParameters
    }),
    getGrantedAuthorities: (appId, queryParameters) => new openapi_1.OpenApiRequestBuilder('get', '/sap/rest/authorization/v2/apps/{appId}/authorities', {
        pathParameters: { appId },
        queryParameters
    }),
    listScopes: (appId) => new openapi_1.OpenApiRequestBuilder('get', '/sap/rest/authorization/v2/apps/{appId}/scopes', {
        pathParameters: { appId }
    }),
    getScope: (appId, scopeName) => new openapi_1.OpenApiRequestBuilder('get', '/sap/rest/authorization/v2/apps/{appId}/scopes/{scopeName}', {
        pathParameters: { appId, scopeName }
    }),
    getAppById: (id, queryParameters) => new openapi_1.OpenApiRequestBuilder('get', '/sap/rest/authorization/v2/apps/{id}', {
        pathParameters: { id },
        queryParameters
    }),
    getOwnApp: () => new openapi_1.OpenApiRequestBuilder('get', '/sap/rest/authorization/v2/ownapp'),
    getAppByToken: (queryParameters) => new openapi_1.OpenApiRequestBuilder('get', '/sap/rest/authorization/v2/ownapp/usage', {
        queryParameters
    }),
    getRoleCollectionsByAppIdTemplateNameAndRoleName: (appId, roleName, roleTemplateName) => new openapi_1.OpenApiRequestBuilder('get', '/sap/rest/authorization/v2/rolecollections/roles/{appId}/{roleTemplateName}/{roleName}', {
        pathParameters: { appId, roleName, roleTemplateName }
    })
};
//# sourceMappingURL=applications-api.js.map