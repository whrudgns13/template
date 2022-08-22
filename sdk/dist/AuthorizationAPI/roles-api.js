"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesApi = void 0;
const openapi_1 = require("@sap-cloud-sdk/openapi");
exports.RolesApi = {
    createRole: (body) => new openapi_1.OpenApiRequestBuilder('post', '/sap/rest/authorization/v2/apps/roles', {
        body
    }),
    getRolesByAppId: (appId) => new openapi_1.OpenApiRequestBuilder('get', '/sap/rest/authorization/v2/apps/{appId}/roles', {
        pathParameters: { appId }
    }),
    getRoleByAppAndRoleTemplate: (appId, roleName, templateName) => new openapi_1.OpenApiRequestBuilder('get', '/sap/rest/authorization/v2/apps/{appId}/roletemplates/{templateName}/roles/{roleName}', {
        pathParameters: { appId, roleName, templateName }
    }),
    updateRole: (appId, roleName, templateName, body) => new openapi_1.OpenApiRequestBuilder('put', '/sap/rest/authorization/v2/apps/{appId}/roletemplates/{templateName}/roles/{roleName}', {
        pathParameters: { appId, roleName, templateName },
        body
    }),
    deleteRoleByRoleName: (appId, roleName, templateName) => new openapi_1.OpenApiRequestBuilder('delete', '/sap/rest/authorization/v2/apps/{appId}/roletemplates/{templateName}/roles/{roleName}', {
        pathParameters: { appId, roleName, templateName }
    }),
    getRoles: () => new openapi_1.OpenApiRequestBuilder('get', '/sap/rest/authorization/v2/roles')
};
//# sourceMappingURL=roles-api.js.map