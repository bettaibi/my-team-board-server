import React, { useContext, useEffect } from 'react';
import { SocketEvents, useSocketContext } from '../../../../context/SocketContext';
import useDialog from '../../../../hooks/useDialog';
import { UserModel } from '../../../../models/app.model';
import VideoCallContainer from './VideoCallContainer';

export type ComponentSeverity = 'dial' | 'answer' | 'videoChat';

interface ContextProps {
    onCallStart: (c: ComponentSeverity) => void;
    onCallEnd : () => void;
    caller: UserModel;
}

const VideoCallContext = React.createContext({} as ContextProps);

export const VideoCallProvider = ({ children }: { children: JSX.Element }) => {
    const { DialogComponent, onDialogClose: onCallEnd, onDialogOpen } = useDialog(true);
    const { socket } = useSocketContext();
    const [initialComponent, setInitialComponent] = React.useState<ComponentSeverity>('dial');
   const [caller, setCaller] = React.useState<UserModel>({} as UserModel);

   console.log('iside video call component')

   useEffect(()=> {
    socket.on(SocketEvents.CALL, (user: UserModel) => {
        if(user){
            setCaller(user);
            onCallStart('answer');
        }
    });

    return ()=> {
        socket.off(SocketEvents.CALL);
    }
   }, []);

    function onCallStart(c: ComponentSeverity){
        setInitialComponent(c);

        setTimeout(() => {
            onDialogOpen();
        })
    }
    
    const value = {
        onCallStart,
        onCallEnd,
        caller
    };

    return (
        <VideoCallContext.Provider value = {value}>
            <React.Fragment>
                <DialogComponent>
                   <VideoCallContainer initialComponent = {initialComponent} />
                </DialogComponent>

                {children}
            </React.Fragment>
        </VideoCallContext.Provider>
    );
};

export const useVideoCallContext = () => {
    const values = useContext(VideoCallContext);
    return values;
};

