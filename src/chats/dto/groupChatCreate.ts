import { IsArray, IsString } from "class-validator";

export class GroupChatCreateDto{
    @IsString()
    name : string

    @IsArray()
    members : string[]
}