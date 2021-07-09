import { Controller, Get, Patch, UploadedFile, UseInterceptors, Param, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { createReadStream } from 'fs';
import { join } from 'path';
import { ApiTags } from '@nestjs/swagger';
import { toJson } from 'src/helpers';
import { FileService } from './file.service';
import { Response } from 'express';

@ApiTags('File upload')
@Controller('files')
export class FileController {

    constructor(
        private fileService: FileService
    ){}
    
    @Patch('avatar/:id')
    @UseInterceptors(FileInterceptor('file'))
    async updateUserAvatar(@UploadedFile() file: Express.Multer.File, @Param('id') id: string) : Promise<any>{
        try{
            if(file){
                 return await this.fileService.updateUserAvatar(id, file.filename);
            }
            else{
                return toJson(false, 'Failed to upload');
            }
        }
        catch(err){
            throw err;
        }
    }

    @Get(':filename')
    getFile(@Param('filename') filename: string, @Res() res: Response) {
        try{
            const file = createReadStream(join(process.cwd(), `upload/${filename}`));
            if(file){
                file.pipe(res);
            }
        }
        catch(err){
            throw err;
        }
    }
    
}
