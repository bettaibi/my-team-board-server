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

    async all(workspaceID: string, userID: string): Promise<any>{
        try{
            const list = await this.ProjectModel.find({workspace: toObjectID(workspaceID), members: {$in: [userID]}})
            .populate({
                path: 'members',
                model: 'Member',
                select: 'avatar name'
            });
            if(!list){
                return toJson(false, 'Failed to get projects list');
            }
            return toJson(true, 'my projects', list);
        }
        catch(err){
            throw err;
        }
    }

    async create(payload: ProjectDto, userID: string): Promise<any>{
        try{
            const saved = await this.ProjectModel.create({...payload, members: [...payload.members, userID]});
            if(!saved){
                return toJson(false, 'Failed to create workspace');
            }
            const populated = await this.ProjectModel.populate(saved, {
                path: 'members',
                model: 'Member',
                select: 'name avatar'
            });
            return toJson(true, 'A new Workspace has been created', populated);
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