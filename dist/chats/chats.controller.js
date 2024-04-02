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
exports.ChatsController = void 0;
const common_1 = require("@nestjs/common");
const chats_service_1 = require("./chats.service");
const groupChatCreate_1 = require("./dto/groupChatCreate");
const exception_filters_1 = require("../common/filters/exception.filters");
const auth_guard_1 = require("../auth/auth.guard");
let ChatsController = class ChatsController {
    constructor(chatsService) {
        this.chatsService = chatsService;
    }
    createNewGroup(payload, request) {
        return this.chatsService.createNewGroup(payload, request);
    }
    fetchMyGroupChat(request) {
        return this.chatsService.fetchMyGroupChat(request);
    }
    getAllMyGroups(request) {
        return this.chatsService.getAllMyGroups(request);
    }
    addMemberstoGroup(params, payload, request) {
        return this.chatsService.addMemberstoGroup(params, payload, request);
    }
    removeMembersToGroup(params, payload, request) {
        return this.chatsService.removeMembersToGroup(params, payload, request);
    }
    leaveGroup(payload, params, request) {
        return;
    }
    renameGroup(payload, parmas, request) {
        return this.chatsService.renameGroup(payload, parmas, request);
    }
    deleteGroup(parmas, request) {
        return this.chatsService.deleteGroup(parmas, request);
    }
};
exports.ChatsController = ChatsController;
__decorate([
    (0, common_1.Post)('new'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [groupChatCreate_1.GroupChatCreateDto, Object]),
    __metadata("design:returntype", void 0)
], ChatsController.prototype, "createNewGroup", null);
__decorate([
    (0, common_1.Get)('mychat'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ChatsController.prototype, "fetchMyGroupChat", null);
__decorate([
    (0, common_1.Get)('mygroups'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ChatsController.prototype, "getAllMyGroups", null);
__decorate([
    (0, common_1.Put)('groups/add/:chatId'),
    __param(0, (0, common_1.Param)('chatId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], ChatsController.prototype, "addMemberstoGroup", null);
__decorate([
    (0, common_1.Put)('groups/remove/:chatId'),
    __param(0, (0, common_1.Param)('chatId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], ChatsController.prototype, "removeMembersToGroup", null);
__decorate([
    (0, common_1.Delete)('groups/leave/:chatId'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('chatId')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", void 0)
], ChatsController.prototype, "leaveGroup", null);
__decorate([
    (0, common_1.Put)('groups/:chatId'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('chatId')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", void 0)
], ChatsController.prototype, "renameGroup", null);
__decorate([
    (0, common_1.Delete)('groups/:chatId'),
    __param(0, (0, common_1.Param)('chatId')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ChatsController.prototype, "deleteGroup", null);
exports.ChatsController = ChatsController = __decorate([
    (0, common_1.UseFilters)(exception_filters_1.ExceptionHandling),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Controller)('api/chats'),
    __metadata("design:paramtypes", [chats_service_1.ChatsService])
], ChatsController);
//# sourceMappingURL=chats.controller.js.map