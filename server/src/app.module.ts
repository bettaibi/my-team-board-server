import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { MemberModule } from './member/member.module';
import { WorkspaceModule } from './workspace/workspace.module';

@Module({
  imports: [
    DatabaseModule,
    MemberModule,
    WorkspaceModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
