import mongoose , {Document, Types} from 'mongoose';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class quizzes{
    @Prop({ required: true , unique: true })
    quiz_id: string;

    @Prop({ type: Types.ObjectId, ref: 'modules', required: true })
    module_Id: Types.ObjectId; 

    @Prop({required: true })
    questions: Object[];

    @Prop({ type: Date })
    createdAt?: Date;

}

export const QuizSchema = SchemaFactory.createForClass(quizzes);
