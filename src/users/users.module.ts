import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
import { ChatSchema } from 'src/models/chat/chat.entity';
import { MessageSchema } from 'src/models/message/message.entity';
import { ConfigModule } from '@nestjs/config';
import { UserSchema } from 'src/models/user/user.entity';
import {FriendRequest, FriendRequestSchema } from 'src/models/freindRequest/friendRequest.enitity';

@Module({
  imports :[MongooseModule.forFeature([{name : 'Chat', schema : ChatSchema}, {name : 'Message', schema : MessageSchema}, {name : 'User', schema : UserSchema}, {name : 'FriendRequest', schema : FriendRequestSchema}]), ConfigModule.forRoot(), JwtModule, AuthModule], 
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}