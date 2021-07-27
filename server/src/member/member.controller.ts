import { Controller, Get, Post, Body, Put, Delete, UseGuards, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/decorators/user.decorator';
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

    @Get('search/:keyword')
    async getMembersByKeyword(@Param('keyword') keyword: string): Promise<any>{
        return await this.memberService.getmemberByKeyword(keyword);
    }

    @Post()
    async create(@Body() payload: MemberDto): Promise<any>{
        return await this.memberService.create(payload);
    }

    @Put()
    async update(@User() userID: string, @Body() payload: MemberDto): Promise<any>{
        return await this.memberService.update(userID, payload);
    }

    @Delete()
    async delete(@User() userID: string): Promise<any>{
        return await this.memberService.delete(userID);
    }
}