import MongooseSchema  from 'mongoose';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { courses } from './courses.Schema';


@Schema({ timestamps: true })
export class users{
    @Prop()
    user_id: string;

    @Prop({required: true})
    name: string;
    
    @Prop({required: true, unique: true})
    email: string;

    @Prop({required: true, unique:true})
    password: string;

    @Prop({required: true , enum: ['student','instructor','admin']}) //enum is to restrict the values of the field 
    role: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'courses' }) //instructor
    coursesTaught?: courses[];

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'courses' }) //student
    coursesEnrolled: courses[];

    @Prop()
    profile_picture_url?: string;

    @Prop({ type: Date })
    createdAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(users);