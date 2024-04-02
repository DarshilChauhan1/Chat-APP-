import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ChatsModule } from './chats/chats.module';
import { AuthModule } from './auth/auth.module';
import { GatewayModule } from './gateway/gateway.module';

@Module({
  imports: [UsersModule, ChatsModule, AuthModule, GatewayModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
