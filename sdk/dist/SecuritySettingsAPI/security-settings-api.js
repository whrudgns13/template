"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecuritySettingsApi = void 0;
const openapi_1 = require("@sap-cloud-sdk/openapi");
exports.SecuritySettingsApi = {
    readSettings: () => new openapi_1.OpenApiRequestBuilder('get', '/sap/rest/authorization/v2/securitySettings'),
    updateSettings: (body) => new openapi_1.OpenApiRequestBuilder('patch', '/sap/rest/authorization/v2/securitySettings', {
        body
    })
};
//# sourceMappingURL=security-settings-api.js.map