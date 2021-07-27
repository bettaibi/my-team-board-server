import { Module } from '@nestjs/common';
import { WorkspaceController } from './workspace.controller';
import { WorkspaceService } from './workspace.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Workspace, WorkspaceSchema } from 'src/models/workspace.model';
import { Member, MemberSchema } from 'src/models/member.model';

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: Member.name, schema: MemberSchema},
            {name: Workspace.name, schema: WorkspaceSchema}
        ])
    ],
    providers: [WorkspaceService],
    controllers: [WorkspaceController]
})
export class WorkspaceModule {};