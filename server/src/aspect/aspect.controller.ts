import { Controller, Body, Put, UseGuards, Post, Param, Patch, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { AspectDto } from './aspect.dto';
import { AspectService } from './aspect.service';

@UseGuards(AuthGuard)
@ApiTags('Aspect')
@Controller('/aspects')
export class AspectController {

    constructor(
        private aspectService: AspectService,
    ){}

    @Get(':id')
    async list(@Param('id') id: string): Promise<any>{
        return await this.aspectService.all(id);
    }

    @Post()
    async create(@Body() payload: {aspect: AspectDto, members: string[], workspace: string}): Promise<any>{
        return await this.aspectService.create(payload.aspect, payload.members, payload.workspace);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() payload: {aspect: AspectDto, workspace: string, members: string[]}): Promise<any>{
        return await this.aspectService.update(id, payload.aspect, payload.workspace, payload.members);
    }

    @Patch(':id')
    async delete(@Param('id') id: string, @Body() payload: {members: string[], workspace: string, projectId: string}): Promise<any>{
        return await this.aspectService.delete(id, payload.members, payload.workspace, payload.projectId);
    }

}