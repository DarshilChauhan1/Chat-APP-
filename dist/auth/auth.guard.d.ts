import { CanActivate, ExecutionContext } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
export declare class AuthGuard implements CanActivate {
    private configService;
    private readonly jwtService;
    constructor(configService: ConfigService, jwtService: JwtService);
    canActivate(context: ExecutionContext): Promise<boolean>;
    private fetchToken;
}
