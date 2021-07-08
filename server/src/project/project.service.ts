import { Injectable } from '@nestjs/common';
import { ProjectDto } from './project.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project, ProjectDocument } from 'src/models/project.model';
import { toJson, toObjectID } from 'src/helpers';

@Injectable()
export class ProjectService{

    constructor(
        @InjectModel(Project.name) private readonly ProjectModel: Model<ProjectDocument>
    ){};

    async all(workspaceID: string): Promise<any>{
        try{
            const list = await this.ProjectModel.find({workspace: toObjectID(workspaceID)});
            if(!list){
                return toJson(false, 'Failed to get workspace list');
            }
            return toJson(true, 'workspace list', list);
        }
        catch(err){
            throw err;
        }
    }

    async create(payload: ProjectDto): Promise<any>{
        try{
            const saved = await this.ProjectModel.create(payload);
            if(!saved){
                return toJson(false, 'Failed to create workspace');
            }
            return toJson(true, 'A new Workspace has been created', saved);
        }
        catch(err){
            throw err;
        }
    }

    async update(id: string, payload: ProjectDto): Promise<any>{
        try{
            const updated = await this.ProjectModel.findByIdAndUpdate({_id: toObjectID(id)}, {$set: {
                ...payload
            }}, {new: true});

            if(!updated){
                return toJson(false, 'Failed to update');
            }
            return toJson(true, 'Project has been updated successfully');
        }
        catch(err){
            throw err;
        }
    }
    
    async delete(id: string): Promise<any>{
        try{
            const removed = await this.ProjectModel.findByIdAndDelete({_id: toObjectID(id)});

            if(!removed){
                return toJson(false, 'Failed to delete');
            }
            return toJson(true, 'Project has been deleted successfully');
        }
        catch(err){
            throw err;
        }
    }
}