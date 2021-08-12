import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from 'socket.io';
import { IMessage } from "src/models/message.model";

@WebSocketGateway({ namespace: 'chat' })
export class ChatGateway {
    @WebSocketServer()
    server: Server;

    @SubscribeMessage('message')
    handleEvent(@MessageBody() data: IMessage): Promise<IMessage> {
       return new Promise<IMessage>((resolve, reject) => {
           if(data){
               resolve(data);
           }
           else{
               reject(new Error('Message not found'));
           }
       });
    }

}