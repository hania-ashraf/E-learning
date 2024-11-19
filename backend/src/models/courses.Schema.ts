import MongooseSchema from 'mongoose';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {users} from './users.Schema';

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

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'users' })
    studentTook : users[];

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'users' })
    instructorTeach: users[];

    @Prop({ type: Date })
    createdAt?: Date;
}

export const CourseSchema = SchemaFactory.createForClass(courses);