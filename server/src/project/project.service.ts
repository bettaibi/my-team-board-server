import { Injectable } from '@nestjs/common';
import { ProjectDto } from './project.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project, ProjectDocument } from 'src/models/project.model';
import { toJson } from 'src/helpers';

@Injectable()
export class ProjectService{

    constructor(
        @InjectModel(Project.name) private readonly ProjectModel: Model<ProjectDocument>
    ){};

    async all(): Promise<any>{
        try{
            const list = await this.ProjectModel.find();
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
}