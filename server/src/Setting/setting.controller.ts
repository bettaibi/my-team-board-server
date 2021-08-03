import { Controller, Get, Post, Body, Put, Delete, UseGuards, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/decorators/user.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { MemberEmailDto } from './setting.dto';
import { SettingService } from './setting.service';

@UseGuards(AuthGuard)
@ApiTags('Setting')
@Controller('/settings')
export class SettingController {

    constructor(
        private settingService: SettingService,
    ){}


    @Put()
    async update(@User() userID: string, @Body() payload: MemberEmailDto): Promise<any>{
        // return await this.memberService.update(userID, payload);
    }

}