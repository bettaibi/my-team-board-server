import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema, Types } from "mongoose";

export type AspectDocument = Document & Aspect;

@Schema()
export class Aspect {
    @Prop()
    title: string;

    @Prop({required: true, type: MongooseSchema.Types.ObjectId, ref: 'Project'})
    project: Types.ObjectId;
}

export const AspectSchema = SchemaFactory.createForClass(Aspect);