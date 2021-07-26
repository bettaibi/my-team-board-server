import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthGuardModule } from 'src/guards/auth.module';
import { Member, MemberSchema } from 'src/models/member.model';
import { Workspace, WorkspaceSchema } from 'src/models/workspace.model';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: Workspace.name, schema: WorkspaceSchema},
            {name: Member.name, schema: MemberSchema}
        ]),
        AuthGuardModule
    ],
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule {};