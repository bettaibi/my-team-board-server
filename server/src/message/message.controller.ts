import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/decorators/user.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { MessageDto } from './message.dto';
import { MessageService } from './message.service';

@UseGuards(AuthGuard)
@ApiTags('Message')
@Controller('messages')
export class MessageController{

    constructor(
        private messageService: MessageService,
    ){}

    @Get(':workspaceID/:receptorId')
    async list(
        @Param('workspaceID') workspaceId: string, 
        @Param('receptorId') receptorId: string , 
        @User() userId: string): Promise<any>{
        try{
            return this.messageService.all(workspaceId, receptorId, userId);
        }
        catch(err){
            throw err;
        }
    }

    @Post()
    async create(@Body() payload: MessageDto): Promise<any>{
        try{
            return this.messageService.create(payload);
        }
        catch(err){
            throw err;
        }
    }

  
}