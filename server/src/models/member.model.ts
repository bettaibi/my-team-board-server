import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type MemberDocument = Document & Member;

@Schema()
export class Member {
    @Prop()
    name: string;

    @Prop()
    title: string;

    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop({default: ''})
    avatar: string;

    @Prop()
    address: string;

    @Prop()
    country: string;

    @Prop()
    city: string;

    @Prop()
    phone: string;
}

export const MemberSchema = SchemaFactory.createForClass(Member);