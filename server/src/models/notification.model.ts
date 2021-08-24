import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema, Types } from "mongoose";

export type NotificationDocument = Document & Notification;

class NotificationMembers {
    @Prop()
    _id: string;

    @Prop({default: false})
    seen: boolean;
}

@Schema()
export class Notification {
    @Prop()
    title: string;

    @Prop()
    body: string;

    @Prop({default: new Date()})
    createdAt: Date;

    @Prop({type: [NotificationMembers], default: []})
    members: NotificationMembers[]

    @Prop({required: true, type: MongooseSchema.Types.ObjectId, ref: 'Workspace'})
    workspace: Types.ObjectId;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);