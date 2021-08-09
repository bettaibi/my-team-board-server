import { Module } from '@nestjs/common';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from 'src/models/message.model';
import { JwtGuardModule } from 'src/shared/jwtGuard.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: Message.name, schema: MessageSchema}
        ]),
        JwtGuardModule
    ],
    providers: [MessageService],
    controllers: [MessageController]
})
export class MessageModule {};