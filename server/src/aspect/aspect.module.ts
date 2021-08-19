import { Module } from '@nestjs/common';
import { AspectController } from './aspect.controller';
import { AspectService } from './aspect.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Aspect, AspectSchema } from 'src/models/aspect.model';
import { Project, ProjectSchema } from 'src/models/project.model';
import { Sprint, SprintSchema } from 'src/models/sprint.model';
import { JwtGuardModule } from 'src/shared/jwtGuard.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: Project.name, schema: ProjectSchema},
            {name: Aspect.name, schema: AspectSchema},
            {name: Sprint.name, schema: SprintSchema}
        ]),
        JwtGuardModule
    ],
    providers: [AspectService],
    controllers: [AspectController]
})
export class AspectModule {};