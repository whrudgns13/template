"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const user_controller_1 = require("./user/user.controller");
const user_service_1 = require("./user/user.service");
const security_service_1 = require("./security/security.service");
const security_controller_1 = require("./security/security.controller");
const events_controller_1 = require("./events/events.controller");
const events_service_1 = require("./events/events.service");
const group_service_1 = require("./group/group.service");
const group_controller_1 = require("./group/group.controller");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [app_controller_1.AppController, user_controller_1.UserController, security_controller_1.SecurityController, events_controller_1.EventsController, group_controller_1.GroupController],
        providers: [app_service_1.AppService, user_service_1.UserService, security_service_1.SecurityService, events_service_1.EventsService, group_service_1.GroupService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map