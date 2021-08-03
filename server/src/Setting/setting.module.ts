import { Module } from '@nestjs/common';
import { SettingController } from './setting.controller';
import { SettingService } from './setting.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Member, MemberSchema } from 'src/models/member.model';
import { JwtGuardModule } from 'src/shared/jwtGuard.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: Member.name, schema: MemberSchema}
        ]),
        JwtGuardModule
    ],
    providers: [SettingService],
    controllers: [SettingController]
})
export class SettingModule {};