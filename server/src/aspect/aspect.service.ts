import { Injectable } from '@nestjs/common';
import { toJson, toObjectID } from 'src/helpers';
import { InjectModel } from '@nestjs/mongoose';
import { Aspect, AspectDocument } from 'src/models/aspect.model';
import { Model } from 'mongoose';
import { AspectDto } from './aspect.dto';

@Injectable()
export class AspectService {

    constructor(
        @InjectModel(Aspect.name) private readonly AspectModel: Model<AspectDocument>
    ){}

    async all(): Promise<any> {
       try{

       }
       catch(err){
           throw err;
       }
    };

    async create(payload: AspectDto): Promise<any> {
       try{
            const created = await this.AspectModel.create({...payload});
            if(!created){
                return toJson(false, 'Failed to create');
            }
            return toJson(true, 'A new Aspect has been created', created);
       }
       catch(err){
           throw err;
       }
    };

    async update(id: string, payload: AspectDto): Promise<any> {
       try{
            const updated = await this.AspectModel.findByIdAndUpdate({_id: toObjectID(id)}, {$set:{
                title : payload.title,
            }}, {new: true});
            if(!updated){
                return toJson(false, 'Failed to update');
            }
            return toJson(true, 'A new Aspect has been updated');
       }
       catch(err){
           throw err;
       }
    };

    async delete(id: string): Promise<any> {
       try{
        const deleted = await this.AspectModel.deleteOne({_id: toObjectID(id)});
        if(!deleted){
            toJson(false, 'Failed to delete')
        }
        return toJson(true, 'Aspect has been Successfully deleted')
       }
       catch(err){
           throw err;
       }
    };
    
}