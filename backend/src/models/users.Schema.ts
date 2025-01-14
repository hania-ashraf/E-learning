import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Role } from 'src/constants/roles.enum';



@Schema({ timestamps: true })
export class Users extends Document { // Ensure class name is capitalized and matches naming conventions
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, unique: true })
  password: string;

  @Prop({ required: true, enum: Role })
  role: Role;

  @Prop({ type: [MongooseSchema.Types.ObjectId], ref: 'courses' }) // Ref array for courses taught
  coursesTaught?: string[];

  @Prop({ type: [MongooseSchema.Types.ObjectId], ref: 'courses' }) // Ref array for enrolled courses
  coursesEnrolled: string[];

  @Prop()
  profile_picture_url?: string;

  @Prop({ type: Boolean, default: true })  // New field for availability status For Soft Delete
    isAvailable: boolean;

    
}

export const UserSchema = SchemaFactory.createForClass(Users); // Ensure proper schema creation
