import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Notification, NotificationDocument } from 'src/models/notification.model';
import { Model } from 'mongoose';
import { NotificaionDto } from './notification.dto';
import { toJson, toObjectID} from 'src/helpers';

@Injectable()
export class NotificationService {

    constructor(
        @InjectModel(Notification.name) private readonly NotificationModel: Model<NotificationDocument>
    ){}

    async all(workspaceId: string, userId: string): Promise<any>{
        try{

        }
        catch(err){
            throw err;
        }
    }

    async create(payload: NotificaionDto): Promise<any>{
        try{
            const saved = await this.NotificationModel.create(payload);
            if(!saved){
                return toJson(false, 'Failed to create');
            }
            return toJson(true, 'A new notification has been created');
        }
        catch(err){
            throw err;
        }
    }

    async delete(id: string): Promise<any>{
        try{
            const deleted = await this.NotificationModel.findByIdAndDelete({_id: toObjectID(id)});
            if(!deleted){
                return toJson(false, 'Failed to Delete');
            }
            return toJson(true, 'A Notification has been deleted');
        }
        catch(err){
            throw err;
        }
    }

    async seenBy(workspaceId: string, userId: string): Promise<any>{
        try{
         
        }
        catch(err){
            throw err;
        }
    }

}
