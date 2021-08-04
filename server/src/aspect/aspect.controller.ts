import { Controller, Body, Put, UseGuards, Post, Param, Delete, Get } from '@nestjs/common';
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

    @Get()
    async list(): Promise<any>{
        return await this.aspectService.all();
    }

    @Post()
    async create(@Body() payload: AspectDto): Promise<any>{
        return await this.aspectService.create(payload);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() payload: AspectDto): Promise<any>{
        return await this.aspectService.update(id, payload);
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<any>{
        return await this.aspectService.delete(id);
    }

}