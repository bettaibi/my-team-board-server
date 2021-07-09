import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { MulterModule } from '@nestjs/platform-express';
import { MongooseModule } from '@nestjs/mongoose';
import { Member, MemberSchema } from 'src/models/member.model';

@Module({
  imports: [
    MulterModule.register({
        dest: './upload'
    }),
    MongooseModule.forFeature([
      {name: Member.name, schema: MemberSchema}
    ])
  ],
  controllers: [FileController],
  providers: [FileService]
})
export class FileModule {}
