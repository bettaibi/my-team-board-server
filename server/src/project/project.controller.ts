import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/decorators/user.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { ProjectDto } from './project.dto';
import { ProjectService } from './project.service';

@UseGuards(AuthGuard)
@ApiTags('Project')
@Controller('projects')
export class ProjectController{

    constructor(
        private projectService: ProjectService
    ){}

    @Get(':workspaceID')
    async list(@Param('workspaceID') workspaceID: string, @User() userID: string): Promise<any>{
        try{
            return this.projectService.all(workspaceID, userID);
        }
        catch(err){
            throw err;
        }
    }

    @Post()
    async create(@Body() payload: ProjectDto, @User() userID: string): Promise<any>{
        try{
            return this.projectService.create(payload, userID);
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