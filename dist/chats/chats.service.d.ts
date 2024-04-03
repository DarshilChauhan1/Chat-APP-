/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Model } from 'mongoose';
import { Chat } from 'src/models/chat/chat.entity';
import { User } from 'src/models/user/user.entity';
import { GroupChatCreateDto } from './dto/groupChatCreate';
import { Request } from 'express';
import { ResponseBody } from 'src/helpers/helper';
export declare class ChatsService {
    private ChatModel;
    private UserModel;
    constructor(ChatModel: Model<Chat>, UserModel: Model<User>);
    createNewGroup(payload: GroupChatCreateDto, request: Request): Promise<ResponseBody>;
    fetchMyGroupChat(request: Request): Promise<ResponseBody>;
    getAllMyGroups(request: Request): Promise<ResponseBody>;
    addMemberstoGroup(chatId: string, payload: {
        members: string[];
    }, request: Request): Promise<void>;
    removeMembersToGroup(chatId: string, payload: {
        members: string[];
    }, request: Request): Promise<void>;
    leaveGroup(chatId: string, request: Request): Promise<ResponseBody>;
    renameGroup(payload: {
        name: string;
    }, chatId: string, request: Request): Promise<void>;
    deleteGroup(chatId: string, request: Request): Promise<void>;
    private addMembers;
    private removeMembers;
}
