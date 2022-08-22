"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesService = void 0;
const common_1 = require("@nestjs/common");
const roles_api_1 = require("../../AuthorizationAPI/roles-api");
let RolesService = class RolesService {
    constructor() {
        this.destination = { destinationName: 'destination-test' };
    }
    async getRoles() {
        const roles = await roles_api_1.RolesApi.getRoles().execute(this.destination);
        return roles;
    }
};
RolesService = __decorate([
    (0, common_1.Injectable)()
], RolesService);
exports.RolesService = RolesService;
//# sourceMappingURL=roles.service.js.map