import { Logger } from "@nestjs/common";
import { 
    MessageBody, 
    SubscribeMessage, 
    WebSocketGateway, 
    WebSocketServer,
    OnGatewayInit,
    OnGatewayConnection,
    OnGatewayDisconnect
} from "@nestjs/websockets";
import { Server, Socket } from 'socket.io';
import { SocketEvents } from './events';
import { IMessage } from "src/models/message.model";
import { IMember } from "src/models/member.model";

interface OnlineUsersModel{
    [roomId: string]: {[userId: string]: {socketId: string, lastSeen?: Date}};
}

interface RegisteredSockets{
    [socketId: string]: {userId: string, workspaceId: string}
}
interface RegisteredUser{
    [userId: string]: string;
}

@WebSocketGateway({ namespace: 'chat', cors: true })
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{
    @WebSocketServer()
    server: Server;

    private logger: Logger = new Logger('Socket Gateway');
    private users : OnlineUsersModel = {};
    private registredSockets: RegisteredSockets = {};
    public registeredUser: RegisteredUser = {};

    afterInit(server: Server) {
        this.logger.log('Socket Initialized');
    }

    handleConnection(client: Socket, ...args: any[]) {
        this.logger.log('Client has been Connected');
    }

    private JoinNewRoom(roomId: string, userId: string, socketId: string): void{
        const workspace = this.users.hasOwnProperty(roomId);
        if(workspace){
            this.users[roomId] = {...this.users[roomId], [userId]: {socketId}};
        }
        else{
            this.users = {...this.users, [roomId]: {[userId]: {socketId}} };
        }
    }

    private leaveRoom(roomId: string, userId: string, socketId: string): void {
        const workspace = this.users.hasOwnProperty(roomId);
        if(workspace){
            this.users[roomId] = {...this.users[roomId], [userId]: {socketId, lastSeen: new Date() }};
        }
    }

    private findReceiver(roomId: string, receiverId: string): string{
        const workspace = this.users[roomId];
        if(workspace){
           if(workspace.hasOwnProperty(receiverId)){
               return workspace[receiverId].socketId
           }
           else
           return  "";
        }
        else{ return ""; }
    }

    @SubscribeMessage('joinWorkspace')
    private joinWorkspace(client: Socket, payload: { workspaceId:string, userId: string }): void {
        this.JoinNewRoom(payload.workspaceId, payload.userId, client.id);
        client.join(payload.workspaceId);
        this.server.to(payload.workspaceId).emit(SocketEvents.ONLINE_USERS, this.users[payload.workspaceId]);
        this.registeredUser = {...this.registeredUser, [payload.userId]: client.id};
        this.registredSockets = {...this.registredSockets, [client.id]: {userId: payload.userId, workspaceId: payload.workspaceId}}
        this.logger.log(`${payload.userId} has been joined the room ${payload.workspaceId}`)
    }

    @SubscribeMessage('leaveWorkspace')
    private leaveWorkspace(client: Socket, payload: { workspaceId: string, userId: string }): void {
        this.leaveRoom(payload.workspaceId, payload.userId, client.id);
        client.leave(payload.workspaceId);
        this.server.to(payload.workspaceId).emit(SocketEvents.ONLINE_USERS, this.users[payload.workspaceId]);
        if(this.registeredUser.hasOwnProperty(payload.userId)){
            delete this.registeredUser[payload.userId];
        }
        this.logger.log(`${payload.userId} left the room ${payload.workspaceId}`)
    }

    @SubscribeMessage('sendMessage')
    private sendMessage(@MessageBody() payload: { workspaceId:string, receiverId: string, data: IMessage }): void {
        const socketId = this.findReceiver(payload.workspaceId, payload.receiverId);
        if(socketId){
            this.server.to(socketId).emit(SocketEvents.NEW_MESSAGE, payload.data);
        }
    }

    @SubscribeMessage('dial')
    private onCallHandler(@MessageBody() payload: {to: string, from: IMember, isVideo: boolean}) {
        this.server.to(payload.to).emit(SocketEvents.CALL, {user: payload.from, isVideo: payload.isVideo});
    }

    @SubscribeMessage('cancelCall')
    private onCallEndHandler(@MessageBody() payload: string) {
        this.server.to(payload).emit(SocketEvents.CALL_END);
    }

    @SubscribeMessage('onCallAccepted')
    private onCallAcceptedHandler(@MessageBody() payload: string) {
        this.server.to(payload).emit(SocketEvents.CALL_ACCEPTED);
    }

    @SubscribeMessage('receiveSignal')
    private onReciveSignal(@MessageBody() payload: {to: string, dataSignal: any}){
        this.server.to(payload.to).emit(SocketEvents.EMIT_SIGNAL, payload.dataSignal);
    }

    private onUserDisconnect(socketId: string){
        if(this.registredSockets.hasOwnProperty(socketId)){
            const {workspaceId, userId} = this.registredSockets[socketId];
            this.leaveRoom(workspaceId, userId, socketId);
            this.server.to(workspaceId).emit(SocketEvents.ONLINE_USERS, this.users[workspaceId]);
            if(this.registeredUser.hasOwnProperty(userId)){
                delete this.registeredUser[userId];
            }
        }
    }

    handleDisconnect(client: Socket) {
        this.logger.log('Client has been Disconnected');
        this.onUserDisconnect(client.id);
        client.removeAllListeners();
    }
}