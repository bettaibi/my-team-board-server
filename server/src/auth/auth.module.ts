import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Member, MemberSchema } from 'src/models/member.model';
import { Workspace, WorkspaceSchema } from 'src/models/workspace.model';

Module({
    imports: [
        MongooseModule.forFeature([
            {name: Workspace.name, schema: WorkspaceSchema},
            {name: Member.name, schema: MemberSchema}
        ])
    ]
})
export class AuthModule {};