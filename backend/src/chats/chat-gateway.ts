import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { ChatsService } from "./chats.service";
import { InjectModel } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Users } from "src/models/users.Schema";
import * as cookie from 'cookie';
import { JwtService } from "@nestjs/jwt";

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer() server:Server;
    constructor(private readonly chatsService: ChatsService,
      private jwtService: JwtService,
      @InjectModel('Users') private userModel: mongoose.Model<Users>) {}

      

      async handleConnection(client: Socket) {
        try {
          // Parse the cookies from the handshake headers
          const cookies = cookie.parse(client.handshake.headers.cookie || '');
          const token = cookies.authToken;
    
          if (!token) {
            console.error('No token found in cookies');
            client.disconnect();
            return;
          }
    
          // Verify the JWT token
          const payload = this.jwtService.verify(token);
          console.log(`Connected user: ${payload.userId}`);
    
          // Store user data for later use in the WebSocket session
          client.data.user = payload;
    
          // Optional: Emit a welcome message to the client (optional for user feedback)
          client.emit('welcome', { message: 'You are connected!' });
    
        } catch (error) {
          console.error('Authentication error:', error);
          client.disconnect();
        }
      }
  
    // handleConnection(client: Socket) {
    //     console.log("new user connected", client.id);

    //     client.broadcast.emit('user-joined', {message: `${client.id} joined the chat`})
    // }

    handleDisconnect(client: Socket) {
        console.log("a user disconnected", client.id);

//will send to all except for the sender
        client.broadcast.emit('user-left', {message: `${client.id} left the chat`})

// will send to all including the sender
        //this.server.emit('user-left', {message: `${client.id} left the chat`}); 
    }



    

    @SubscribeMessage('newMessage')
    handleNewMessage(client: Socket, message:any){
        console.log(message);

        client.emit("reply", "this is a reply back"); // message will be sent to the client who sent the message only 

        this.server.emit("reply", message);// the message will be sent to the whole clients in the group chat 

    }

    @SubscribeMessage('joinRoom')
   async handleJoinRoom(@MessageBody() data:any, 
        @ConnectedSocket() client: Socket ){
            console.log('Received data:', data);
            try {
                // Attempt to parse the data if it's a string
                if (typeof data === 'string') {
                  data = JSON.parse(data);  // Parse if it's a JSON string
                }
            
                const room = data?.room;  // Safely access room
                const user = data?.user;  // Safely access user
            
                console.log(`Room: ${room}`);
                console.log(`User: ${user}`);
            
                if (!room || !user) {
                  console.log('Invalid joinRoom request:', data);
                  return;
                }
            
                client.join(room);

                console.log(`${user} joined room: ${room}`);
                this.server.to(room).emit('userJoined', { user });

                const chatHistory = await this.chatsService.getChatHistory(room);
                client.emit('chatHistory', chatHistory);

              } catch (error) {
                console.error('Error parsing data:', error);
                console.log('Invalid data received:', data);
              }
    }


    // Leave a chat room
    @SubscribeMessage('leaveRoom')
    handleLeaveRoom(
      @MessageBody() data: any,
      @ConnectedSocket() client: Socket
    ) {
      console.log('Received event data:', data);
  
      try {
        if (typeof data === 'string') {
          data = JSON.parse(data); // Parse if it's a JSON string
        }
  
        const room = data?.room?.trim();
        const user = data?.user?.trim();
  
        console.log(`Room: ${room}`);
        console.log(`User: ${user}`);
  
        if (!room || !user) {
          console.log('Invalid leaveRoom request:', data);
          client.emit('error', { message: 'Invalid leaveRoom request.' });
          return;
        }
  
        client.leave(room);
        console.log(`${user} left room: ${room}`);
        this.server.to(room).emit('userLeft', { user });
      } catch (error) {
        console.error('Error parsing leaveRoom data:', error);
        client.emit('error', { message: 'Failed to leave room.' });
      }
    }
  

  // Send a message
  @SubscribeMessage('sendMessage')
  async handleMessage(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket
  ) {
    console.log('Received event data:', data);

    try {
      if (typeof data === 'string') {
        data = JSON.parse(data); // Parse if it's a JSON string
      }

      const room = data?.room?.trim();
      const senderId = data?.senderId?.trim();
      const senderName = data?.senderName?.trim();
      const text = data?.text?.trim();

      console.log(`Room: ${room}`);
      console.log(`SenderId: ${senderId}`);
      console.log(`SenderName: ${senderName}`);
      console.log(`Message: ${text}`);

      if (!room || !senderId ||!senderName|| !text) {
        console.log('Invalid sendMessage request:', data);
        client.emit('error', { message: 'Invalid sendMessage request.' });
        return;
      }

      console.log(`Message from ${senderId}: ${text}`);
      // this.server.to(room).emit('receiveMessage', {
      //   room,
      //   sender,
      //   text,
      // });

      const newMessage = await this.chatsService.saveMessage(room, senderId, senderName, text);

      // Broadcast the new message to the room
      this.server.to(room).emit('newMessage', newMessage);

    } catch (error) {
      console.error('Error parsing sendMessage data:', error);
      client.emit('error', { message: 'Failed to send message.' });
    }
  }



  




}