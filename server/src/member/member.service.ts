import { Injectable } from '@nestjs/common';
import { toJson } from 'src/helpers';
import { InjectModel } from '@nestjs/mongoose';
import { Member, MemberDocument } from 'src/models/member.model';
import { Model } from 'mongoose';
import { MemberDto } from './member.dto';

@Injectable()
export class MemberService {

    constructor(
        @InjectModel(Member.name) private readonly MemberModel: Model<MemberDocument>
    ){}

    async all(): Promise<any> {
       try{
        const list = await this.MemberModel.find();
        if(!list){
            return toJson(false, 'Something Wrong');
        }
        return toJson(true, 'members list', list);
       }
       catch(err){
           throw err;
       }
    };

    async create(memberDto: MemberDto): Promise<any>{
        try{
            const saved = await this.MemberModel.create(memberDto);
            if(!saved){
                return toJson(false, 'Failed to save'); 
            }
            return toJson(true, 'A new member has been created', saved);
        }
        catch(err){
            throw err;
        }
    };

}