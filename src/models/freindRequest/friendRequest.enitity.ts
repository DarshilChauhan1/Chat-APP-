import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { User } from "../user/user.entity";
import { FriendRequestEnum } from "./friendRequest.enum";

export type FriendRequestDocument = mongoose.HydratedDocument<FriendRequest>

@Schema({timestamps : true})
export class FriendRequest {
    @Prop({required : true, enum : FriendRequestEnum, default : FriendRequestEnum.PENDING})
    status : string;

    @Prop({required : true, type : mongoose.Schema.Types.ObjectId, ref : "User"})
    sender : User

    @Prop({required : true, type : [{type : mongoose.Schema.Types.ObjectId, ref : "User"}]})
    receiver : User
}

export const FriendRequestSchema = SchemaFactory.createForClass(FriendRequest);