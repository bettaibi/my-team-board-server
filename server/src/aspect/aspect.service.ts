import { Injectable } from '@nestjs/common';
import { toJson, toObjectID } from 'src/helpers';
import { InjectModel } from '@nestjs/mongoose';
import { Aspect, AspectDocument } from 'src/models/aspect.model';
import { Project, ProjectDocument } from 'src/models/project.model';
import { Sprint, SprintDocument } from 'src/models/sprint.model';
import { Model } from 'mongoose';
import { AspectDto } from './aspect.dto';

@Injectable()
export class AspectService {

    constructor(
        @InjectModel(Aspect.name) private readonly AspectModel: Model<AspectDocument>,
        @InjectModel(Project.name) private readonly ProjectModel: Model<ProjectDocument>,
        @InjectModel(Sprint.name) private readonly SprintModel: Model<SprintDocument>
    ){}

    async all(id: string): Promise<any> {
       try{
         const project = await this.ProjectModel.findOne({_id: toObjectID(id)}, {
            createdAt: 0, 
            workspace: 0, 
            __v: 0
         }).populate({
             path: 'members',
             model: 'Member',
             select: 'name avatar'
         });

         const aspects = await this. AspectModel.aggregate([
            {
                $match: {
                    project: toObjectID(id)
                }
            },
            {
                $lookup: {
                  from: 'sprints',
                  localField: '_id',
                  foreignField: 'aspect',
                  as: 'cards'
                }
            },
            {
                $project: {
                    "__v": 0,
                    "cards.__v": 0
                }
            }
         ]);

         if (!aspects){
            return toJson(false, 'Failed to get aggregate aspects')
         }
         return toJson(true, 'Aggregated Aspects', {[project._id]: {project, aspects}});
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
            toJson(false, 'Failed to delete');
        }

        const sprints = await this.SprintModel.deleteMany({aspect: toObjectID(id)});
        if(!sprints){
            toJson(false, 'Failed to delete related aspects');
        }
        return toJson(true, 'Aspect has been Successfully deleted');
       }
       catch(err){
           throw err;
       }
    };
    
}