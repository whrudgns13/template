"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupService = void 0;
const common_1 = require("@nestjs/common");
const scim_groups_role_collections_api_1 = require("../../PlatformAPI/scim-groups-role-collections-api");
let GroupService = class GroupService {
    constructor() {
        this.destination = { destinationName: 'destination-test' };
    }
    async getRoles() {
        const roles = await scim_groups_role_collections_api_1.SCIMGroupsRoleCollectionsApi.getAllGroupsUsingGet().execute(this.destination);
        return roles;
    }
    async updateUserRole(req, res) {
        const body = req.body;
        const role = await scim_groups_role_collections_api_1.SCIMGroupsRoleCollectionsApi.updateGroupUsingPost(body.id, body.group)
            .execute(this.destination);
        return res.send(role);
    }
    async deleteUserRole(req, res) {
        const body = req.body;
        const role = await scim_groups_role_collections_api_1.SCIMGroupsRoleCollectionsApi.deleteGroupUsingDelete(body.groupId, body.userId)
            .execute(this.destination);
        return res.send(role);
    }
};
__decorate([
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], GroupService.prototype, "updateUserRole", null);
__decorate([
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], GroupService.prototype, "deleteUserRole", null);
GroupService = __decorate([
    (0, common_1.Injectable)()
], GroupService);
exports.GroupService = GroupService;
//# sourceMappingURL=group.service.js.map