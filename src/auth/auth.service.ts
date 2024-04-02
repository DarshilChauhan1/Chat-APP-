import { BadRequestException, ConflictException, Injectable, NotFoundException, Res, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/models/user/user.entity';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ResponseBody } from 'src/helpers/helper';
import { CustomError } from 'src/helpers/errors/custom.error';

@Injectable()
export class AuthService {
    constructor(
        private configService: ConfigService,
        private readonly jwtService: JwtService,
        @InjectModel(User.name) private UserModel: Model<User>) { }

    //Signup method for user password handled by pre hook
    async signup(userPayload: SignUpDto) {
        try {
            const { name, username, email, password } = userPayload;
            if (username && email && password) {
                const existUser = await this.UserModel.findOne({ $or: [{ username }, { email }] });
                if (existUser) throw new ConflictException('User already exists');
                await this.UserModel.create({ name, username, email, password })
                return new ResponseBody(201, "new user created");
            } else {
                throw new BadRequestException('All fields are compulsory')
            }
        } catch (error) {
            console.log("Error---->", error)
            throw error
        }
    }

    async login(userPayload: LoginDto) {
        try {
            const { username, password } = userPayload;
            if (username && password) {
                const verifyUser = await this.UserModel.findOne({ username }).select("+password")
                console.log(verifyUser)
                if (!verifyUser) throw new NotFoundException('User not found')

                //Camparing the passwords
                const verifyPass = await bcrypt.compare(password, verifyUser.password)
                if (!verifyPass) throw new UnauthorizedException('Password is incorrect')
                //if user verified then generate access and refresh tokens

                const accessToken = await this.jwtService.signAsync(
                    { id: verifyUser._id, username: verifyUser.username },
                    {
                        secret: this.configService.get('ACCESS_TOKEN_SECRET'),
                        expiresIn: '3h'
                    });

                const refreshToken = await this.jwtService.signAsync({
                    id: verifyUser._id
                },
                    {
                        secret: this.configService.get('REFRESH_TOKEN_SECRET'),
                        expiresIn: '2d'
                    }
                )

                verifyUser.refreshToken = refreshToken;

                await verifyUser.save()
                const data = {
                    user : {
                        username : verifyUser.username,
                        name : verifyUser.name,
                        email : verifyUser.email,
                        _id : verifyUser._id
                    },
                    accessToken: accessToken,
                    refreshToken: refreshToken
                }
                return new ResponseBody(200, "Login Successfully", data)
            } else {
                throw new BadRequestException('All fields are required')
            }
        } catch (error) {
            console.log('Error-->', error)
            throw error
        }
    }

    async refreshTokens(tokenPayload : string) {
        try {
            const refreshToken = tokenPayload;
            if(refreshToken){
                const decode = await this.jwtService.verifyAsync(refreshToken, {secret : this.configService.get('REFRESH_TOKEN_SECRET')})
                if(decode){
                    // if the refresh token is not expired we generate a new Access token
                    const user = await this.UserModel.findOne({id : decode._id});
                    if(!user) throw new UnauthorizedException('User does not exists')
                    //verify the refresh token
                    if(user.refreshToken != refreshToken) throw new ConflictException('Refresh token is not the same')
                    const accessToken = await this.jwtService.signAsync({id : decode._id}, {secret : this.configService.get('ACCESS_TOKEN_SECRET'), expiresIn : '3h'})

                    //return new accessToken with data
                    return new ResponseBody(201, "AccessToken generated", {...user, accessToken : accessToken} )
                } else {
                    // if the refresh token is expired we will redirect the user to login
                    throw new CustomError("refresh token expired", 409, "/login")
                }

            } else {
                throw new BadRequestException('Refresh token is required')
            }
        } catch (error) {
            throw error
        }
    }


    async logout(request){
        try {
            const id = request.user.id
            if(!request.user.id) throw new NotFoundException('User not found');

            const findUser = await this.UserModel.findById(id)

            if(!findUser) throw new ConflictException('Invalid Id')

            findUser.refreshToken = null;
            await findUser.save();

            return new ResponseBody(200, "User logged out successfully")
            
        } catch (error) {
            throw error
        }
    }

}
