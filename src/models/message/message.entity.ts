import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { User } from "../user/user.entity";
import {Chat} from '../chat/chat.entity'

export type MessageDocument = mongoose.HydratedDocument<Message>

@Schema({timestamps : true})
export class Message {
    @Prop()
    content : string;

    @Prop({required : true, type : mongoose.Schema.Types.ObjectId, ref : "Chat"})
    chat : Chat

    @Prop({required : true, type : mongoose.Schema.Types.ObjectId, ref : "User"})
    sender : User

    @Prop({required : true, type : [{type : mongoose.Schema.Types.ObjectId, ref : "User"}]})
    receiver : mongoose.Schema.Types.ObjectId[]
}

export const MessageSchema = SchemaFactory.createForClass(Message);