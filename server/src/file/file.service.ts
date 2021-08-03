import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Member, MemberDocument } from 'src/models/member.model';
import { Model } from 'mongoose';
import { toJson, toObjectID } from 'src/helpers';
import * as fs from 'fs';

@Injectable()
export class FileService {

    constructor(
        @InjectModel(Member.name) private readonly MemberModel: Model<MemberDocument>
    ){}

    async updateUserAvatar(id: string, filename: string): Promise<any> {
        try{
            const found = await this.MemberModel.findOne({_id: toObjectID(id)});
            if(!found){
                return toJson(false, 'User Not found');
            }
            if(found.avatar !== ''){
                fs.unlinkSync(`./upload/${found.avatar}`);
            }

            const updated = await this.MemberModel.findByIdAndUpdate({_id: toObjectID(id)}, {$set: {
               avatar: filename
            }}, {new: true})

            if(!updated){
               return toJson(false, 'Something wrong, File does not uploaded');
            }
            return toJson(true, 'User Avatar has been successfully uploaded', {avatar: filename}); 
        }
        catch(err){
            throw err;
        }
    }

    async uploadFiles(): Promise<any>{
        try{
            return;
        }
        catch(err){
            throw err;
        }
    }
}
