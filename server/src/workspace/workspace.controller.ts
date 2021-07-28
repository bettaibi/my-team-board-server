import { Controller, Get, Post, Body, Put, Delete, Param, Query, UseGuards, Patch} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/decorators/user.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { WorkspaceDto } from './workspace.dto';
import { WorkspaceService } from './workspace.service';

@UseGuards(AuthGuard)
@ApiTags('workspace')
@Controller('workspace')
export class WorkspaceController{

    constructor(
        private workspaceService: WorkspaceService
    ){}

    @Get()
    async myWorkspaces(@User() userID: string): Promise<any>{
        try{
            return this.workspaceService.myWorkspaces(userID);
        }
        catch(err){
            throw err;
        }
    }

    @Get('switch/:workspaceId')
    async switchToWorkspace(@Param('workspaceId') workspaceId: string, @User() userID: string): Promise<any>{
        try{
            return this.workspaceService.switchToWorkspace(workspaceId, userID);
        }
        catch(err){
            throw err;
        }
    }

    @Post()
    async create(@User() userID: string, @Body() payload: WorkspaceDto): Promise<any>{
        try{
            return this.workspaceService.create(userID, payload);
        }
        catch(err){
            throw err;
        }
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() payload: WorkspaceDto): Promise<any>{
        return await this.workspaceService.update(id, payload);
    }

    @Patch('addMember')
    async addNewMember(@Query('workspaceId') workspaceId: string, 
    @Query('memberId') memberId: string): Promise<any>{
      try{
        return await this.workspaceService.addNewMember(workspaceId, memberId);
      }
      catch(err){
          throw err;
      }
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<any>{
        return await this.workspaceService.delete(id);
    }

}