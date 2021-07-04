import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { WorkspaceDto } from './workspace.dto';
import { WorkspaceService } from './workspace.service';

@ApiTags('workspace')
@Controller('workspace')
export class WorkspaceController{

    constructor(
        private workspaceService: WorkspaceService
    ){}

    @Get()
    async list(): Promise<any>{
        try{
            return this.workspaceService.all();
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