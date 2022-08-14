import { OpenApiRequestBuilder } from '@sap-cloud-sdk/openapi';
import type { TenantSettingsResp, TenantSettingsReq } from './schema';
export declare const SecuritySettingsApi: {
    readSettings: () => OpenApiRequestBuilder<TenantSettingsResp[]>;
    updateSettings: (body: TenantSettingsReq) => OpenApiRequestBuilder<TenantSettingsResp>;
};
