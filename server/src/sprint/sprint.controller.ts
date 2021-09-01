import { Controller, Body, Put, UseGuards, Post, Param, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { SprintDto } from './sprint.dto';
import { SprintService } from './sprint.service';

@UseGuards(AuthGuard)
@ApiTags('Sprint')
@Controller('/sprint')
export class SprintController {

    constructor(
        private sprintService: SprintService,
    ){}


    @Post()
    async create(@Body() payload: {sprint: SprintDto, workspace: string, members: string[], projectId: string}): Promise<any>{
        return await this.sprintService.create(payload.sprint, payload.workspace, payload.projectId, payload.members);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() payload: {sprint: SprintDto, workspace: string, members: string[], projectId: string}): Promise<any>{
        return await this.sprintService.update(id, payload.sprint, payload.workspace, payload.projectId, payload.members);
    }

    @Patch(':id')
    async delete(@Param('id') id: string, @Body() payload: {workspace: string, members: string[], projectId: string}): Promise<any>{
        return await this.sprintService.delete(id, payload.workspace, payload.projectId, payload.members);
    }

}