import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';

type WorkspaceDocument = Document & Workspace;

@Schema()
class Workspace {
    @Prop({required: true, unique: true})
    name: string;

    @Prop({required: true, type: MongooseSchema.Types.ObjectId, ref: 'Member'})
    owner: Types.ObjectId;

    @Prop({default: [], type: [{type: MongooseSchema.Types.ObjectId, ref: 'Member'}]})
    members: string[];

};

const WorkspaceSchema = SchemaFactory.createForClass(Workspace);

export { WorkspaceSchema, WorkspaceDocument, Workspace };