import { Body, Controller, Get, Param, Post, Query, Req, UseFilters, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { ExceptionHandling } from 'src/common/filters/exception.filters';
import { UsersService } from './users.service';


@UseFilters(ExceptionHandling)
@UseGuards(AuthGuard)
@UsePipes(ValidationPipe)
@Controller('api/users')
export class UsersController {
    constructor(private readonly userService : UsersService){}

    @Get('profile')
    getMyProfile(@Req() request : Request){
        return this.userService.getMyProfile(request)
    }

    //Todo search functionality
    @Get('search')
    getAllSearchedUser(@Query('search') query : string, @Req() request : Request){
        return this.userService.getSearchedUser(query, request);
    }

    @Post('send-request')
    sendFriendRequest(@Body() payload : any, @Req() request : Request){
        return this.userService.sendFriendRequest(payload, request);
    }

    @Post('accept-request')
    acceptFriendRequest(@Body() payload : any, @Req() request : Request){
        return this.userService.acceptFriendRequest(payload, request)  
    }

    @Get('pending-requests')
    getAllPendingRequests(@Req() request : Request){
        return this.userService.getAllPendingRequests(request)
    }

    @Get('mychats')
    getAllOnetoOneChats(@Req() request : Request){
        return 
    }

    @Get('messages/:userId')
        getAllMessages(@Param('userId') params : string, @Req() request : Request ){
            return this.userService.getAllMessages(params, request )
        }
    
}
