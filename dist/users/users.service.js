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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const helper_1 = require("../helpers/helper");
const chat_entity_1 = require("../models/chat/chat.entity");
const message_entity_1 = require("../models/message/message.entity");
const friendRequest_enitity_1 = require("../models/freindRequest/friendRequest.enitity");
const friendRequest_enum_1 = require("../models/freindRequest/friendRequest.enum");
const user_entity_1 = require("../models/user/user.entity");
let UsersService = class UsersService {
    constructor(FriendRequestModel, ChatModel, MessageModel, UserModel) {
        this.FriendRequestModel = FriendRequestModel;
        this.ChatModel = ChatModel;
        this.MessageModel = MessageModel;
        this.UserModel = UserModel;
    }
    async getMyProfile(request) {
        try {
            const userId = request['user'].id;
            console.log(userId);
            const profile = await this.UserModel.findById(userId).select('-password');
            if (!profile)
                throw new common_1.NotFoundException('User not found');
            return new helper_1.ResponseBody(200, "User Profile fetched successfully", profile);
        }
        catch (error) {
            throw error;
        }
    }
    async getSearchedUser(searchQuery, request) {
        try {
            let userId = request['user'].id;
            console.log(userId);
            const getAllMyChats = await this.ChatModel.find({ groupChat: false, members: { $in: [userId] } });
            const AllUsersCommonChatIds = getAllMyChats.flatMap((chat) => chat['members']);
            return new helper_1.ResponseBody(200, 'Fetched', getAllMyChats);
        }
        catch (error) {
            throw error;
        }
    }
    async sendFriendRequest(payload, request) {
        try {
            const { receiverId } = payload;
            let userId = request['user'].id;
            const sendRequest = await this.FriendRequestModel.find({
                $or: [
                    { sender: userId, receiver: receiverId },
                    { sender: receiverId, receiver: userId }
                ]
            });
            if (sendRequest.length != 0)
                throw new common_1.BadRequestException('Request already sent');
            const requestSennt = await this.FriendRequestModel.create({
                sender: userId,
                receiver: receiverId,
            });
            return new helper_1.ResponseBody(200, 'Friend Request sent successfully', requestSennt);
        }
        catch (error) {
            throw error;
        }
    }
    async acceptFriendRequest(payload, request) {
        try {
            const { senderId, accept } = payload;
            let userId = request['user'].id;
            const friendRequest = await this.FriendRequestModel.findOne({ sender: senderId, receiver: userId, status: friendRequest_enum_1.FriendRequestEnum.PENDING }).populate("sender", "name").populate('receiver', 'name');
            if (!friendRequest)
                throw new common_1.BadRequestException('Friend Request does not exists');
            if (friendRequest.receiver['_id'].toString() !== userId.toString())
                throw new common_1.UnauthorizedException('You are not allowed to accept requests');
            if (!accept) {
                await this.FriendRequestModel.deleteOne({ _id: senderId });
            }
            const OnetoOneChatMembers = [friendRequest.sender, friendRequest.receiver];
            const newChat = await this.ChatModel.create({ name: `${friendRequest.sender.name}-${friendRequest.receiver.name}`, members: OnetoOneChatMembers });
            friendRequest.status = friendRequest_enum_1.FriendRequestEnum.ACCEPTED;
            await friendRequest.save();
            return new helper_1.ResponseBody(200, "Friend Request accepeted", newChat);
        }
        catch (error) {
            throw error;
        }
    }
    async getAllPendingRequests(request) {
        try {
            let userId = request['user'].id;
            const findAllPendingRequests = await this.FriendRequestModel.find({ receiver: userId }).populate('sender', 'name').populate('receiver', 'name');
            return new helper_1.ResponseBody(200, "User all pending requests", findAllPendingRequests);
        }
        catch (error) {
            throw error;
        }
    }
    async getAllOnetoOneChat(request) {
        try {
            const userId = request['user'].id;
            const allChats = await this.ChatModel.find({ members: { $in: [userId] }, groupChat: false }).populate('members', 'name');
            if (!allChats)
                throw new common_1.BadRequestException('No chats found for the user');
            return new helper_1.ResponseBody(200, "Chats of the user", allChats);
        }
        catch (error) {
            throw error;
        }
    }
    async getAllMessages(userId, request) {
        try {
            const getAllMessages = await this.MessageModel.find({ sender: userId }).populate('chat', 'name groupChat members');
            if (!getAllMessages)
                throw new common_1.NotFoundException('User has no chats');
            return new helper_1.ResponseBody(200, "All the user messages", getAllMessages);
            console.log(getAllMessages);
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(friendRequest_enitity_1.FriendRequest.name)),
    __param(1, (0, mongoose_1.InjectModel)(chat_entity_1.Chat.name)),
    __param(2, (0, mongoose_1.InjectModel)(message_entity_1.Message.name)),
    __param(3, (0, mongoose_1.InjectModel)(user_entity_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], UsersService);
//# sourceMappingURL=users.service.js.map