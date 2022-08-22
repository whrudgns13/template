"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SCIMGroupsRoleCollectionsApi = void 0;
const openapi_1 = require("@sap-cloud-sdk/openapi");
exports.SCIMGroupsRoleCollectionsApi = {
    getAllGroupsUsingGet: (queryParameters) => new openapi_1.OpenApiRequestBuilder('get', '/Groups', {
        queryParameters
    }),
    getGroupUsingGet: (id) => new openapi_1.OpenApiRequestBuilder('get', '/Groups/{id}', {
        pathParameters: { id }
    }),
    updateGroupUsingPut: (id, body) => new openapi_1.OpenApiRequestBuilder('put', '/Groups/{id}', {
        pathParameters: { id },
        body
    }),
    patchGroupUsingPatch: (id, body) => new openapi_1.OpenApiRequestBuilder('patch', '/Groups/{id}', {
        pathParameters: { id },
        body
    }),
    addUserRoleUsingPost: (id, body) => new openapi_1.OpenApiRequestBuilder('post', '/Groups/{id}/members', {
        pathParameters: { id },
        body
    }),
    deleteUserRoleUsingDelete: (groupId, userId) => new openapi_1.OpenApiRequestBuilder('delete', '/Groups/{groupId}/members/{userId}', {
        pathParameters: { groupId, userId }
    }),
    deleteGroupRole: (roleId) => new openapi_1.OpenApiRequestBuilder('delete', '/Groups/{roleId}', {
        pathParameters: { roleId }
    })
};
//# sourceMappingURL=scim-groups-role-collections-api.js.map