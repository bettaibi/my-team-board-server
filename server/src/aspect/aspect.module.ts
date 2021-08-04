import { Module } from '@nestjs/common';
import { AspectController } from './aspect.controller';
import { AspectService } from './aspect.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Aspect, AspectSchema } from 'src/models/aspect.model';
import { JwtGuardModule } from 'src/shared/jwtGuard.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: Aspect.name, schema: AspectSchema}
        ]),
        JwtGuardModule
    ],
    providers: [AspectService],
    controllers: [AspectController]
})
export class AspectModule {};