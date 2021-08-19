import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Project, ProjectSchema } from 'src/models/project.model';
import { Aspect, AspectSchema } from 'src/models/aspect.model';
import { JwtGuardModule } from 'src/shared/jwtGuard.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: Project.name, schema: ProjectSchema},
            {name: Aspect.name, schema: AspectSchema}
        ]),
        JwtGuardModule
    ],
    providers: [ProjectService],
    controllers: [ProjectController]
})
export class ProjectModule {};