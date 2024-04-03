import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from 'express';
import { Model } from 'mongoose';
import { CustomError } from 'src/helpers/errors/custom.error';
import { ResponseBody } from 'src/helpers/helper';
import { Chat } from 'src/models/chat/chat.entity';
import { Message } from 'src/models/message/message.entity';
import { FriendRequest } from 'src/models/freindRequest/friendRequest.enitity';
import { FriendRequestEnum } from 'src/models/freindRequest/friendRequest.enum';
import { User } from 'src/models/user/user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(FriendRequest.name) private FriendRequestModel : Model<FriendRequest>,
        @InjectModel(Chat.name) private ChatModel : Model<User>,
        @InjectModel(Message.name) private MessageModel : Model<Message>,
        @InjectModel(User.name) private UserModel : Model<User>){}

    async getMyProfile(request : Request){
        try {
            const userId = request['user'].id;
            console.log(userId);
            const profile = await this.UserModel.findById(userId).select('-password')
            if(!profile) throw new NotFoundException('User not found');

            return new ResponseBody(200, "User Profile fetched successfully", profile);
        } catch (error) {
            throw error
        }
    }

    async getSearchedUser(searchQuery, request){
        try {
            let userId = request['user'].id;
            console.log(userId);
            const getAllMyChats = await this.ChatModel.find({groupChat : false, members : {$in : [userId]}})

            const AllUsersCommonChatIds = getAllMyChats.flatMap((chat)=> chat['members']);

            return new ResponseBody(200, 'Fetched', getAllMyChats);
        } catch (error) {
            throw error
        }
    }

    async sendFriendRequest(payload, request){
        try {
            const {receiverId} = payload;
            let userId = request['user'].id;

            const sendRequest = await this.FriendRequestModel.find({
                $or : [
                    { sender : userId, receiver : receiverId},
                    {sender : receiverId, receiver : userId}
                ]
            })

            if(sendRequest.length != 0) throw new BadRequestException('Request already sent');

            const requestSennt = await this.FriendRequestModel.create({
                sender : userId,
                receiver : receiverId,
            })

            return new ResponseBody(200, 'Friend Request sent successfully', requestSennt);
        } catch (error) {
            throw error
        }
    }


    async acceptFriendRequest(payload , request){
        try {
            const {senderId, accept} = payload;
            let userId = request['user'].id;

            // check for the user or sender that receiver has request or not
            const friendRequest = await this.FriendRequestModel.findOne({sender : senderId, receiver : userId, status : FriendRequestEnum.PENDING}).populate("sender", "name").populate('receiver', 'name');

            if(!friendRequest) throw new BadRequestException('Friend Request does not exists');

            if(friendRequest.receiver['_id'].toString() !== userId.toString()) throw new UnauthorizedException('You are not allowed to accept requests');

            if(!accept){
                await this.FriendRequestModel.deleteOne({_id : senderId});
            }
            const OnetoOneChatMembers = [friendRequest.sender, friendRequest.receiver];
            const newChat = await this.ChatModel.create({name : `${friendRequest.sender.name}-${friendRequest.receiver.name}`, members : OnetoOneChatMembers })
            friendRequest.status = FriendRequestEnum.ACCEPTED;
            await friendRequest.save()

            return new ResponseBody(200, "Friend Request accepeted", newChat )
        } catch (error) {
            throw error
        }
    }

    async getAllPendingRequests(request : Request){
        try {
            let userId = request['user'].id;

            const findAllPendingRequests = await this.FriendRequestModel.find({receiver : userId}).populate('sender', 'name').populate('receiver', 'name');

            // we gonna return the pending list anyway if it's empty
            return new ResponseBody(200, "User all pending requests", findAllPendingRequests);
        } catch (error) {
            throw error
        }
    }

    async getAllOnetoOneChat(request : Request){
        try {
            const userId = request['user'].id;
            const allChats = await this.ChatModel.find({members : { $in : [userId]}, groupChat : false}).populate('members', 'name')
            if(!allChats) throw new BadRequestException('No chats found for the user');
            return new ResponseBody(200, "Chats of the user", allChats)

        } catch (error) {
            throw error
        }
    }

    async getAllMessages(paylaod : {receiverId : string[], chatId : string }, request : Request){
        try {
            const {receiverId, chatId} = paylaod;
            let userId = request['user'].id
            const getAllMessages = await this.MessageModel.find({chat : chatId, updatedAt : -1}).populate('chat', 'name groupChat members')

            //case when user deletes all the chats
            if(!getAllMessages) throw new NotFoundException('User has no chats');

            // send all the user messages
            return new ResponseBody(200, "All the user messages", getAllMessages);
        } catch (error) {
            console.log(error)
            throw error
        }
    }
}
