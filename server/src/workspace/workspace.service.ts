import { Injectable } from '@nestjs/common';
import { WorkspaceDto } from './workspace.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Workspace, WorkspaceDocument } from 'src/models/workspace.model';
import { toJson } from 'src/helpers';

@Injectable()
export class WorkspaceService{

    constructor(
        @InjectModel(Workspace.name) private readonly WorkspaceModel: Model<WorkspaceDocument>
    ){};

    async all(): Promise<any>{
        try{
            const list = await this.WorkspaceModel.find();
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
            const saved = await this.WorkspaceModel.create(payload);
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