import { OpenApiRequestBuilder } from '@sap-cloud-sdk/openapi';
import type { ScimGroups, ScimGroup, ScimGroupPatch } from './schema';
export declare const SCIMGroupsRoleCollectionsApi: {
    getAllGroupsUsingGet: (queryParameters?: {
        'count'?: number;
        'startIndex'?: number;
        'sortOrder'?: string;
        'sortBy'?: string;
    }) => OpenApiRequestBuilder<ScimGroups>;
    getGroupUsingGet: (id: string) => OpenApiRequestBuilder<ScimGroup>;
    updateGroupUsingPut: (id: string, body: ScimGroup) => OpenApiRequestBuilder<any>;
    patchGroupUsingPatch: (id: string, body: ScimGroupPatch) => OpenApiRequestBuilder<any>;
};
