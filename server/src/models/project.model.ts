import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document,  Schema as MongooseSchema } from "mongoose";
import { Workspace } from "./workspace.model";

export type ProjectDocument = Document & Project;

@Schema()
export class Project {
    @Prop({required: true})
    title: string;

    @Prop()
    description: string;

    @Prop({default: new Date()})
    createdAt: Date;

    @Prop({required: true, type: MongooseSchema.Types.ObjectId, ref: 'Workspace'})
    workspace: Workspace;

}

export const ProjectSchema = SchemaFactory.createForClass(Project);