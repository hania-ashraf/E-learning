import mongoose , {Document, Types} from 'mongoose';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class modules{
    // @Prop({required: true , unique: true})
    // module_id: string;

    @Prop({ type: Types.ObjectId, ref: 'courses', required: true })
    course_Id: Types.ObjectId; 

    @Prop({required: true })
    title: string;

    @Prop({required: true})
    content: string;

    @Prop()
    resources?: string[]; //store the files like /uploads/video.mp4

    @Prop({ type: Date })
    createdAt?: Date;

}

export const ModuleSchema = SchemaFactory.createForClass(modules);