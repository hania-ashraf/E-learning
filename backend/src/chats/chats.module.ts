import { Module } from '@nestjs/common';
import { ChatGateway } from './chat-gateway';
import { ChatsService } from './chats.service';
import { ChatMessageSchema } from 'src/models/chats.Schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/models/users.Schema';
import { JwtService } from '@nestjs/jwt';

@Module({
    imports: [MongooseModule.forFeature([{name: 'ChatMessage' , schema:ChatMessageSchema},
    { name: 'Users', schema: UserSchema }
    ])],

    providers:[ChatGateway, ChatsService,JwtService]
})
export class ChatsModule {}
