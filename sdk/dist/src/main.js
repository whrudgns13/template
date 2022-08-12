"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const xsenv_1 = require("@sap/xsenv");
const passport = require("passport");
const xssec_1 = require("@sap/xssec");
const xsuaa = (0, xsenv_1.getServices)({ uaa: { tag: 'xsuaa' } }).uaa;
passport.use(new xssec_1.JWTStrategy(xsuaa));
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(passport.initialize());
    app.use(passport.authenticate('JWT', { session: false }));
    await app.listen(process.env.PORT || 8080);
}
bootstrap();
//# sourceMappingURL=main.js.map