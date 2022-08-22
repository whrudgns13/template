"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttributeMappingApi = void 0;
const openapi_1 = require("@sap-cloud-sdk/openapi");
exports.AttributeMappingApi = {
    getIdpAttributeValues: (origin) => new openapi_1.OpenApiRequestBuilder('get', '/sap/rest/authorization/v2/identity-providers/{origin}/attributes/rolecollections', {
        pathParameters: { origin }
    }),
    getIdpAttributeValuesFromRoleCollection: (origin, roleCollectionName) => new openapi_1.OpenApiRequestBuilder('get', '/sap/rest/authorization/v2/identity-providers/{origin}/rolecollections/{roleCollectionName}', {
        pathParameters: { origin, roleCollectionName }
    }),
    getRoleCollectionByAttributeValue: (origin, attributeName, attributeValue) => new openapi_1.OpenApiRequestBuilder('get', '/sap/rest/authorization/v2/identity-providers/{origin}/attributes/{attributeName}/{attributeValue}', {
        pathParameters: { origin, attributeName, attributeValue }
    }),
    getIdpAttributeValuesFromRoleCollectionByAttribute: (attributeName, origin, roleCollectionName) => new openapi_1.OpenApiRequestBuilder('get', '/sap/rest/authorization/v2/identity-providers/{origin}/attributes/{attributeName}/rolecollections/{roleCollectionName}', {
        pathParameters: { attributeName, origin, roleCollectionName }
    }),
    addIdpAttributeToRoleCollection: (origin, body) => new openapi_1.OpenApiRequestBuilder('post', '/sap/rest/authorization/v2/identity-providers/{origin}/attributes', {
        pathParameters: { origin },
        body
    }),
    deleteIdpAttributeToRoleCollection: (attributeName, attributeValue, operator, origin, roleCollectionName) => new openapi_1.OpenApiRequestBuilder('delete', '/sap/rest/authorization/v2/identity-providers/{origin}/attributes/{attributeName}/{operator}/{attributeValue}/rolecollections/{roleCollectionName}', {
        pathParameters: { attributeName, attributeValue, operator, origin, roleCollectionName }
    })
};
//# sourceMappingURL=attribute-mapping-api.js.map