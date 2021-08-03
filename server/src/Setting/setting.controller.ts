import { Controller, Body, Put, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/decorators/user.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { MemberEmailDto, MemberPasswordDto } from './setting.dto';
import { SettingService } from './setting.service';

@UseGuards(AuthGuard)
@ApiTags('Setting')
@Controller('/settings')
export class SettingController {

    constructor(
        private settingService: SettingService,
    ){}


    @Put('/email')
    async changeEmail(@User() userID: string, @Body() payload: MemberEmailDto): Promise<any>{
        return await this.settingService.changeEmail(userID, payload);
    }

    @Put('/password')
    async changePassword(@User() userID: string, @Body() payload: MemberPasswordDto): Promise<any>{
        return await this.settingService.changePassword(userID, payload);
    }

}