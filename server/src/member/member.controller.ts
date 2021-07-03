import { Controller, Get, Post, Body } from '@nestjs/common';
import { MemberDto } from './member.dto';
import { MemberService } from './member.service';

@Controller('/members')
export class MemberController {

    constructor(
        private memberService: MemberService,
    ){}

    @Get()
    async getMembers(): Promise<any>{
        try{
            return await this.memberService.all();
        }
        catch(err){
            throw err;
        }
    }

    @Post()
    async create(@Body() payload: MemberDto): Promise<any>{
        try{
            return await this.memberService.create(payload);
        }
        catch(err){
            throw err;
        }
    }
}