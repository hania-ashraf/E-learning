import MongooseSchema, { Types } from 'mongoose';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';


@Schema({ timestamps: true })
export class courses{
    @Prop({required: true , unique: true})
    course_id: string;

    @Prop({required: true })
    title: string;

    @Prop({required: true })
    description: string;

    @Prop({required: true })
    category: string;

    @Prop({required: true })
    difficulty_level: string;

    @Prop({required: true })
    created_by: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'modules' })
    Module: Types.ObjectId[];

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Users' })
    studentTook : Types.ObjectId[];

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Users' })
    instructorTeach: Types.ObjectId[];

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Users' }], default: [] })
    completedBy: Types.ObjectId[];

    @Prop({ type: Boolean, default: true })  // New field for availability status For Soft Delete
    isAvailable: boolean;


    @Prop({ type: Date })
    createdAt?: Date;
}

export const CourseSchema = SchemaFactory.createForClass(courses);



