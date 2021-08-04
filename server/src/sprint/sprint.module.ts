import { Module } from '@nestjs/common';
import { SprintController } from './sprint.controller';
import { SprintService } from './sprint.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Sprint, SprintSchema } from 'src/models/sprint.model';
import { JwtGuardModule } from 'src/shared/jwtGuard.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: Sprint.name, schema: SprintSchema}
        ]),
        JwtGuardModule
    ],
    providers: [SprintService],
    controllers: [SprintController]
})
export class SprintModule {};