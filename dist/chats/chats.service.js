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
exports.ChatsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const chat_entity_1 = require("../models/chat/chat.entity");
const user_entity_1 = require("../models/user/user.entity");
const helper_1 = require("../helpers/helper");
let ChatsService = class ChatsService {
    constructor(ChatModel, UserModel) {
        this.ChatModel = ChatModel;
        this.UserModel = UserModel;
    }
    async createNewGroup(payload, request) {
        try {
            const { name, members } = payload;
            let userId = request['user'].id;
            if (members.length < 2)
                throw new common_1.ConflictException('there should be atleat 3 members in the group');
            const newChat = await this.ChatModel.create({
                groupChat: true,
                creator: userId,
                members: members
            });
            return new helper_1.ResponseBody(200, "New Group Created", newChat);
        }
        catch (error) {
            throw error;
        }
    }
    async fetchMyGroupChat(request) {
        try {
            let userId = request['user'].id;
            const findGroupChat = await this.ChatModel.find({ members: userId, groupChat: true });
            if (!findGroupChat)
                throw new common_1.NotFoundException('No group chat of that user found');
            const transformedChat = findGroupChat.map(({ _id, name, members, groupChat }) => {
                return {
                    _id,
                    name,
                    groupChat,
                    members: (0, helper_1.otherMember)(members, userId)
                };
            });
            return new helper_1.ResponseBody(200, "Chat received", transformedChat);
        }
        catch (error) {
            throw error;
        }
    }
    async getAllMyGroups(request) {
        try {
            let userId = request['user'].id;
            const getGroupChats = await this.ChatModel.find({ creator: userId, groupChat: true }).populate('members', 'name');
            if (!getGroupChats)
                throw new common_1.NotFoundException('You are not admin of any group');
            return new helper_1.ResponseBody(200, "User created group data", getGroupChats);
        }
        catch (error) {
            throw error;
        }
    }
    async addMemberstoGroup(chatId, payload, request) {
        try {
            let { members } = payload;
            let userId = request['user'].id;
            const getChat = await this.ChatModel.findById(chatId);
            if (!getChat)
                throw new common_1.NotFoundException('No group exits');
            if (getChat.creator.toString() !== userId)
                throw new common_1.UnauthorizedException('You are not allowed to add members');
            let newMembers = members.map((el) => new mongoose_2.default.Types.ObjectId(el));
            let uniqueMembers = this.addMembers(getChat.members, newMembers);
            getChat.members = uniqueMembers;
            await getChat.save();
        }
        catch (error) {
            throw error;
        }
    }
    async removeMembersToGroup(chatId, payload, request) {
        try {
            let { members } = payload;
            let userId = request['user'].id;
            const getChat = await this.ChatModel.findById(chatId);
            if (!getChat)
                throw new common_1.NotFoundException('No group exits');
            if (getChat.creator.toString() !== userId)
                throw new common_1.UnauthorizedException('You are not allowed to add members');
            let newMembers = members.map((el) => new mongoose_2.default.Types.ObjectId(el));
            let uniqueMembers = this.removeMembers(getChat.members, newMembers);
            if (uniqueMembers.length < 3)
                throw new common_1.UnauthorizedException('Group should have atleast 3 members');
            getChat.members = uniqueMembers;
            await getChat.save();
        }
        catch (error) {
            throw error;
        }
    }
    async leaveGroup(chatId, request) {
        try {
            let userId = request['user'].id;
            const getGroupChat = await this.ChatModel.findOne({ _id: chatId, members: { $in: [userId] } });
            if (!getGroupChat)
                throw new common_1.NotFoundException("Group chat not found or User is not in the group");
            let updatedMembers = getGroupChat.members.filter((id) => id.toString() !== userId);
            if (updatedMembers.length < 3)
                throw new common_1.ConflictException('Group must have atleast 3 members');
            if (getGroupChat.creator.toString() == userId) {
                let newCreator = Math.floor(Math.random() * updatedMembers.length);
                getGroupChat.creator = updatedMembers[newCreator];
                getGroupChat.members = updatedMembers;
                await getGroupChat.save();
                return new helper_1.ResponseBody(200, "Group updated with new Admin");
            }
            getGroupChat.members = updatedMembers;
            await getGroupChat.save();
            return new helper_1.ResponseBody(200, "Group updated");
        }
        catch (error) {
            throw error;
        }
    }
    async renameGroup(payload, chatId, request) {
        try {
            const { name } = payload;
            let userId = request['user'].id;
            const getChat = await this.ChatModel.findById(chatId);
            if (!getChat)
                throw new common_1.NotFoundException('Group not found');
            const findUser = getChat.members.find((id) => id.toString() === userId);
            if (findUser == undefined)
                throw new common_1.BadRequestException('You are not the member of the group');
            if (getChat.creator !== userId)
                throw new common_1.UnauthorizedException('You are not the admin of the group');
            getChat.name = name;
            await getChat.save();
        }
        catch (error) {
            throw error;
        }
    }
    async deleteGroup(chatId, request) {
        try {
            let userId = request['user'].id;
            const getChat = await this.ChatModel.findById(chatId);
            if (!getChat)
                throw new common_1.NotFoundException('Group not found');
            const findUser = getChat.members.find((id) => id.toString() === userId);
            if (findUser == undefined)
                throw new common_1.BadRequestException('You are not the member of the group');
            if (getChat.creator !== userId)
                throw new common_1.UnauthorizedException('You are not the admin of the group');
            await this.ChatModel.deleteOne({ _id: chatId });
        }
        catch (error) {
            throw error;
        }
    }
    addMembers(oldMembers, newMembers) {
        let updatedMembers = oldMembers;
        for (const newMember of newMembers) {
            let memberInOldMember = updatedMembers.find((id) => id.toString() == newMember.toString());
            if (memberInOldMember == undefined)
                updatedMembers.push(newMember);
        }
        return updatedMembers;
    }
    removeMembers(oldMembers, newMembers) {
        let updatedMembers = oldMembers;
        for (const newMember of newMembers) {
            updatedMembers = updatedMembers.filter((id) => id.toString() !== newMember.toString());
        }
        return updatedMembers;
    }
};
exports.ChatsService = ChatsService;
exports.ChatsService = ChatsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(chat_entity_1.Chat.name)),
    __param(1, (0, mongoose_1.InjectModel)(user_entity_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], ChatsService);
//# sourceMappingURL=chats.service.js.map