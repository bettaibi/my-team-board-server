import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Member, MemberDocument } from 'src/models/member.model';
import { Model } from 'mongoose';
import { toJson, toObjectID } from 'src/helpers';


@Injectable()
export class FileService {

    constructor(
        @InjectModel(Member.name) private readonly MemberModel: Model<MemberDocument>
    ){}

    async updateUserAvatar(id: string, filename: string): Promise<any> {
        try{
            const updated = this.MemberModel.findByIdAndUpdate({_id: toObjectID(id)}, {$set: {
                avatar: filename
            }}, {new: true});

            if(!updated){
               return toJson(false, 'Spmething wrong, File does not uploaded');
            }
            return toJson(true, 'avatar updated', {avatar: filename}); 
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
