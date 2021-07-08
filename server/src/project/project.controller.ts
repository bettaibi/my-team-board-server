import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProjectDto } from './project.dto';
import { ProjectService } from './project.service';

@ApiTags('Project')
@Controller('projects')
export class ProjectController{

    constructor(
        private projectService: ProjectService
    ){}

    @Get()
    async list(): Promise<any>{
        try{
            return this.projectService.all();
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
}