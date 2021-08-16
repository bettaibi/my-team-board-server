import React, { useContext } from 'react';
import useDialog from '../../../../hooks/useDialog';
import VideoCallContainer from './VideoCallContainer';

interface ContextProps {
    onCallStart: () => void;
    onCallEnd : () => void;
}


const VideoCallContext = React.createContext({} as ContextProps);

console.log('video call file')
export const VideoCallProvider = ({ children }: { children: JSX.Element }) => {
   const { DialogComponent, onDialogClose: onCallEnd, onDialogOpen: onCallStart } = useDialog(true);

   console.log('iside video call component')
    const value = {
        onCallStart,
        onCallEnd
    };

    return (
        <VideoCallContext.Provider value = {value}>
            <React.Fragment>
                <DialogComponent>
                   <VideoCallContainer />
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

