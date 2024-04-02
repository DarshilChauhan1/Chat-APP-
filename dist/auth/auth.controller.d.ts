import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { Request } from 'express';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signup(payload: SignUpDto): Promise<import("src/helpers/helper").ResponseBody>;
    login(payload: LoginDto): Promise<import("src/helpers/helper").ResponseBody>;
    refreshToken(tokens: string): Promise<import("src/helpers/helper").ResponseBody>;
    logout(req: Request): Promise<import("src/helpers/helper").ResponseBody>;
}
