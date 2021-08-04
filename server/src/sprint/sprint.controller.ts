import { Controller, Body, Put, UseGuards, Post, Param, Delete, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/decorators/user.decorator';
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
    async create(@Body() payload: SprintDto): Promise<any>{
        return await this.sprintService.create(payload);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() payload: SprintDto): Promise<any>{
        return await this.sprintService.update(id, payload);
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<any>{
        return await this.sprintService.delete(id);
    }

}