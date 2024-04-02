"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GatewayModule = void 0;
const common_1 = require("@nestjs/common");
const gateway_1 = require("./gateway");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const user_entity_1 = require("../models/user/user.entity");
const message_entity_1 = require("../models/message/message.entity");
let GatewayModule = class GatewayModule {
};
exports.GatewayModule = GatewayModule;
exports.GatewayModule = GatewayModule = __decorate([
    (0, common_1.Module)({
        imports: [jwt_1.JwtModule, config_1.ConfigModule.forRoot(), mongoose_1.MongooseModule.forFeature([{ name: 'User', schema: user_entity_1.UserSchema }, { name: 'Message', schema: message_entity_1.MessageSchema }])],
        providers: [gateway_1.MyGateway]
    })
], GatewayModule);
//# sourceMappingURL=gateway.module.js.map