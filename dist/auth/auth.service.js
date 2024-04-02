"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_entity_1 = require("../models/user/user.entity");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const helper_1 = require("../helpers/helper");
const custom_error_1 = require("../helpers/errors/custom.error");
let AuthService = class AuthService {
    constructor(configService, jwtService, UserModel) {
        this.configService = configService;
        this.jwtService = jwtService;
        this.UserModel = UserModel;
    }
    async signup(userPayload) {
        try {
            const { name, username, email, password } = userPayload;
            if (username && email && password) {
                const existUser = await this.UserModel.findOne({ $or: [{ username }, { email }] });
                if (existUser)
                    throw new common_1.ConflictException('User already exists');
                await this.UserModel.create({ name, username, email, password });
                return new helper_1.ResponseBody(201, "new user created");
            }
            else {
                throw new common_1.BadRequestException('All fields are compulsory');
            }
        }
        catch (error) {
            console.log("Error---->", error);
            throw error;
        }
    }
    async login(userPayload) {
        try {
            const { username, password } = userPayload;
            if (username && password) {
                const verifyUser = await this.UserModel.findOne({ username }).select("+password");
                console.log(verifyUser);
                if (!verifyUser)
                    throw new common_1.NotFoundException('User not found');
                const verifyPass = await bcrypt.compare(password, verifyUser.password);
                if (!verifyPass)
                    throw new common_1.UnauthorizedException('Password is incorrect');
                const accessToken = await this.jwtService.signAsync({ id: verifyUser._id, username: verifyUser.username }, {
                    secret: this.configService.get('ACCESS_TOKEN_SECRET'),
                    expiresIn: '3h'
                });
                const refreshToken = await this.jwtService.signAsync({
                    id: verifyUser._id
                }, {
                    secret: this.configService.get('REFRESH_TOKEN_SECRET'),
                    expiresIn: '2d'
                });
                verifyUser.refreshToken = refreshToken;
                await verifyUser.save();
                const data = {
                    user: {
                        username: verifyUser.username,
                        name: verifyUser.name,
                        email: verifyUser.email,
                        _id: verifyUser._id
                    },
                    accessToken: accessToken,
                    refreshToken: refreshToken
                };
                return new helper_1.ResponseBody(200, "Login Successfully", data);
            }
            else {
                throw new common_1.BadRequestException('All fields are required');
            }
        }
        catch (error) {
            console.log('Error-->', error);
            throw error;
        }
    }
    async refreshTokens(tokenPayload) {
        try {
            const refreshToken = tokenPayload;
            if (refreshToken) {
                const decode = await this.jwtService.verifyAsync(refreshToken, { secret: this.configService.get('REFRESH_TOKEN_SECRET') });
                if (decode) {
                    const user = await this.UserModel.findOne({ id: decode._id });
                    if (!user)
                        throw new common_1.UnauthorizedException('User does not exists');
                    if (user.refreshToken != refreshToken)
                        throw new common_1.ConflictException('Refresh token is not the same');
                    const accessToken = await this.jwtService.signAsync({ id: decode._id }, { secret: this.configService.get('ACCESS_TOKEN_SECRET'), expiresIn: '3h' });
                    return new helper_1.ResponseBody(201, "AccessToken generated", { ...user, accessToken: accessToken });
                }
                else {
                    throw new custom_error_1.CustomError("refresh token expired", 409, "/login");
                }
            }
            else {
                throw new common_1.BadRequestException('Refresh token is required');
            }
        }
        catch (error) {
            throw error;
        }
    }
    async logout(request) {
        try {
            const id = request.user.id;
            if (!request.user.id)
                throw new common_1.NotFoundException('User not found');
            const findUser = await this.UserModel.findById(id);
            if (!findUser)
                throw new common_1.ConflictException('Invalid Id');
            findUser.refreshToken = null;
            await findUser.save();
            return new helper_1.ResponseBody(200, "User logged out successfully");
        }
        catch (error) {
            throw error;
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, mongoose_1.InjectModel)(user_entity_1.User.name)),
    __metadata("design:paramtypes", [config_1.ConfigService,
        jwt_1.JwtService,
        mongoose_2.Model])
], AuthService);
//# sourceMappingURL=auth.service.js.map