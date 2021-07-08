import { Injectable } from '@nestjs/common';
import { WorkspaceDto } from './workspace.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Workspace, WorkspaceDocument } from 'src/models/workspace.model';
import { toJson, toObjectID } from 'src/helpers';

@Injectable()
export class WorkspaceService{

    constructor(
        @InjectModel(Workspace.name) private readonly workspaceModel: Model<WorkspaceDocument>
    ){};

    async myWorkspaces(userID: string): Promise<any>{
        try{
            const list = await this.workspaceModel.find({
                members: {$in: [userID]}
            }).populate({
                path: 'members',
                model: 'Member',
                select: 'name email title avatar'
            });

            if(!list){
                return toJson(false, 'Failed to get workspace list');
            }
            return toJson(true, 'workspace list', list);
        }
        catch(err){
            throw err;
        }
    }

    async create(payload: WorkspaceDto): Promise<any>{
        try{
            const saved = await this.workspaceModel.create(payload);
            if(!saved){
                return toJson(false, 'Failed to create workspace');
            }
            return toJson(true, 'A new Workspace has been created', saved);
        }
        catch(err){
            throw err;
        }
    }

    async update(id: string, payload: WorkspaceDto): Promise<any>{
        try{
            const updated = await this.workspaceModel.findByIdAndUpdate({_id: toObjectID(id)}, {$set: {
                name: payload.name,
                owner: payload.owner,
                members: payload.members
            }}, {new: true});

            if(!updated){
                return toJson(false, 'Failed to update');
            }
            return toJson(true, 'Workspace has been updated successfully');
        }
        catch(err){
            throw err;
        }
    }
    
    async delete(id: string): Promise<any>{
        try{
            const removed = await this.workspaceModel.findByIdAndDelete({_id: toObjectID(id)});

            if(!removed){
                return toJson(false, 'Failed to remove');
            }
            return toJson(true, 'Workspace has been deleted successfully');
        }
        catch(err){
            throw err;
        }
    }
}