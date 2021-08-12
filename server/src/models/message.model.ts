import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema, Types } from "mongoose";

export interface IMessage{
    text?: string;
    sentAt: Date;
    pictures?: string[];
    file?: string;
    sender?: string;
    workspace?: string;
    members?: string[];
}

export type MessageDocument = Document & Message;

@Schema()
export class Message {
    @Prop()
    text?: string;

    @Prop({default: new Date()})
    sentAt: Date;

    @Prop()
    pictures?: string[];

    @Prop()
    file?: string;

    @Prop({required: true})
    sender: string;

    @Prop({required: true, type: MongooseSchema.Types.ObjectId, ref: 'Workspace'})
    workspace: Types.ObjectId;

    @Prop()
    members?: string[];
}

export const MessageSchema = SchemaFactory.createForClass(Message);