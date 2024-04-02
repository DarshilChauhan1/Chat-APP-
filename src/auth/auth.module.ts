import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/models/user/user.entity';
import * as bcrypt from 'bcrypt'
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports : [MongooseModule.forFeatureAsync([{
    name : 'User',
    useFactory : ()=>{
      const Schema = UserSchema
      Schema.pre('save', async function(){
        if(!this.isModified('password')) return;
        this.password = await bcrypt.hash(this.password, 10);
      })
      return Schema
    }
  }]), JwtModule, ConfigModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
