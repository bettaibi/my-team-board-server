import { Controller, Get } from '@nestjs/common';
import { MemberService } from './member.service';

@Controller('/members')
export class MemberController {

    constructor(
        private memberService: MemberService,
    ){}

    @Get()
    async getMembers(): Promise<any>{
        try{
            return await this.memberService.list();
        }
        catch(err){
            throw err;
        }
    }
}