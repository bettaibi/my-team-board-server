import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { MulterModule } from '@nestjs/platform-express';
import { MongooseModule } from '@nestjs/mongoose';
import { Member, MemberSchema } from 'src/models/member.model';
import { Message, MessageSchema } from 'src/models/message.model';
import { diskStorage } from 'multer';
import { CustomFile } from 'src/shared/customFile';
import { JwtGuardModule } from 'src/shared/jwtGuard.module';

@Module({
  imports: [
    MulterModule.register({
       storage: diskStorage({
        destination: CustomFile.destinationPath,
        filename: CustomFile.customFileName,
      }),
    }),
    MongooseModule.forFeature([
      {name: Member.name, schema: MemberSchema},
      {name: Message.name, schema: MessageSchema}
    ]),
    JwtGuardModule
  ],
  controllers: [FileController],
  providers: [FileService]
})
export class FileModule {}
