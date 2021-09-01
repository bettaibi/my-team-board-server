import { Module } from '@nestjs/common';
import { SprintController } from './sprint.controller';
import { SprintService } from './sprint.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Sprint, SprintSchema } from 'src/models/sprint.model';
import { JwtGuardModule } from 'src/shared/jwtGuard.module';
import { ChatModule } from 'src/gateways/chat.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: Sprint.name, schema: SprintSchema}
        ]),
        JwtGuardModule,
        ChatModule
    ],
    providers: [SprintService],
    controllers: [SprintController]
})
export class SprintModule {};