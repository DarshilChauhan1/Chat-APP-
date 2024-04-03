import { BadRequestException, ConflictException, Injectable, NotFoundException, Res, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, ObjectId } from 'mongoose';
import { Chat } from 'src/models/chat/chat.entity';
import { User } from 'src/models/user/user.entity';
import { GroupChatCreateDto } from './dto/groupChatCreate';
import { Request } from 'express';
import { otherMember, ResponseBody } from 'src/helpers/helper';

@Injectable()
export class ChatsService {
    constructor(
        @InjectModel(Chat.name) private ChatModel: Model<Chat>,
        @InjectModel(User.name) private UserModel: Model<User>) { }

    async createNewGroup(payload: GroupChatCreateDto, request: Request) {
        try {
            const { name, members } = payload;
            let userId = request['user'].id;
            if (members.length < 2) throw new ConflictException('there should be atleat 3 members in the group')
            const newChat = await this.ChatModel.create({
                groupChat: true,
                creator: userId,
                members: members
            })
            return new ResponseBody(200, "New Group Created", newChat);
        } catch (error) {
            throw error
        }
    }

    async fetchMyGroupChat(request: Request) {
        try {
            let userId = request['user'].id;
            const findGroupChat = await this.ChatModel.find({ members: userId, groupChat: true });
            if (!findGroupChat) throw new NotFoundException('No group chat of that user found');


            const transformedChat = findGroupChat.map(({ _id, name, members, groupChat }) => {
                return {
                    _id,
                    name,
                    groupChat,
                    members: otherMember(members, userId)
                }
            })

            return new ResponseBody(200, "Chat received", transformedChat);

        } catch (error) {
            throw error
        }
    }

    async getAllMyGroups(request: Request) {
        try {
            let userId = request['user'].id;
            const getGroupChats = await this.ChatModel.find({ creator: userId, groupChat: true }).populate('members', 'name')
            if (!getGroupChats) throw new NotFoundException('You are not admin of any group');
            return new ResponseBody(200, "User created group data", getGroupChats)

        } catch (error) {
            throw error
        }
    }

    async addMemberstoGroup(chatId: string, payload: { members: string[] }, request: Request) {
        try {
            let { members } = payload;
            let userId = request['user'].id;

            const getChat = await this.ChatModel.findById(chatId);

            if (!getChat) throw new NotFoundException('No group exits');

            if (getChat.creator.toString() !== userId) throw new UnauthorizedException('You are not allowed to add members');
            //convert all the id's from frontend to objectId's
            let newMembers = members.map((el) => new mongoose.Types.ObjectId(el));

            //will get all the unique members
            let uniqueMembers = this.addMembers(getChat.members, newMembers);
            getChat.members = uniqueMembers;
            await getChat.save()
        } catch (error) {
            throw error
        }
    }

    async removeMembersToGroup(chatId: string, payload: { members: string[] }, request: Request) {
        try {
            let { members } = payload;
            let userId = request['user'].id;

            const getChat = await this.ChatModel.findById(chatId);

            if (!getChat) throw new NotFoundException('No group exits');

            if (getChat.creator.toString() !== userId) throw new UnauthorizedException('You are not allowed to add members');
            //convert all the id's from frontend to objectId's
            let newMembers = members.map((el) => new mongoose.Types.ObjectId(el));

            //will get all the unique members
            let uniqueMembers = this.removeMembers(getChat.members, newMembers);

            if(uniqueMembers.length < 3) throw new UnauthorizedException('Group should have atleast 3 members') 

            getChat.members = uniqueMembers;
            await getChat.save()

        } catch (error) {
            throw error
        }
    }


    //Todo Leave Group
    async leaveGroup( chatId : string, request : Request){
        try {
            let userId = request['user'].id;
            const getGroupChat = await this.ChatModel.findOne({_id : chatId, members : {$in : [userId]}});

            if(!getGroupChat) throw new NotFoundException("Group chat not found or User is not in the group");

            let updatedMembers = getGroupChat.members.filter((id)=> id.toString() !== userId);

            if(updatedMembers.length < 3) throw new ConflictException('Group must have atleast 3 members')

            // when user is admin we have to assign a new admin
            if(getGroupChat.creator.toString() == userId){
                let newCreator = Math.floor(Math.random() * updatedMembers.length)
                getGroupChat.creator = updatedMembers[newCreator];
                getGroupChat.members = updatedMembers;
                await getGroupChat.save();
                return new ResponseBody(200, "Group updated with new Admin");
            }

            // when user is not admin
            getGroupChat.members = updatedMembers;
            await getGroupChat.save();
            return new ResponseBody(200, "Group updated");


        } catch (error) {
            throw error
        }
    }

    async renameGroup(payload : {name : string}, chatId : string, request : Request){
        try {
            const {name} = payload
            let userId = request['user'].id;
            const getChat = await this.ChatModel.findById(chatId);
            if(!getChat) throw new NotFoundException('Group not found');

            //checking if the user exists in the members
            const findUser = getChat.members.find((id)=> id.toString() === userId);
            if(findUser == undefined) throw new BadRequestException('You are not the member of the group')

            //admin check
            if(getChat.creator !== userId) throw new UnauthorizedException('You are not the admin of the group')

            getChat.name = name
            await getChat.save()

        } catch (error) {
            throw error
        }
    }
    async deleteGroup(chatId : string, request : Request){
        try {
            let userId = request['user'].id;
            const getChat = await this.ChatModel.findById(chatId);
            if(!getChat) throw new NotFoundException('Group not found');

            //checking if the user exists in the members
            const findUser = getChat.members.find((id)=> id.toString() === userId);
            if(findUser == undefined) throw new BadRequestException('You are not the member of the group')

            //admin check
            if(getChat.creator !== userId) throw new UnauthorizedException('You are not the admin of the group')

            await this.ChatModel.deleteOne({_id : chatId});

        } catch (error) {
            throw error
        }
    }


    private addMembers(oldMembers: ObjectId[], newMembers: any[]) {
        let updatedMembers = oldMembers;
        for (const newMember of newMembers) {
            let memberInOldMember = updatedMembers.find((id) => id.toString() == newMember.toString())
            // will get all the unique members
            if (memberInOldMember == undefined) updatedMembers.push(newMember);
        }
        return updatedMembers
    }

    private removeMembers(oldMembers: ObjectId[], newMembers: any[]) {
        let updatedMembers = oldMembers;
        for (const newMember of newMembers) {
            updatedMembers = updatedMembers.filter((id)=> id.toString() !== newMember.toString())
        }
        return updatedMembers
    }


}
