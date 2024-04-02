import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";


export type ChatDocument = mongoose.HydratedDocument<Chat>

@Schema({timestamps : true})
export class Chat {
    @Prop({required : true})
    name : string;

    @Prop({required : true, default : false, type : "boolean"})
    groupChat : boolean;

    @Prop({type : mongoose.Schema.Types.ObjectId, ref : "User"})
    creator : mongoose.Schema.Types.ObjectId

    @Prop({required : true, type : [{type : mongoose.Schema.Types.ObjectId, ref : "User"}]})
    members : mongoose.Schema.Types.ObjectId[]
}

export const ChatSchema = SchemaFactory.createForClass(Chat);