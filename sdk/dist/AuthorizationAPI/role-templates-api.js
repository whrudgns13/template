"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleTemplatesApi = void 0;
const openapi_1 = require("@sap-cloud-sdk/openapi");
exports.RoleTemplatesApi = {
    getRoleTemplates: (queryParameters) => new openapi_1.OpenApiRequestBuilder('get', '/sap/rest/authorization/v2/apps/roletemplates', {
        queryParameters
    }),
    getRoleTemplateByAppName: (appId) => new openapi_1.OpenApiRequestBuilder('get', '/sap/rest/authorization/v2/apps/{appId}/roletemplates', {
        pathParameters: { appId }
    }),
    getRoleTemplateByName: (appId, templateName) => new openapi_1.OpenApiRequestBuilder('get', '/sap/rest/authorization/v2/apps/{appId}/roletemplates/{templateName}', {
        pathParameters: { appId, templateName }
    })
};
//# sourceMappingURL=role-templates-api.js.map