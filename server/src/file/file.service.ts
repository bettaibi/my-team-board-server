import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Member, MemberDocument } from 'src/models/member.model';
import { Message, MessageDocument } from 'src/models/message.model';
import { Model } from 'mongoose';
import { toJson, toObjectID } from 'src/helpers';
import * as fs from 'fs';
import { join } from 'path';

@Injectable()
export class FileService {

    constructor(
        @InjectModel(Member.name) private readonly MemberModel: Model<MemberDocument>,
        @InjectModel(Message.name) private readonly MessageModel: Model<MessageDocument>
    ){}

    async updateUserAvatar(id: string, filename: string): Promise<any> {
        try{
            const found = await this.MemberModel.findOne({_id: toObjectID(id)});
            if(!found){
                return toJson(false, 'User Not found');
            }
            if(found.avatar !== ''){
                const path = join(process.cwd(), 'upload');
                fs.unlinkSync(`${path}/${found.avatar}`);
            }

            const updated = await this.MemberModel.findByIdAndUpdate({_id: toObjectID(id)}, {$set: {
               avatar: filename
            }}, {new: true});

            if(!updated){
               return toJson(false, 'Something wrong, File does not uploaded');
            }
            return toJson(true, 'User Avatar has been successfully uploaded', {avatar: filename}); 
        }
        catch(err){
            throw err;
        }
    };

    async addNewMessageAttachment(filename: string, userId: string, receptorId: string, workspaceId: string): Promise<any> {
        try{    
            const newMassage = new this.MessageModel({file: filename, members: [userId, receptorId], workspace: workspaceId, sender: userId});
            const saved = await newMassage.save();
            if(!saved){
                toJson(false, 'Failed to save attachment');
            }
            return toJson(true, 'A new file has been sent', saved);
        }
        catch(err){
            throw err;
        }
    };

    async uploadPictures(files: Array<Express.Multer.File>, userId: string, receptorId: string, workspaceId: string): Promise<any>{
        try{
            const pictures = files.map((file: Express.Multer.File) => file.filename);
            const newMassage = new this.MessageModel({pictures, members: [userId, receptorId], workspace: workspaceId, sender: userId});
            const saved = await newMassage.save();
            if(!saved){
                toJson(false, 'Failed to save pictues');
            }
            return toJson(true, `${pictures.length} pictures has been sent`, saved);
        }
        catch(err){
            throw err;
        }
    };

}
