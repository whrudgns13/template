import { OpenApiRequestBuilder } from '@sap-cloud-sdk/openapi';
import type { ScimUsers, ScimUserPOSTPUT } from './schema';
export declare const SCIMUsersShadowUsersApi: {
    getAllUsersUsingGet: (queryParameters?: {
        'count'?: number;
        'startIndex'?: number;
        'sortOrder'?: string;
        'sortBy'?: string;
        'filter'?: string;
    }) => OpenApiRequestBuilder<ScimUsers>;
    createUserUsingPost: (body: ScimUserPOSTPUT) => OpenApiRequestBuilder<any>;
    getUserUsingGet: (id: string) => OpenApiRequestBuilder<any>;
    updateUserUsingPut: (id: string, body: ScimUserPOSTPUT) => OpenApiRequestBuilder<any>;
    patchUserUsingPatch: (id: string, body: ScimUserPOSTPUT) => OpenApiRequestBuilder<any>;
    deleteUserUsingDelete: (id: string) => OpenApiRequestBuilder<any>;
};
