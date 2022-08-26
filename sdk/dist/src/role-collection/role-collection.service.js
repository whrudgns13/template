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
exports.RoleCollectionService = void 0;
const common_1 = require("@nestjs/common");
const role_collections_api_1 = require("../../AuthorizationAPI/role-collections-api");
let RoleCollectionService = class RoleCollectionService {
    constructor() {
        this.destination = { destinationName: 'destination-test' };
    }
    async getRoleCollections(req, res) {
        const collection = await role_collections_api_1.RoleCollectionsApi.getRoleCollections({ showUsers: true }).execute(this.destination);
        return res.send(collection);
    }
    async changeRoleCollectionDescription(req, res) {
        const collection = await role_collections_api_1.RoleCollectionsApi
            .changeRoleCollectionDescription(req.body.id, req.body.collection)
            .execute(this.destination);
        return res.send(collection);
    }
    async createRoleCollection(req, res) {
        const collection = await role_collections_api_1.RoleCollectionsApi.createRoleCollection(req.body).execute(this.destination);
        return res.send(collection);
    }
    async deleteRoleCollectionByName(req, res) {
        const collection = await role_collections_api_1.RoleCollectionsApi.deleteRoleCollectionByName(req.body.id).execute(this.destination);
        return res.send(collection);
    }
    async addRolesToRoleCollection(req, res) {
        let body = req.body;
        const collection = await role_collections_api_1.RoleCollectionsApi.addRolesToRoleCollection(body.collectionName, body.roleReference).execute(this.destination);
        return res.send(collection);
    }
    async deleteRoleFromRoleCollection(req, res) {
        let body = req.body;
        const collection = await role_collections_api_1.RoleCollectionsApi
            .deleteRoleFromRoleCollection(body.roleCollectionName, body.roleName, body.roleTemplateAppId, body.roleTemplateName)
            .execute(this.destination);
        return res.send(collection);
    }
};
__decorate([
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RoleCollectionService.prototype, "getRoleCollections", null);
__decorate([
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RoleCollectionService.prototype, "changeRoleCollectionDescription", null);
__decorate([
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RoleCollectionService.prototype, "createRoleCollection", null);
__decorate([
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RoleCollectionService.prototype, "deleteRoleCollectionByName", null);
__decorate([
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RoleCollectionService.prototype, "addRolesToRoleCollection", null);
__decorate([
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RoleCollectionService.prototype, "deleteRoleFromRoleCollection", null);
RoleCollectionService = __decorate([
    (0, common_1.Injectable)()
], RoleCollectionService);
exports.RoleCollectionService = RoleCollectionService;
//# sourceMappingURL=role-collection.service.js.map