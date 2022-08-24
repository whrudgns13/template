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
exports.RoleCollectionController = void 0;
const common_1 = require("@nestjs/common");
const role_collection_service_1 = require("./role-collection.service");
let RoleCollectionController = class RoleCollectionController {
    constructor(roleColleactionService) {
        this.roleColleactionService = roleColleactionService;
    }
    getRoleCollections(req, res) {
        return this.roleColleactionService.getRoleCollections(req, res);
    }
    changeRoleCollectionDescription(req, res) {
        return this.roleColleactionService.changeRoleCollectionDescription(req, res);
    }
    createRoleCollection(req, res) {
        return this.roleColleactionService.createRoleCollection(req, res);
    }
    deleteRoleCollectionByName(req, res) {
        return this.roleColleactionService.deleteRoleCollectionByName(req, res);
    }
    addRolesToRoleCollection(req, res) {
        return this.roleColleactionService.addRolesToRoleCollection(req, res);
    }
    deleteRoleFromRoleCollection(req, res) {
        return this.roleColleactionService.deleteRoleFromRoleCollection(req, res);
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], RoleCollectionController.prototype, "getRoleCollections", null);
__decorate([
    (0, common_1.Put)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], RoleCollectionController.prototype, "changeRoleCollectionDescription", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], RoleCollectionController.prototype, "createRoleCollection", null);
__decorate([
    (0, common_1.Delete)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], RoleCollectionController.prototype, "deleteRoleCollectionByName", null);
__decorate([
    (0, common_1.Put)("/role"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], RoleCollectionController.prototype, "addRolesToRoleCollection", null);
__decorate([
    (0, common_1.Delete)("/role"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], RoleCollectionController.prototype, "deleteRoleFromRoleCollection", null);
RoleCollectionController = __decorate([
    (0, common_1.Controller)('role-collection'),
    __metadata("design:paramtypes", [role_collection_service_1.RoleCollectionService])
], RoleCollectionController);
exports.RoleCollectionController = RoleCollectionController;
//# sourceMappingURL=role-collection.controller.js.map