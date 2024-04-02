import { Module } from '@nestjs/common';
import { MyGateway } from './gateway.socket';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/models/user/user.entity';
import { MessageSchema } from 'src/models/message/message.entity';

@Module({
    imports : [JwtModule, ConfigModule.forRoot(), MongooseModule.forFeature([{name : 'User', schema : UserSchema}, {name : 'Message', schema : MessageSchema}])],
    providers : [MyGateway]
})
export class GatewayModule {}

