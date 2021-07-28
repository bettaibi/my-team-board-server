import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document,  Schema as MongooseSchema, Types } from "mongoose";

export type ProjectDocument = Document & Project;

@Schema()
export class Project {
    @Prop({required: true})
    title: string;

    @Prop()
    description: string;

    @Prop({default: new Date()})
    createdAt: Date;

    @Prop({default: [], type: [{type: MongooseSchema.Types.ObjectId, ref: 'Member'}]})
    members: string[];

    @Prop({required: true, type: MongooseSchema.Types.ObjectId, ref: 'Workspace'})
    workspace: Types.ObjectId;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);