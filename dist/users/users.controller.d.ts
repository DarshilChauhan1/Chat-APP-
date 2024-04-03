import { Request } from 'express';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly userService;
    constructor(userService: UsersService);
    getMyProfile(request: Request): Promise<import("src/helpers/helper").ResponseBody>;
    getAllSearchedUser(query: string, request: Request): Promise<import("src/helpers/helper").ResponseBody>;
    sendFriendRequest(payload: any, request: Request): Promise<import("src/helpers/helper").ResponseBody>;
    acceptFriendRequest(payload: any, request: Request): Promise<import("src/helpers/helper").ResponseBody>;
    getAllPendingRequests(request: Request): Promise<import("src/helpers/helper").ResponseBody>;
    getAllOnetoOneChats(request: Request): void;
    getAllMessages(paylaod: {
        receiverId: string[];
        chatId: string;
    }, request: Request): Promise<import("src/helpers/helper").ResponseBody>;
}
