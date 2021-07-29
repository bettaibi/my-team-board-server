import { Injectable } from '@nestjs/common';
import { toJson, toObjectID } from 'src/helpers';
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

    async getmemberByKeyword(keyword: string, userID: string): Promise<any> {
        try{
            const list = await this.MemberModel.find({email: new RegExp(`^${keyword}`), _id: {$ne: userID}},
            {
                email: 1,
                title: 1,
                name: 1
            });
            if(!list){
                return toJson(false, 'Member not found', []);
            }
            return toJson(true, 'matched members', list)
        }
        catch(err){
            throw err;
        }
    }

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

    async update(id: string, payload: MemberDto): Promise<any>{
        try{
            const updated = await this.MemberModel.findByIdAndUpdate({_id: toObjectID(id)}, {$set: {
                ...payload
            }}, {new: true});

            if(!updated){
                return toJson(false, 'Failed to update');
            }
            return toJson(true, 'Member has been updated successfully');
        }
        catch(err){
            throw err;
        }
    }
    
    async delete(id: string): Promise<any>{
        try{
            const removed = await this.MemberModel.findByIdAndDelete({_id: toObjectID(id)});

            if(!removed){
                return toJson(false, 'Failed to delete');
            }
            return toJson(true, 'Member has been deleted successfully');
        }
        catch(err){
            throw err;
        }
    }

}