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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const scim_users_shadow_users_api_1 = require("../../PlatformAPI/scim-users-shadow-users-api");
let UserService = class UserService {
    constructor() {
        this.destination = { destinationName: 'destination-test' };
    }
    async getUsers(req, res) {
        const oUsers = await scim_users_shadow_users_api_1.SCIMUsersShadowUsersApi.getAllUsersUsingGet().execute(this.destination);
        return res.send(oUsers);
    }
    async getCurrentUser(req, res) {
        const sCurrentUserId = req.authInfo.getTokenInfo().getUserId();
        const oCurrentUser = await scim_users_shadow_users_api_1.SCIMUsersShadowUsersApi.getUserUsingGet(sCurrentUserId).execute(this.destination);
        return res.send(oCurrentUser);
    }
    async createUser(req, res) {
        const oUser = await scim_users_shadow_users_api_1.SCIMUsersShadowUsersApi.createUserUsingPost(req.body).execute(this.destination);
        return res.send(oUser);
    }
    async deleteUser(req, res) {
        const oUser = await scim_users_shadow_users_api_1.SCIMUsersShadowUsersApi.deleteUserUsingDelete(req.body.id).execute(this.destination);
        return res.send(oUser);
    }
    async updateUser(req, res) {
        const oUser = await scim_users_shadow_users_api_1.SCIMUsersShadowUsersApi.updateUserUsingPut(req.body.id, req.body)
            .addCustomHeaders({ 'If-Match': '*' }).execute(this.destination);
        return res.send(oUser);
    }
};
__decorate([
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserService.prototype, "getUsers", null);
__decorate([
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserService.prototype, "getCurrentUser", null);
__decorate([
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserService.prototype, "createUser", null);
__decorate([
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserService.prototype, "deleteUser", null);
__decorate([
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserService.prototype, "updateUser", null);
UserService = __decorate([
    (0, common_1.Injectable)()
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map