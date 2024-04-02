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
import * as mongoose from "mongoose";
import { User } from "../user/user.entity";
export type FriendRequestDocument = mongoose.HydratedDocument<FriendRequest>;
export declare class FriendRequest {
    status: string;
    sender: User;
    receiver: User;
}
export declare const FriendRequestSchema: mongoose.Schema<FriendRequest, mongoose.Model<FriendRequest, any, any, any, mongoose.Document<unknown, any, FriendRequest> & FriendRequest & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, FriendRequest, mongoose.Document<unknown, {}, mongoose.FlatRecord<FriendRequest>> & mongoose.FlatRecord<FriendRequest> & {
    _id: mongoose.Types.ObjectId;
}>;
