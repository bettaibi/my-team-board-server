import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { JwtGuardModule } from 'src/shared/jwtGuard.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Notification, NotificationSchema } from 'src/models/notification.model';

@Module({
  imports: [
      MongooseModule.forFeature([
        {name: Notification.name, schema: NotificationSchema}
     ]),
     JwtGuardModule
  ],
  controllers: [NotificationController],
  providers: [NotificationService]
})
export class NotificationModule {}
