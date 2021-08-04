import { Injectable } from '@nestjs/common';
import { toJson, toObjectID } from 'src/helpers';
import { InjectModel } from '@nestjs/mongoose';
import { Sprint, SprintDocument } from 'src/models/sprint.model';
import { Model } from 'mongoose';
import { SprintDto } from './sprint.dto';

@Injectable()
export class SprintService {

    constructor(
        @InjectModel(Sprint.name) private readonly SprintModel: Model<SprintDocument>
    ){}

    async create(payload: SprintDto): Promise<any> {
        try{
             const created = await this.SprintModel.create({...payload});
             if(!created){
                 return toJson(false, 'Failed to create');
             }
             return toJson(true, 'A new Sprint has been created', created);
        }
        catch(err){
            throw err;
        }
     };
 
     async update(id: string, payload: SprintDto): Promise<any> {
        try{
             const updated = await this.SprintModel.findByIdAndUpdate({_id: toObjectID(id)}, {$set:{
                 ...payload
             }}, {new: true});
             if(!updated){
                 return toJson(false, 'Failed to update');
             }
             return toJson(true, 'A new Sprint has been updated');
        }
        catch(err){
            throw err;
        }
     };
 
     async delete(id: string): Promise<any> {
        try{
         const deleted = await this.SprintModel.deleteOne({_id: toObjectID(id)});
         if(!deleted){
             toJson(false, 'Failed to delete')
         }
         return toJson(true, 'Sprint has been Successfully deleted')
        }
        catch(err){
            throw err;
        }
     };

}