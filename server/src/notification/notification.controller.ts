import { Controller, UseGuards, Get, Post, Delete, Patch, Param, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/decorators/user.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { NotificaionDto } from './notification.dto';
import { NotificationService } from './notification.service';

@UseGuards(AuthGuard)
@ApiTags('Notification')
@Controller('notifications')
export class NotificationController {

    constructor(
        private notificationService: NotificationService,
    ){}

    @Get('/:workspaceId')
    async getNotificationsByUser(@Param('workspaceId') workspaceId: string, @User() userId: string): Promise<any>{
        try{
            return this.notificationService.all(workspaceId, userId)
        }
        catch(err){
            throw err;
        }
    }

    @Post()
    async create(@Body() payload: NotificaionDto): Promise<any>{
        try{
            return this.notificationService.create(payload);
        }
        catch(err){
            throw err;
        }
    }

    @Delete('/:id')
    async delete(@Param('id') id: string): Promise<any>{
        try{
            return this.notificationService.delete(id);
        }
        catch(err){
            throw err;
        }
    }

    @Patch('/:workspaceId')
    async seenBy(@Param('workspaceId') workspaceId: string, @User() userId: string): Promise<any>{
        try{
            return this.notificationService.seenBy(workspaceId, userId);
        }
        catch(err){
            throw err;
        }
    }

}
