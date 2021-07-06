import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MemberDto } from './member.dto';
import { MemberService } from './member.service';

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
}