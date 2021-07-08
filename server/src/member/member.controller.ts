import { Controller, Get, Post, Body, Put, Delete, UseGuards, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { MemberDto } from './member.dto';
import { MemberService } from './member.service';

@UseGuards(AuthGuard)
@ApiTags('Members')
@Controller('/members')
export class MemberController {

    constructor(
        private memberService: MemberService,
    ){}

    @Get()
    async getMembers(): Promise<any>{
        return await this.memberService.all();
    }

    @Post()
    async create(@Body() payload: MemberDto): Promise<any>{
        return await this.memberService.create(payload);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() payload: MemberDto): Promise<any>{
        return await this.memberService.update(id, payload);
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<any>{
        return await this.memberService.delete(id);
    }
}