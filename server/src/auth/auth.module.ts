import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Member, MemberSchema } from 'src/models/member.model';
import { Workspace, WorkspaceSchema } from 'src/models/workspace.model';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';

Module({
    imports: [
        MongooseModule.forFeature([
            {name: Workspace.name, schema: WorkspaceSchema},
            {name: Member.name, schema: MemberSchema}
        ]),
        JwtModule.register({
            secret: process.env.JWTSECRET,
            signOptions: {expiresIn: "7d"}
        })
    ],
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule {};