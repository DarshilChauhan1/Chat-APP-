import { ChatsService } from './chats.service';
import { GroupChatCreateDto } from './dto/groupChatCreate';
import { Request } from 'express';
export declare class ChatsController {
    private readonly chatsService;
    constructor(chatsService: ChatsService);
    createNewGroup(payload: GroupChatCreateDto, request: Request): Promise<import("src/helpers/helper").ResponseBody>;
    fetchMyGroupChat(request: Request): Promise<import("src/helpers/helper").ResponseBody>;
    getAllMyGroups(request: Request): Promise<import("src/helpers/helper").ResponseBody>;
    addMemberstoGroup(params: string, payload: {
        members: string[];
    }, request: Request): Promise<void>;
    removeMembersToGroup(params: string, payload: {
        members: string[];
    }, request: Request): Promise<void>;
    leaveGroup(payload: {
        leaverId: string;
    }, params: string, request: Request): void;
    renameGroup(payload: {
        name: string;
    }, parmas: string, request: Request): Promise<void>;
    deleteGroup(parmas: string, request: Request): Promise<void>;
}
