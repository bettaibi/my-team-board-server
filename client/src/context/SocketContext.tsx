import React, { useCallback, useContext, useEffect } from 'react';
import { useSharedContext } from '.';

import io, { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';
import { MessageModel, ProjectModel, WorkspaceModel } from '../models/app.model';
import { PostNewMessage } from '../store/actions/chat.actions';
import { deleteWorkspace, setWorkspaces } from '../store/actions/workspace.actions';
import { Dialog } from '@material-ui/core';

import SessionExpired from '../pages/Team/Setting/SessionExpired';
import useToggle from '../hooks/useToggle';
import { newProject, updateProject } from '../store/actions/project.actions';
import { deleteAspect, editAspect, newAspect, newBoard } from '../store/actions/board.actions';
import { fetchBoard } from '../util/helpers';

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
    NEW_MESSAGE: 'NEW_MESSAGE',
    CALL: 'CALL',
    ANSWER: 'ANSWER',
    CALL_ACCEPTED: 'CALL_ACCEPTED',
    CALL_END: 'CALL_END',
    EMIT_SIGNAL: 'EMIT_SIGNAL',
    DATA_STREAM: 'DATA_STREAM',
};

export const SocketProvider = ({ children }: { children: JSX.Element }) => {
    const { currentUser, selectedWorkspace, dispatch } = useSharedContext();
    const [onlineUsers, setOnlineUsers] = React.useState<OnlineUserProps>({});
    const { DialogComponent, onDialogOpen, onDialogClose } = useDialogComponent();

    const msgRingTone = React.useMemo(()=> {
        return new Audio('/audio/wsn.mp3');
    }, []);

    useEffect(() => {
        msgRingTone.load();

        return () => {
            msgRingTone.pause();
            msgRingTone.currentTime = 0;
        }
    },[]);

    useEffect(()=> {
        if(selectedWorkspace){
            socket.on(SocketEvents.ONLINE_USERS, (users: OnlineUserProps) => {
                setOnlineUsers(users);
            });

            socket.on(SocketEvents.NEW_MESSAGE, (data: MessageModel)=> {
                dispatch(PostNewMessage(data, data.sender));
                msgRingTone.play();
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
            socket.emit('joinWorkspace', {workspaceId: selectedWorkspace, userId: currentUser._id});
        }

        return () => {
           if(selectedWorkspace){
            socket.emit('leaveWorkspace', {workspaceId: selectedWorkspace, userId: currentUser._id});
           }
        }
    }, [selectedWorkspace]);

    // LISTEN TO REALTIME CHANGES
    useEffect(() => {

        socket.on('new_workspace', (data: WorkspaceModel[])=> {
            dispatch(setWorkspaces(data));
        });

        socket.on('delete_workspace', ({workspaces, workspaceId}: {workspaces:  WorkspaceModel[], workspaceId: string}) => {
            if(selectedWorkspace == workspaceId){
                onDialogOpen();
            }
            else{
                dispatch(setWorkspaces(workspaces));
            }
        });

        socket.on('removed_workspace', (id: string)=> {
            if(id == selectedWorkspace ){
                onDialogOpen();
            }
            else{
                dispatch(deleteWorkspace(id))
            }
        });

        socket.on('new_project', (project: ProjectModel) => {
            if(project.workspace == selectedWorkspace){
                dispatch(newProject(project))
            }
        });

        socket.on('edit_project', (project: ProjectModel) => {
            if(project.workspace == selectedWorkspace){
                dispatch(updateProject(project))
            }
        });

        socket.on('new_aspect', ({workspace, aspect})=> {
            if(workspace == selectedWorkspace){
                dispatch(newAspect(aspect.project, aspect));
            }
        });

        socket.on('delete_aspect', ({workspace, aspectId, projectId}) => {
            if(workspace == selectedWorkspace){
                dispatch(deleteAspect(projectId, aspectId));
            }
        });

        socket.on('edit_aspect', ({workspace, aspect})=> {
            if(workspace == selectedWorkspace){
                dispatch(editAspect(aspect.project, aspect));     
            }
        });

        socket.on('sprint_change', ({workspace, projectId}) => {
            if(workspace == selectedWorkspace){
                fetchBoard(projectId).then((data)=> {
                    if(data){
                        dispatch(newBoard(data));
                    }
                }).catch((err)=> console.error(err));
            }
        });

        return () => {
            socket.off('new_workspace');
            socket.off('delete_workspace');
            socket.off('removed_workspace');
            socket.off('new_project');
            socket.off('edit_project');
            socket.off('new_aspect');
            socket.off('delete_aspect');
            socket.off('edit_aspect');
            socket.off('sprint_change');
        };
    }, []);

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
                <DialogComponent>
                    <SessionExpired onDialogClose = {onDialogClose} />
                </DialogComponent>
                {children}
            </React.Fragment>
        </SocketContext.Provider>
    );
};

export const useSocketContext = () => {
    const values = useContext(SocketContext);
    return values;
};

const useDialogComponent = () => {
    const { handleClose: onDialogClose, handleOpen: onDialogOpen, show } = useToggle();

    const DialogComponent: React.FC = useCallback(({children}) => {
        return(
        <Dialog 
            onClose={onDialogClose} 
            aria-labelledby="session-expired-dialog" 
            open={show}>
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


