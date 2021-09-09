import { Controller, UseGuards, Get, Patch, UploadedFile, UploadedFiles, UseInterceptors, Param, Res, Post } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { toJson } from 'src/helpers';
import { FileService } from './file.service';
import { Response } from 'express';
import { AuthGuard } from 'src/guards/auth.guard';
import { User } from 'src/decorators/user.decorator';
import { join } from 'path';

@UseGuards(AuthGuard)
@ApiTags('File upload')
@Controller('files')
export class FileController {

    constructor(
        private fileService: FileService
    ){}
    
    @Post('avatar')
    @UseInterceptors(FileInterceptor('picture'))
    async updateUserAvatar(@UploadedFile() file: Express.Multer.File, @User() userID: string) : Promise<any>{
        try{
            if(file){
                 return await this.fileService.updateUserAvatar(userID, file.filename);
            }
            else{
                return toJson(false, 'Failed to upload');
            }
        }
        catch(err){
            throw err;
        }
    }

    @Patch('attachment/:workspaceId/:receptorId')
    @UseInterceptors(FileInterceptor('file'))
    async addNewMessageAttachment(
        @UploadedFile() file: Express.Multer.File,
        @Param('workspaceId') workspaceId: string, 
        @Param('receptorId') receptorId: string ,
        @User() userID: string) : Promise<any>{
        try{
            if(file){
                 return await this.fileService.addNewMessageAttachment(file.filename, userID, receptorId, workspaceId);
            }
            else{
                return toJson(false, 'Failed to upload');
            }
        }
        catch(err){
            throw err;
        }
    }

    @Patch('pictures/:workspaceId/:receptorId')
    @UseInterceptors(FilesInterceptor('pictures'))
    async uploadFiles(
        @UploadedFiles() files: Array<Express.Multer.File>,
        @Param('workspaceId') workspaceId: string, 
        @Param('receptorId') receptorId: string , 
        @User() userID: string
    ): Promise<any>{
        try{
            return await this.fileService.uploadPictures(files, userID, receptorId, workspaceId);
        }
        catch(err){
            throw err;
        }
    }

    @Get(':filename')
    getFile(@Param('filename') filename: string, @Res() res: Response) {
        try{
            return res.sendFile(filename, { root: join(process.cwd(), 'upload') });
        }
        catch(err){
            throw err;
        }
    }
    
}
