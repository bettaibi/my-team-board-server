import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document,  Schema as MongooseSchema, Types } from "mongoose";

export type SprintDocument = Document & Sprint;

interface TaskModel{
    description: string;
    order: number;
    done: boolean;
}

@Schema()
export class Sprint {
    @Prop({default: ''})
    title: string;

    @Prop({default: ''})
    description: string;

    @Prop()
    dueDate: Date;

    @Prop({default: []})
    tasks: TaskModel[];

    @Prop({required: true, type: MongooseSchema.Types.ObjectId, ref: 'Aspect'})
    aspect: Types.ObjectId;
}

export const SprintSchema = SchemaFactory.createForClass(Sprint);