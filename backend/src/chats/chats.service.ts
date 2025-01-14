import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChatMessage } from 'src/models/chats.Schema';

@Injectable()
export class ChatsService {
    constructor( @InjectModel(ChatMessage.name) private chatMessageModel: Model <ChatMessage> ) {}

//Save Chat
    async saveMessage(room: string, senderId: string, senderName:string ,text: string){
        const newMessage= new this.chatMessageModel({room, senderId, senderName ,text});
        return await newMessage.save();
    }

    async getChatHistory(room: string ){
        return await this.chatMessageModel.find({room}).sort({timestamp: 1});
    }

}