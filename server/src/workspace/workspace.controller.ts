import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/decorators/user.decorator';
import { WorkspaceDto } from './workspace.dto';
import { WorkspaceService } from './workspace.service';

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

    @Post()
    async create(@Body() payload: WorkspaceDto): Promise<any>{
        try{
            return this.workspaceService.create(payload);
        }
        catch(err){
            throw err;
        }
    }


}