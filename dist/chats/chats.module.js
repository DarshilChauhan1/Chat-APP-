"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatsModule = void 0;
const common_1 = require("@nestjs/common");
const chats_service_1 = require("./chats.service");
const chats_controller_1 = require("./chats.controller");
const mongoose_1 = require("@nestjs/mongoose");
const chat_entity_1 = require("../models/chat/chat.entity");
const user_entity_1 = require("../models/user/user.entity");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
let ChatsModule = class ChatsModule {
};
exports.ChatsModule = ChatsModule;
exports.ChatsModule = ChatsModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: 'Chat', schema: chat_entity_1.ChatSchema }, { name: 'User', schema: user_entity_1.UserSchema }]), jwt_1.JwtModule, config_1.ConfigModule],
        controllers: [chats_controller_1.ChatsController],
        providers: [chats_service_1.ChatsService],
    })
], ChatsModule);
//# sourceMappingURL=chats.module.js.map