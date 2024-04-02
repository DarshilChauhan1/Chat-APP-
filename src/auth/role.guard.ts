import { CanActivate, ExecutionContext, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "../common/enums/role.enum";
import { CHECK_ROLE } from "../common/decorators/role.decorator";
import { Request } from "express";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "src/models/user/user.entity";


@Injectable()
export class RoleGuard implements CanActivate{
    constructor(
        @InjectModel(User.name) private UserModel: Model<User>, 
        private readonly reflector : Reflector){}
    async canActivate(context: ExecutionContext): Promise<any> {
        const getRoles = this.reflector.get<Role[]>(CHECK_ROLE, context.getHandler());
        const request = context.switchToHttp().getRequest<Request>();

        //we will get a user obj in the request body as we have passed the user key in login
        const user = request['user'];
        const verifyRole = await this.UserModel.findOne({_id : user._id}, 'role');
        if(!verifyRole) throw new NotFoundException('User not found');
        if(verifyRole.role === getRoles[0]) return true;

        throw new UnauthorizedException('You are not authorized to this route')
    }
}