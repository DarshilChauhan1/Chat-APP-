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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const event_1 = require("src/common/constants/event");
const socket_io_1 = require("socket.io");
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const custom_error_1 = require("src/helpers/errors/custom.error");
const mongoose_1 = require("@nestjs/mongoose");
const user_entity_1 = require("src/models/users/user.entity");
const mongoose_2 = require("mongoose");
const exception_filters_1 = require("src/common/filters/exception.filters");
const message_entity_1 = require("../models/message/message.entity");
let MyGateway = class MyGateway {
    constructor(UserModel, MessageModel, configService, jwtService) {
        this.UserModel = UserModel;
        this.MessageModel = MessageModel;
        this.configService = configService;
        this.jwtService = jwtService;
        this.userSocketIds = new Map();
    }
    onModuleInit() {
        this.server.use(async (socket, next) => this.socketAuthenticator(socket, next));
        this.server.on('connection', async (socket) => {
            let user = socket['user'];
            this.userSocketIds.set(user._id.toString(), socket.id);
            console.log("socketUserIds---->", this.userSocketIds);
            socket.on(event_1.NEW_MESSAGE, async ({ chatId, members, content }) => {
                const messageForRealtime = {
                    content,
                    sender: {
                        id: user._id.toString()
                    },
                    chat: chatId,
                    createdAt: new Date().toISOString()
                };
                console.log(messageForRealtime);
                let data = this.getSocketsofMembers(members);
                let messageForDB = {
                    content,
                    sender: user._id,
                    chat: chatId,
                    receiver: data.members
                };
                this.server.to(data['socketIds']).emit(event_1.NEW_MESSAGE, {
                    chatId,
                    message: messageForRealtime
                });
                try {
                    await this.MessageModel.create(messageForDB);
                }
                catch (error) {
                    throw error;
                }
            });
            socket.on('disconnect', () => {
                this.userSocketIds.delete(user._id);
                console.log('User disconnected');
            });
        });
    }
    onNewMessage(payload) {
        console.log(payload);
    }
    async socketAuthenticator(socket, next) {
        try {
            let token = socket.request.headers.authorization;
            if (!token)
                throw new common_1.NotFoundException('Token not found');
            const decode = await this.jwtService.verifyAsync(token, { secret: this.configService.get('ACCESS_TOKEN_SECRET') });
            if (!decode)
                throw new custom_error_1.CustomError("Token expired or invalid", 404, '/refresh');
            socket['user'] = await this.UserModel.findById(decode.id);
            return next();
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    }
    getSocketsofMembers(members) {
        let data = {
            members: [],
            socketIds: []
        };
        members.map((ids) => {
            if (this.userSocketIds.get(ids) != undefined) {
                data.members.push(ids);
                data.socketIds.push(this.userSocketIds.get(ids));
            }
        });
        return data;
    }
};
exports.MyGateway = MyGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", typeof (_a = typeof socket_io_1.Server !== "undefined" && socket_io_1.Server) === "function" ? _a : Object)
], MyGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)(event_1.NEW_MESSAGE),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MyGateway.prototype, "onNewMessage", null);
exports.MyGateway = MyGateway = __decorate([
    (0, common_1.UseFilters)(exception_filters_1.ExceptionHandling),
    (0, websockets_1.WebSocketGateway)(),
    __param(0, (0, mongoose_1.InjectModel)(user_entity_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(message_entity_1.Message.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        config_1.ConfigService,
        jwt_1.JwtService])
], MyGateway);
//# sourceMappingURL=gateway.socket.js.map