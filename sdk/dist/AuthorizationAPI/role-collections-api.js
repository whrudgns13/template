"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleCollectionsApi = void 0;
const openapi_1 = require("@sap-cloud-sdk/openapi");
exports.RoleCollectionsApi = {
    getRoleCollections: (queryParameters) => new openapi_1.OpenApiRequestBuilder('get', '/sap/rest/authorization/v2/rolecollections', {
        queryParameters
    }),
    createRoleCollection: (body) => new openapi_1.OpenApiRequestBuilder('post', '/sap/rest/authorization/v2/rolecollections', {
        body
    }),
    getRoleCollectionsByPaging: (queryParameters) => new openapi_1.OpenApiRequestBuilder('get', '/sap/rest/authorization/v2/rolecollections/pages', {
        queryParameters
    }),
    getRoleCollectionsByPaging2: (pageId, queryParameters) => new openapi_1.OpenApiRequestBuilder('get', '/sap/rest/authorization/v2/rolecollections/pages/{pageId}', {
        pathParameters: { pageId },
        queryParameters
    }),
    getRoleCollectionByName: (roleCollectionName, queryParameters) => new openapi_1.OpenApiRequestBuilder('get', '/sap/rest/authorization/v2/rolecollections/{roleCollectionName}', {
        pathParameters: { roleCollectionName },
        queryParameters
    }),
    changeRoleCollectionDescription: (roleCollectionName, body) => new openapi_1.OpenApiRequestBuilder('put', '/sap/rest/authorization/v2/rolecollections/{roleCollectionName}', {
        pathParameters: { roleCollectionName },
        body
    }),
    deleteRoleCollectionByName: (roleCollectionName) => new openapi_1.OpenApiRequestBuilder('delete', '/sap/rest/authorization/v2/rolecollections/{roleCollectionName}', {
        pathParameters: { roleCollectionName }
    }),
    getRolesByRoleCollectionName: (roleCollectionName) => new openapi_1.OpenApiRequestBuilder('get', '/sap/rest/authorization/v2/rolecollections/{roleCollectionName}/roles', {
        pathParameters: { roleCollectionName }
    }),
    addRolesToRoleCollection: (roleCollectionName, body) => new openapi_1.OpenApiRequestBuilder('put', '/sap/rest/authorization/v2/rolecollections/{roleCollectionName}/roles', {
        pathParameters: { roleCollectionName },
        body
    }),
    addRoleToRoleCollection: (roleCollectionName, roleName, roleTemplateAppId, roleTemplateName) => new openapi_1.OpenApiRequestBuilder('put', '/sap/rest/authorization/v2/rolecollections/{roleCollectionName}/roles/{roleTemplateAppId}/{roleName}/{roleTemplateName}', {
        pathParameters: { roleCollectionName, roleName, roleTemplateAppId, roleTemplateName }
    }),
    deleteRoleFromRoleCollection: (roleCollectionName, roleName, roleTemplateAppId, roleTemplateName) => new openapi_1.OpenApiRequestBuilder('delete', '/sap/rest/authorization/v2/rolecollections/{roleCollectionName}/roles/{roleTemplateAppId}/{roleName}/{roleTemplateName}', {
        pathParameters: { roleCollectionName, roleName, roleTemplateAppId, roleTemplateName }
    })
};
//# sourceMappingURL=role-collections-api.js.map