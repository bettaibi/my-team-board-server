import React, { useCallback, useContext, useEffect } from 'react';
import { SocketEvents, useSocketContext } from '../../../../context/SocketContext';
import useToggle from '../../../../hooks/useToggle';
import { UserModel } from '../../../../models/app.model';
import VideoCallContainer from './VideoCallContainer';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import { Dialog } from '@material-ui/core';

export type ComponentSeverity = 'dial' | 'answer' | 'videoChat' | null;

const SlideTransition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="right" ref={ref} {...props} />;
});

interface ContextProps {
    onCallStart: (c: ComponentSeverity) => void;
    onCallEnd : () => void;
    caller: UserModel;
}

const VideoCallContext = React.createContext({} as ContextProps);

export const VideoCallProvider = React.memo(({ children }: { children: JSX.Element }) => {
    const { DialogComponent, onDialogClose, onDialogOpen } = useDialogComponent();
    const { socket } = useSocketContext();
    const [currentComponent, setCurrentComponent] = React.useState<ComponentSeverity>(null);
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
        setCurrentComponent(c);

        setTimeout(() => {
            onDialogOpen();
        })
    };

    function onCallEnd(){
        onDialogClose();
        setCaller({} as UserModel);
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
                   <VideoCallContainer currentComponent = {currentComponent} />
                </DialogComponent>

                {children}
            </React.Fragment>
        </VideoCallContext.Provider>
    );
});

const useDialogComponent = () => {
    const { handleClose: onDialogClose, handleOpen: onDialogOpen, show } = useToggle();
    console.log('Chat dialog rerender')

    const DialogComponent: React.FC = useCallback(({children}) => {
        return(
        <Dialog 
            onClose={onDialogClose} 
            aria-labelledby="video-chat-dialog" 
            open={show}
            TransitionComponent={SlideTransition}
            fullScreen={true}>
            {children}
        </Dialog>)
    }, [show]);

    return {
        DialogComponent,
        onDialogClose,
        onDialogOpen
    }
};


export const useVideoCallContext = () => {
    const values = useContext(VideoCallContext);
    return values;
};

