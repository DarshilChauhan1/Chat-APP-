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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const custom_error_1 = require("../helpers/errors/custom.error");
let AuthGuard = class AuthGuard {
    constructor(configService, jwtService) {
        this.configService = configService;
        this.jwtService = jwtService;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const Token = this.fetchToken(request);
        if (!Token)
            throw new custom_error_1.CustomError('Token not found', 409, '/login');
        try {
            const verifyUser = await this.jwtService.verifyAsync(Token, { secret: this.configService.get('ACCESS_TOKEN_SECRET') });
            request['user'] = verifyUser;
            return true;
        }
        catch (error) {
            if (error.name === 'TokenExpiredError') {
                throw new custom_error_1.CustomError('Token expired', 401, '/refresh');
            }
            else {
                throw new common_1.UnauthorizedException('Invalid Token');
            }
        }
    }
    fetchToken(request) {
        const [type, token] = request.headers['authorization'].split(" ");
        return type == 'Bearer' ? token : undefined;
    }
};
exports.AuthGuard = AuthGuard;
exports.AuthGuard = AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        jwt_1.JwtService])
], AuthGuard);
//# sourceMappingURL=auth.guard.js.map