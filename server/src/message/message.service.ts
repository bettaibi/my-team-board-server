import { Injectable } from '@nestjs/common';
import { MessageDto } from './message.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message, MessageDocument } from 'src/models/message.model';
import { toJson, toObjectID } from 'src/helpers';

@Injectable()
export class MessageService{

    constructor(
        @InjectModel(Message.name) private readonly MessageModel: Model<MessageDocument>
    ){};

    async all(workspaceId: string, receptorId: string, userId: string): Promise<any>{
        try{
            const list = await this.MessageModel
            .find({workspaceId: toObjectID(workspaceId), members: {$in: [userId, receptorId]}}, {
                members: 0,
                workspace: 0
            });

            if(!list){
                return toJson(false, 'Failed to get list of messages');
            }
            return toJson(true, 'List of messages', list);
        }
        catch(err){
            throw err;
        }
    }
    
    async create(payload: MessageDto): Promise<any>{
        try{
            const saved = await this.MessageModel.create({...payload});

            if(!saved){
                return toJson(false, 'Failed to create a new messages');
            }
            return toJson(true, 'A new Message has been created', saved);
        }
        catch(err){
            throw err;
        }
    }

}