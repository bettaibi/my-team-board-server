import { Module } from '@nestjs/common';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Member, MemberSchema } from 'src/models/member.model';
import { AuthGuardModule } from 'src/guards/auth.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: Member.name, schema: MemberSchema}
        ]),
        AuthGuardModule
    ],
    providers: [MemberService],
    controllers: [MemberController]
})
export class MemberModule {};