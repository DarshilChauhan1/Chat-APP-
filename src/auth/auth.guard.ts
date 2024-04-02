import { CanActivate, ConflictException, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { CustomError } from "src/helpers/errors/custom.error";


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private configService: ConfigService,
        private readonly jwtService: JwtService) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>();
        const Token = this.fetchToken(request);
        
        //Custom error to redirect the user to login
        if (!Token) throw new CustomError('Token not found', 409, '/login');
        try {
            const verifyUser =  await this.jwtService.verifyAsync(Token, { secret: this.configService.get('ACCESS_TOKEN_SECRET') });
            request['user'] = verifyUser;
            return true;
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                throw new CustomError('Token expired', 401, '/refresh');
            } else {
                throw new UnauthorizedException('Invalid Token');
            }
        }
    }

    private fetchToken(request: Request) {
        //fetching the token from authorization header
        const [type, token] = request.headers['authorization'].split(" ")
        return type == 'Bearer' ? token : undefined
    }
}