import { Injectable } from '@nestjs/common';
import { toJson, toObjectID } from 'src/helpers';
import { InjectModel } from '@nestjs/mongoose';
import { Member, MemberDocument } from 'src/models/member.model';
import { Model } from 'mongoose';
import { MemberEmailDto, MemberPasswordDto } from './setting.dto';
import { onCompare, onCrypt } from 'src/auth/util';

@Injectable()
export class SettingService {

    constructor(
        @InjectModel(Member.name) private readonly MemberModel: Model<MemberDocument>
    ){}

    async changeEmail(id: string, payload: MemberEmailDto): Promise<any> {
       try{
        const found = await this.MemberModel.findOne({email: payload.email});

        if(!found){
            return toJson(false, 'No such Account');
        }
        const isMatch = await onCompare(payload.password, found.password);
        if(!isMatch){
            return toJson(false, 'Password mismatch');
        }
        const updated = await this.MemberModel.findByIdAndUpdate({_id: toObjectID(id)}, {$set: {
            email: payload.newEmail
        }}, {new: true});

        if(!updated) {
            return toJson(false, 'Failed to updated');
        }
        return toJson(true, 'Email has been successfully updated');
       }
       catch(err){
           throw err;
       }
    };

    async changePassword(id: string, payload: MemberPasswordDto): Promise<any> {
        try{
            const found = await this.MemberModel.findOne({_id: toObjectID(id)});
            if(!found){
                return toJson(false, 'No such Account');
            }

            const isMatch = await onCompare(payload.currentPassword, found.password);
            if(!isMatch){
                return toJson(false, 'Password mismatch');
            }
            const hash = await onCrypt(payload.newPassword);
            const updated = await this.MemberModel.findByIdAndUpdate({_id: toObjectID(id)}, {$set: {
                password: hash
            }}, {new: true});

            if(!updated) {
                return toJson(false, 'Failed to updated')
            }
            return toJson(true, 'Password has been successfully updated');
        }
        catch(err){
            throw err;
        }
    };

}