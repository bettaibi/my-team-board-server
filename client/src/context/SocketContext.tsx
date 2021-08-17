import React, { useContext, useEffect } from 'react';
import { useSharedContext } from '.';

import io, { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';
import { MessageModel } from '../models/app.model';
import { PostNewMessage } from '../store/actions/chat.actions';

interface OnlineUserProps{
    [userId: string]: {socketId: string, lastSeen?: Date};
}
interface ContextProps {
    socket: Socket<DefaultEventsMap, DefaultEventsMap>;
    onlineUsers: OnlineUserProps;
    sendMessage: (workspaceId:string | null, receiverId: string, data: MessageModel) => void;
}

const WS = process.env.REACT_APP_WS_URL || '/chat';
const socket = io(`${WS}/chat`);
const SocketContext = React.createContext({} as ContextProps);

export const SocketEvents = {
    ONLINE_USERS: 'ONLINE_USERS',
    NEW_MESSAGE: 'NEW_MESSAGE'
};

export const SocketProvider = ({ children }: { children: JSX.Element }) => {
    const { currentUser, selectedWorkspace, dispatch } = useSharedContext();
    const [onlineUsers, setOnlineUsers] = React.useState<OnlineUserProps>({});

    const msgRingTone = new Audio('/audio/wsn.mp3');

    useEffect(() => {
        msgRingTone.load();

        return () => {
            msgRingTone.pause();
            msgRingTone.currentTime = 0;
        }
    },[]);

    useEffect(()=> {
        console.log("Socket Members Array");
        if(selectedWorkspace){
            socket.on(SocketEvents.ONLINE_USERS, (users: OnlineUserProps) => {
                setOnlineUsers(users);
            });

            socket.on(SocketEvents.NEW_MESSAGE, (data: MessageModel)=>{
                console.log(data);
                dispatch(PostNewMessage(data, data.sender));
                msgRingTone.play();
            });

            socket.on('disconnect', ()=> {
                console.log('disconnect')
                socket.emit('leaveWorkspace', {workspaceId: selectedWorkspace, userId: currentUser._id});
            });
        }

        return () => {
            if(selectedWorkspace){
                socket.off(SocketEvents.ONLINE_USERS);
                socket.off(SocketEvents.NEW_MESSAGE);
            }
        };
    }, [selectedWorkspace]);

    useEffect(() => {
        if(selectedWorkspace){
            console.log("Socket Context INIT");
            socket.emit('joinWorkspace', {workspaceId: selectedWorkspace, userId: currentUser._id});
        }

        return () => {
           if(selectedWorkspace){
            console.log("destroy");
            socket.emit('leaveWorkspace', {workspaceId: selectedWorkspace, userId: currentUser._id});
           }
        }
    }, [selectedWorkspace]);

    function sendMessage(workspaceId:string | null, receiverId: string, data: MessageModel): void{
        if(workspaceId){
            socket.emit('sendMessage', {workspaceId, receiverId, data})
        }
    }

    const value = {
        socket,
        onlineUsers,
        sendMessage
    };

    return (
        <SocketContext.Provider value = {value}>
            <React.Fragment>
                {children}
            </React.Fragment>
        </SocketContext.Provider>
    );
};

export const useSocketContext = () => {
    const values = useContext(SocketContext);
    return values;
};

