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
import { Server } from 'socket.io';
import { OnModuleInit } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { User } from "src/models/users/user.entity";
import { Model } from "mongoose";
import { Message } from "src/models/message/message.entity";
export declare class MyGateway implements OnModuleInit {
    private UserModel;
    private MessageModel;
    private configService;
    private jwtService;
    constructor(UserModel: Model<User>, MessageModel: Model<Message>, configService: ConfigService, jwtService: JwtService);
    private userSocketIds;
    server: Server;
    onModuleInit(): void;
    onNewMessage(payload: any): void;
    private socketAuthenticator;
    private getSocketsofMembers;
}
