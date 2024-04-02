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
const app_service_1 = require("./app.service");
const auth_module_1 = require("./auth/auth.module");
const common_module_1 = require("./common/common.module");
const users_module_1 = require("./users/users.module");
const mongoose_1 = require("@nestjs/mongoose");
const mongooseConfigasync_1 = require("./common/config/mongooseConfigasync");
const config_1 = require("@nestjs/config");
const chats_module_1 = require("./chats/chats.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            mongoose_1.MongooseModule.forRootAsync(mongooseConfigasync_1.mongooseConfigasync),
            auth_module_1.AuthModule, common_module_1.CommonModule, users_module_1.UsersModule, chats_module_1.ChatsModule
        ],
        controllers: [],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map