import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { MemberModule } from './member/member.module';
import { ProjectModule } from './project/project.module';
import { WorkspaceModule } from './workspace/workspace.module';
import { FileModule } from './file/file.module';
import { SettingModule } from './Setting/setting.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    DatabaseModule,
    AuthModule,
    MemberModule,
    WorkspaceModule,
    ProjectModule,
    SettingModule,
    FileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
