import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { Role } from "src/common/enums/role.enum";


export type UserDocument = HydratedDocument<User>

@Schema({timestamps : true})
export class User {
    @Prop({required : true})
    name : string;

    @Prop({required : true})
    username : string;

    @Prop({required : true})
    email : string

    @Prop({required : true, select : false})
    password : string

    @Prop()
    refreshToken : string

    @Prop({})
    forgotPassToken : string

    @Prop({type : Date})
    forgotPassExpiry : Date

    @Prop({enum : Role, default : Role.USER})
    role : Role

}

export const UserSchema = SchemaFactory.createForClass(User);