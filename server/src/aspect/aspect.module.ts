import { Module } from '@nestjs/common';
import { AspectController } from './aspect.controller';
import { AspectService } from './aspect.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Aspect, AspectSchema } from 'src/models/aspect.model';
import { Project, ProjectSchema } from 'src/models/project.model';
import { JwtGuardModule } from 'src/shared/jwtGuard.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: Project.name, schema: ProjectSchema},
            {name: Aspect.name, schema: AspectSchema}
        ]),
        JwtGuardModule
    ],
    providers: [AspectService],
    controllers: [AspectController]
})
export class AspectModule {};