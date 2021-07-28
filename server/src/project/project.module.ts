import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Project, ProjectSchema } from 'src/models/project.model';
import { JwtGuardModule } from 'src/shared/jwtGuard.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: Project.name, schema: ProjectSchema}
        ]),
        JwtGuardModule
    ],
    providers: [ProjectService],
    controllers: [ProjectController]
})
export class ProjectModule {};