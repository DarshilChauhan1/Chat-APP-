import { Body, Controller, Post, Req, UseFilters, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { ExceptionHandling } from 'src/common/filters/exception.filters';
import { Request } from 'express';
import { AuthGuard } from './auth.guard';


@UseFilters(ExceptionHandling)
@UsePipes(ValidationPipe)
@Controller('auth')
export class AuthController {
    constructor(private readonly authService : AuthService){}
    
    @Post('signup')
    async signup(@Body() payload :  SignUpDto){
        return this.authService.signup(payload);
    }

    @Post('login')
    async login(@Body() payload : LoginDto){
        return this.authService.login(payload)
    }

    @Post('refresh')
    async refreshToken(@Body() tokens : string ){
        return this.authService.refreshTokens(tokens)
    }

    @UseGuards(AuthGuard)
    @Post('logout')
    async logout(@Req() req : Request){
        return this.authService.logout(req);
    }

}
