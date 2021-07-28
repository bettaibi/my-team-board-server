import { Module } from '@nestjs/common';
import { WorkspaceController } from './workspace.controller';
import { WorkspaceService } from './workspace.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Workspace, WorkspaceSchema } from 'src/models/workspace.model';
import { Member, MemberSchema } from 'src/models/member.model';
import { Project, ProjectSchema } from 'src/models/project.model';
import { JwtGuardModule } from 'src/shared/jwtGuard.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: Member.name, schema: MemberSchema},
            {name: Workspace.name, schema: WorkspaceSchema},
            {name: Project.name, schema: ProjectSchema}
        ]),
        JwtGuardModule
    ],
    providers: [WorkspaceService],
    controllers: [WorkspaceController]
})
export class WorkspaceModule {};