import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { mongooseConfigasync } from './common/config/mongooseConfigasync';
import { ConfigModule } from '@nestjs/config';
import { ChatsModule } from './chats/chats.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync(mongooseConfigasync),
    AuthModule, CommonModule, UsersModule, ChatsModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
