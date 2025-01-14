import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class ChatMessage extends Document {
  @Prop({ required: true })
  room: string;  // Room identifier (e.g., course ID or study group ID)

  @Prop({ required: true })
  senderId: string;  // ID of the sender (student or instructor)

  @Prop({ required: true })
  senderName: string;  // Name of the sender (for display purposes)

  @Prop({ required: true })
  text: string;  // The chat message

  @Prop({ default: Date.now })
  timestamp: Date;  // Time the message was sent
}

export const ChatMessageSchema = SchemaFactory.createForClass(ChatMessage);
