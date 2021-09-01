import React, { useCallback, useContext, useEffect } from 'react';
import { SocketEvents, useSocketContext } from '../../../../context/SocketContext';
import { UserModel } from '../../../../models/app.model';
import { Dialog } from '@material-ui/core';
import { TransitionProps } from '@material-ui/core/transitions';
import VideoCallContainer from './VideoCallContainer';
import Slide from '@material-ui/core/Slide';
import useToggle from '../../../../hooks/useToggle';

export type ComponentSeverity = 'dial' | 'answer' | 'videoChat' | null;

const SlideTransition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="right" ref={ref} {...props} />;
});

interface ContextProps {
    onCallStart: (c: ComponentSeverity, isVideo: boolean) => void;
    onCallEnd : () => void;
    caller: UserModel;
    isVideo: boolean;
}

const VideoCallContext = React.createContext({} as ContextProps);

export const VideoCallProvider = React.memo(({ children }: { children: JSX.Element }) => {
    const { DialogComponent, onDialogClose, onDialogOpen, show } = useDialogComponent();
    const { socket } = useSocketContext();
    const [currentComponent, setCurrentComponent] = React.useState<ComponentSeverity>(null);
   const [caller, setCaller] = React.useState<UserModel>({} as UserModel);
   const [isVideo, setIsVideo] = React.useState<boolean>(true);

   useEffect(()=> {
    socket.on(SocketEvents.CALL, ({user, isVideo}: {user: UserModel, isVideo: boolean}) => {
        if(user){
            setCaller(user);
            onCallStart('answer', isVideo);
        }
    });

    socket.on('disconnect', ()=> {
        if(show){
            onCallEnd()
        }
    });

    return ()=> {
        socket.off(SocketEvents.CALL);
    }
   }, []);

    function onCallStart(c: ComponentSeverity, isVideoChat: boolean) {
        setIsVideo(isVideoChat);
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
        caller,
        isVideo
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
        onDialogOpen,
        show
    }
};


export const useVideoCallContext = () => {
    const values = useContext(VideoCallContext);
    return values;
};

