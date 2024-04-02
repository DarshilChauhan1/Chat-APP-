import { Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatsController } from './chats.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatSchema } from 'src/models/chat/chat.entity';
import { UserSchema } from 'src/models/user/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports : [MongooseModule.forFeature([{name : 'Chat', schema : ChatSchema}, {name : 'User', schema : UserSchema}]), JwtModule, ConfigModule],
  controllers: [ChatsController],
  providers: [ChatsService],
})
export class ChatsModule {}
