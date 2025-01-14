import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class responses{
    @Prop({ required: true , unique: true })
    response_id: string;

    @Prop({ type: Types.ObjectId, ref: 'Users', required: true })
    user_Id: Types.ObjectId; 

    @Prop({ type: Types.ObjectId, ref: 'quizzes', required: true })
    quiz_Id: Types.ObjectId; 

    @Prop()
    answers : object[];

    @Prop()
    score: number;

    @Prop({ type: Date })
    submitted_at: Date;
}

export const ResponseSchema = SchemaFactory.createForClass(responses);