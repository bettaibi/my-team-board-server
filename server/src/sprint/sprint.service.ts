import { Injectable } from '@nestjs/common';
import { toJson, toObjectID } from 'src/helpers';
import { InjectModel } from '@nestjs/mongoose';
import { Sprint, SprintDocument } from 'src/models/sprint.model';
import { Model } from 'mongoose';
import { SprintDto } from './sprint.dto';
import { ChatGateway } from 'src/gateways/chat.gateway';

@Injectable()
export class SprintService {

    constructor(
        @InjectModel(Sprint.name) private readonly SprintModel: Model<SprintDocument>,
        private chatGateway: ChatGateway
    ){}

    async create(sprint: SprintDto, workspace: string, projectId: string, members: string[]): Promise<any> {
        try{
             const created = await this.SprintModel.create({...sprint});
             if(!created){
                 return toJson(false, 'Failed to create');
             }
             for(let memberId of members){
                if(this.chatGateway.registeredUser.hasOwnProperty(memberId)){
                    const socketId = this.chatGateway.registeredUser[memberId];
                    this.chatGateway.server.to(socketId).emit('sprint_change', {workspace, projectId});
                }
             }
             return toJson(true, 'A new Sprint has been created', created);
        }
        catch(err){
            throw err;
        }
     };
 
     async update(
         id: string,
         sprint: SprintDto, workspace: string, 
         projectId: string, members: string[]
     ): Promise<any> {
        try{
             const updated = await this.SprintModel.findByIdAndUpdate({_id: toObjectID(id)}, {$set:{
                 ...sprint
             }}, {new: true});
             if(!updated){
                 return toJson(false, 'Failed to update');
             }
             for(let memberId of members){
                if(this.chatGateway.registeredUser.hasOwnProperty(memberId)){
                    const socketId = this.chatGateway.registeredUser[memberId];
                    this.chatGateway.server.to(socketId).emit('sprint_change', {workspace, projectId});
                }
             }
             return toJson(true, 'A new Sprint has been updated');
        }
        catch(err){
            throw err;
        }
     };
 
     async delete(
        id: string, workspace: string, 
        projectId: string, members: string[]
    ): Promise<any> {
        try{
         const deleted = await this.SprintModel.deleteOne({_id: toObjectID(id)});
         if(!deleted){
             toJson(false, 'Failed to delete')
         }
         for(let memberId of members){
            if(this.chatGateway.registeredUser.hasOwnProperty(memberId)){
                const socketId = this.chatGateway.registeredUser[memberId];
                this.chatGateway.server.to(socketId).emit('sprint_change', {workspace, projectId});
            }
         }
         return toJson(true, 'Sprint has been Successfully deleted')
        }
        catch(err){
            throw err;
        }
     };

}