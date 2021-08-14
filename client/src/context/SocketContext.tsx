import React, { useContext, useEffect } from 'react';
import { useSharedContext } from '.';

import io, { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';

interface OnlineUserProps{
    [userId: string]: {socketId: string, lastSeen?: Date};
}
interface ContextProps {
    socket: Socket<DefaultEventsMap, DefaultEventsMap>;
    onlineUsers: OnlineUserProps;
}

const WS = process.env.REACT_APP_WS_URL || '/chat';
const socket = io(`${WS}/chat`);
const SocketContext = React.createContext({} as ContextProps);

export const SocketEvents = {
    ONLINE_USERS: 'ONLINE_USERS'
};

export const SocketProvider = ({ children }: { children: JSX.Element }) => {
    const { currentUser, selectedWorkspace } = useSharedContext();
    const [onlineUsers, setOnlineUsers] = React.useState<OnlineUserProps>({});

    useEffect(()=> {
        console.log("Socket Members Array");
        if(selectedWorkspace){
            socket.on(SocketEvents.ONLINE_USERS, (users: OnlineUserProps) => {
                setOnlineUsers(users);
            });
        }

        return () => {
            if(selectedWorkspace){
                socket.off(SocketEvents.ONLINE_USERS);
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

    const value = {
        socket,
        onlineUsers
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

