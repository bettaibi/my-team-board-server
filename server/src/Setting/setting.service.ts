import { Injectable } from '@nestjs/common';
import { toJson, toObjectID } from 'src/helpers';
import { InjectModel } from '@nestjs/mongoose';
import { Member, MemberDocument } from 'src/models/member.model';
import { Model } from 'mongoose';
import { MemberEmailDto } from './setting.dto';

@Injectable()
export class SettingService {

    constructor(
        @InjectModel(Member.name) private readonly MemberModel: Model<MemberDocument>
    ){}

    async all(): Promise<any> {
       try{

       }
       catch(err){
           throw err;
       }
    };

}