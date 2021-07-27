import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { Member, MemberSchema } from 'src/models/member.model';
import { JwtGuardModule } from 'src/shared/jwtGuard.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: Member.name, schema: MemberSchema}
        ]),
        JwtGuardModule
    ],
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule {};