import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Member } from './member.model';

type WorkspaceDocument = Document & Workspace;

@Schema()
class Workspace {
    @Prop({required: true, })
    name: string;

    @Prop({required: true, type: MongooseSchema.Types.ObjectId, ref: 'Member'})
    owner: Member;
};

const WorkspaceSchema = SchemaFactory.createForClass(Workspace);

export { WorkspaceSchema, WorkspaceDocument, Workspace };