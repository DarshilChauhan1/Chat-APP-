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
import { Request } from 'express';
import { Model } from 'mongoose';
import { ResponseBody } from 'src/helpers/helper';
import { Message } from 'src/models/message/message.entity';
import { FriendRequest } from 'src/models/freindRequest/friendRequest.enitity';
import { User } from 'src/models/user/user.entity';
export declare class UsersService {
    private FriendRequestModel;
    private ChatModel;
    private MessageModel;
    private UserModel;
    constructor(FriendRequestModel: Model<FriendRequest>, ChatModel: Model<User>, MessageModel: Model<Message>, UserModel: Model<User>);
    getMyProfile(request: Request): Promise<ResponseBody>;
    getSearchedUser(searchQuery: any, request: any): Promise<ResponseBody>;
    sendFriendRequest(payload: any, request: any): Promise<ResponseBody>;
    acceptFriendRequest(payload: any, request: any): Promise<ResponseBody>;
    getAllPendingRequests(request: Request): Promise<ResponseBody>;
    getAllOnetoOneChat(request: Request): Promise<ResponseBody>;
    getAllMessages(userId: string, request: Request): Promise<ResponseBody>;
}
