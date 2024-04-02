import { IsEmail, IsString } from "class-validator";

export class SignUpDto{
    @IsString()
    name : string

    @IsString()
    username : string

    @IsString()
    password : string

    @IsEmail()
    email : string
}