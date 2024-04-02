import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseFilters, UseGuards } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { GroupChatCreateDto } from './dto/groupChatCreate';
import { Request } from 'express';
import { ExceptionHandling } from 'src/common/filters/exception.filters';
import { AuthGuard } from 'src/auth/auth.guard';

@UseFilters(ExceptionHandling)
@UseGuards(AuthGuard)
@Controller('api/chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) { }
  //create a new group
  @Post('new')
  createNewGroup(@Body() payload : GroupChatCreateDto, @Req() request : Request ){
    return this.chatsService.createNewGroup(payload, request);
  }
  //fetch details of my group
  @Get('mychat')
  fetchMyGroupChat(@Req() request : Request){
    return this.chatsService.fetchMyGroupChat(request)
  }

  //get My groups
  @Get('mygroups')
  getAllMyGroups(@Req() request : Request){
    return this.chatsService.getAllMyGroups(request)
  }
  //add members to the group
  @Put('groups/add/:chatId')
  addMemberstoGroup(@Param('chatId') params : string, @Body() payload : {members : string[]}, @Req() request : Request){
    return this.chatsService.addMemberstoGroup(params, payload, request);
  }
  //remove members to the group
  @Put('groups/remove/:chatId')
  removeMembersToGroup(@Param('chatId') params : string, @Body() payload : {members : string[]}, @Req() request : Request){
    return this.chatsService.removeMembersToGroup(params, payload, request)
  }
  //leave group
  @Delete('groups/leave/:chatId')
    leaveGroup(@Body() payload : {leaverId : string}, @Param('chatId') params : string, @Req() request : Request){
      return
    }
  //rename group
  @Put('groups/:chatId')
  renameGroup(@Body() payload : {name : string}, @Param('chatId') parmas : string, @Req() request : Request){
    return this.chatsService.renameGroup(payload, parmas, request);
  }
  //delete group
  @Delete('groups/:chatId')
  deleteGroup(@Param('chatId') parmas : string, @Req() request : Request){
    return this.chatsService.deleteGroup(parmas, request)
  }
}
