import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProjectDto } from './project.dto';
import { ProjectService } from './project.service';

@ApiTags('Project')
@Controller('projects')
export class ProjectController{

    constructor(
        private projectService: ProjectService
    ){}

    @Get(':workspaceID')
    async list(@Param('workspaceID') workspaceID: string): Promise<any>{
        try{
            return this.projectService.all(workspaceID);
        }
        catch(err){
            throw err;
        }
    }

    @Post()
    async create(@Body() payload: ProjectDto): Promise<any>{
        try{
            return this.projectService.create(payload);
        }
        catch(err){
            throw err;
        }
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() payload: ProjectDto): Promise<any>{
        return await this.projectService.update(id, payload);
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<any>{
        return await this.projectService.delete(id);
    }
}