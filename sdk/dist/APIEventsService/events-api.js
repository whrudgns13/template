"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsApi = void 0;
const openapi_1 = require("@sap-cloud-sdk/openapi");
exports.EventsApi = {
    getBusinessEvents: (queryParameters) => new openapi_1.OpenApiRequestBuilder('get', '/cloud-management/v1/events', {
        queryParameters
    }),
    getBusinessEventTypes: () => new openapi_1.OpenApiRequestBuilder('get', '/cloud-management/v1/events/types')
};
//# sourceMappingURL=events-api.js.map