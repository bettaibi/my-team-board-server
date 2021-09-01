import { Injectable } from '@nestjs/common';
import { toJson, toObjectID } from 'src/helpers';
import { InjectModel } from '@nestjs/mongoose';
import { Aspect, AspectDocument } from 'src/models/aspect.model';
import { Project, ProjectDocument } from 'src/models/project.model';
import { Sprint, SprintDocument } from 'src/models/sprint.model';
import { Model } from 'mongoose';
import { AspectDto } from './aspect.dto';
import { ChatGateway } from 'src/gateways/chat.gateway';

@Injectable()
export class AspectService {

    constructor(
        @InjectModel(Aspect.name) private readonly AspectModel: Model<AspectDocument>,
        @InjectModel(Project.name) private readonly ProjectModel: Model<ProjectDocument>,
        @InjectModel(Sprint.name) private readonly SprintModel: Model<SprintDocument>,
        private chatGateway: ChatGateway
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

    async create(payload: AspectDto, members: string[], workspace: string): Promise<any> {
       try{
            const created = await this.AspectModel.create({...payload});
            if(!created){
                return toJson(false, 'Failed to create');
            }
            for(let memberId of members){
                if(this.chatGateway.registeredUser.hasOwnProperty(memberId)){
                    const socketId = this.chatGateway.registeredUser[memberId];
                    this.chatGateway.server.to(socketId).emit('new_aspect', {workspace, aspect: created});
                }
            }
            return toJson(true, 'A new Aspect has been created', created);
       }
       catch(err){
           throw err;
       }
    };

    async update(id: string, aspect: AspectDto, workspace: string, members: string[]): Promise<any> {
       try{
            const updated = await this.AspectModel.findByIdAndUpdate({_id: toObjectID(id)}, {$set:{
                title : aspect.title,
            }}, {new: true});

            if(!updated){
                return toJson(false, 'Failed to update');
            }
            for(let memberId of members){
                if(this.chatGateway.registeredUser.hasOwnProperty(memberId)){
                    const socketId = this.chatGateway.registeredUser[memberId];
                    this.chatGateway.server.to(socketId).emit('edit_aspect', {workspace, aspect});
                }
            }
            return toJson(true, 'A new Aspect has been updated');
       }
       catch(err){
           throw err;
       }
    };

    async delete(id: string, members: string[], workspace: string, projectId: string): Promise<any> {
       try{
        const deleted = await this.AspectModel.deleteOne({_id: toObjectID(id)});
        if(!deleted){
            toJson(false, 'Failed to delete');
        }

        const sprints = await this.SprintModel.deleteMany({aspect: toObjectID(id)});
        if(!sprints){
            toJson(false, 'Failed to delete related aspects');
        }
        for(let memberId of members){
            if(this.chatGateway.registeredUser.hasOwnProperty(memberId)){
                const socketId = this.chatGateway.registeredUser[memberId];
                this.chatGateway.server.to(socketId).emit('delete_aspect', {workspace, aspectId: id, projectId});
            }
        }
        return toJson(true, 'Aspect has been Successfully deleted');
       }
       catch(err){
           throw err;
       }
    };
    
}