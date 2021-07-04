import { Module } from '@nestjs/common';
import { WorkspaceController } from './workspace.controller';
import { WorkspaceService } from './workspace.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Workspace, WorkspaceSchema } from 'src/models/workspace.model';

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: Workspace.name, schema: WorkspaceSchema}
        ])
    ],
    providers: [WorkspaceService],
    controllers: [WorkspaceController]
})
export class WorkspaceModule {};