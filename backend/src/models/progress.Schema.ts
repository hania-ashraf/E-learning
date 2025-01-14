import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { Types } from 'mongoose';



@Schema({ timestamps: true })
export class progress{
    // @Prop({ required: true , unique: true })
    // progress_id: string;

    @Prop({ type: Types.ObjectId, ref: 'Users', required: true })
    user_Id: Types.ObjectId; 

   @Prop({ type: Types.ObjectId, ref: 'courses', required: true })
    course_Id: Types.ObjectId; 

    @Prop({ required: true})
    completion_percentage: number;

    @Prop({ required: true})
    last_accessed: Date;


}

export const ProgressSchema = SchemaFactory.createForClass(progress);