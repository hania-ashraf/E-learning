import { Schema as MongooseSchema, Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


@Schema({ timestamps: true })
export class Thread extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'courses', required: true })
  course: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Users', required: true })
  createdBy: MongooseSchema.Types.ObjectId;

  @Prop([
    {
      content: { type: String, required: true },
      createdBy: { type: MongooseSchema.Types.ObjectId, ref: 'Users', required: true },
      createdAt: { type: Date, default: Date.now },
    },
  ])
  replies?: {
    content: string;
    createdBy: MongooseSchema.Types.ObjectId;
    createdAt: Date;
  }[];

  @Prop({ type: Date, default: Date.now })
  createdAt?: Date;
}

export const ThreadSchema = SchemaFactory.createForClass(Thread);
