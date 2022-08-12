"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SCIMUsersShadowUsersApi = void 0;
const openapi_1 = require("@sap-cloud-sdk/openapi");
exports.SCIMUsersShadowUsersApi = {
    getAllUsersUsingGet: (queryParameters) => new openapi_1.OpenApiRequestBuilder('get', '/Users', {
        queryParameters
    }),
    createUserUsingPost: (body) => new openapi_1.OpenApiRequestBuilder('post', '/Users', {
        body
    }),
    getUserUsingGet: (id) => new openapi_1.OpenApiRequestBuilder('get', '/Users/{id}', {
        pathParameters: { id }
    }),
    updateUserUsingPut: (id, body) => new openapi_1.OpenApiRequestBuilder('put', '/Users/{id}', {
        pathParameters: { id },
        body
    }),
    patchUserUsingPatch: (id, body) => new openapi_1.OpenApiRequestBuilder('patch', '/Users/{id}', {
        pathParameters: { id },
        body
    }),
    deleteUserUsingDelete: (id) => new openapi_1.OpenApiRequestBuilder('delete', '/Users/{id}', {
        pathParameters: { id }
    })
};
//# sourceMappingURL=scim-users-shadow-users-api.js.map