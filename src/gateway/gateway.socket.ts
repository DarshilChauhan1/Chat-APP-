import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { NEW_MESSAGE, REFETCH_CHATS } from "src/common/constants/event.constants";
import { Server, Socket } from 'socket.io'
import { NotFoundException, OnModuleInit, Req, UseFilters } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { CustomError } from "src/helpers/errors/custom.error";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "src/models/user/user.entity";
import { Model } from "mongoose";
import { ExceptionHandling } from "src/common/filters/exception.filters";
import { Message } from "src/models/message/message.entity";

@UseFilters(ExceptionHandling)
@WebSocketGateway()
export class MyGateway implements OnModuleInit {
    constructor(
        @InjectModel(User.name) private UserModel: Model<User>,
        @InjectModel(Message.name) private MessageModel: Model<Message>,
        private configService: ConfigService,
        private jwtService: JwtService) { }
    private userSocketIds = new Map<string, string>()
    @WebSocketServer()
    server: Server

    onModuleInit() {
        this.server.use(async (socket: Socket, next: (err?: any) => void) => this.socketAuthenticator(socket, next))
        this.server.on('connection', async (socket: Socket) => {
            let user = socket['user'];
            this.userSocketIds.set(user._id.toString(), socket.id);

            // socket.on(REFETCH_CHATS, async({chatId, receiverId})=>{
            //     let socketId = this.userSocketIds.get(user._id.toString());
            //     console.log(socketId)
            //     let messages = []
            //     try {
            //         messages = await this.MessageModel.find({chat : chatId, $or : [{receiver : {$in : [receiverId, user._id]}}, 
            //         {sender : {$in :[user._id, receiverId]}}]}).select('content chatId')
            //         console.log(messages);
            //     } catch (error) {
            //         throw error
            //     }
                
            //     const messagesForRealTime = {
            //         messages : messages,
            //         chat : chatId,
            //     }
            //     socket.to(socketId).emit(REFETCH_CHATS, messagesForRealTime)
            // })
            socket.on(NEW_MESSAGE, async ({ chatId, members, content }) => {
                const messageForRealtime = {
                    content,
                    sender: {
                        id: user._id.toString()
                    },
                    chat: chatId,
                    createdAt: new Date().toISOString()
                }
                console.log(messageForRealtime);


                let data = this.getSocketsofMembers(members)

                let messageForDB = {
                    content,
                    sender : user._id,
                    chat : chatId,
                    receiver : data.members
                }


                this.server.to(data['socketIds']).emit(NEW_MESSAGE, {
                    chatId,
                    message : messageForRealtime
                })

                try {
                    await this.MessageModel.create(messageForDB);
                } catch (error) {
                    throw error
                }
            })


            socket.on('disconnect', () => {
                this.userSocketIds.delete(user._id);
                console.log('User disconnected')
            })
        })
    }

    private async socketAuthenticator( socket: Socket, next: any) {
        console.log('Enter')
        try {
            let token = socket.request.headers.authorization;
            console.log(token);
            if (!token) throw new NotFoundException('Token not found');

            const decode = await this.jwtService.verifyAsync(token, { secret: this.configService.get('ACCESS_TOKEN_SECRET') });

            if (!decode) throw new CustomError("Token expired or invalid", 404, '/refresh');

            socket['user'] = await this.UserModel.findById(decode.id);

            return next();
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    private getSocketsofMembers(members : string[]){
        let data = {
            members : [],
            socketIds : []
        }
        members.map((ids)=> {
            if(this.userSocketIds.get(ids) != undefined){
                data.members.push(ids);
                data.socketIds.push(this.userSocketIds.get(ids))
            }
        });
        return data;
    }

}