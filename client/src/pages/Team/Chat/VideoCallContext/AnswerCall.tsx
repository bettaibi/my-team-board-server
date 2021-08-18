import React, { useEffect } from 'react';
import {
    IconButton,
    Avatar,
    Typography,
    Box,
    Paper,
    makeStyles,
    Theme,
    Tooltip
} from '@material-ui/core';
import { CallEnd, Call } from '@material-ui/icons';
import { UserModel } from '../../../../models/app.model';
import { useVideoCallContext } from '.';
import { SocketEvents, useSocketContext } from '../../../../context/SocketContext';
import { getSocketId } from '../helpers';
import clsx from 'clsx';
import userAvatar from '../../../../assets/avatars/profile.jpg';

const baseURL = process.env.REACT_APP_BASE_URL;

const useStyle = makeStyles((theme: Theme) => ({
    lgAvatar: {
        width: theme.spacing(11),
        height: theme.spacing(11),
    },
    mb: {
        marginBottom: theme.spacing(1)
    },
    mr: {
        marginRight: theme.spacing(2)
    },
    rippleAnimation: {
        marginBottom: theme.spacing(3),
        width: theme.spacing(11),
        height: theme.spacing(11),
        position: 'relative'
    },
    paper: {
        padding: theme.spacing(4),
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
    },
    header: {
        position: 'absolute',
        top: theme.spacing(2),
        right: theme.spacing(2),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '100%',
        zIndex: 99999999
    }
}));

const AnswerCall = ({ currentUser, onCallAccepted }: { currentUser: UserModel, onCallAccepted: () => void }) => {

    const classes = useStyle();
    const { onCallEnd, caller: UserToAnswer } = useVideoCallContext();
    const { socket, onlineUsers } = useSocketContext();
    const [callState, SetCallState] = React.useState<string>('Calling...');
    const callRingtone = new Audio('/audio/app_call.mp3');

    useEffect(() => {

        const init = async () => {
            try{
                callRingtone.load();
                callRingtone.loop = true;
                callRingtone.play();

                socket.on(SocketEvents.CALL_END , ()=> {
                    receiveCallEnd();
                });

                socket.on(SocketEvents.CALL_ACCEPTED, () => {
                    onCallAccepted();
                });
            }
            catch(err){
                console.error(err);
            }
        };

        init();

        return () => {
            callRingtone.pause();
            callRingtone.currentTime = 0;
            socket.off(SocketEvents.CALL_END);
            socket.off(SocketEvents.CALL_ACCEPTED);
        }
    }, []);

    function receiveCallEnd (){
        SetCallState('Call Ended.');
        setTimeout(() => {
            onCallEnd();
        }, 1000);
    }

    async function CallEndHandler() {
        SetCallState('Call Ended.')
        const socketId = await getSocketId(UserToAnswer._id || '', onlineUsers);
        if(socketId)
        socket.emit('cancelCall', socketId);

        setTimeout(() => {
            onCallEnd();
        }, 1000);
    }

    async function CallAcceptedHandler(){
        const socketId = await getSocketId(UserToAnswer._id || '', onlineUsers);
        if(socketId)
        socket.emit('onCallAccepted', socketId);
        onCallAccepted();
    }

    return (
        <React.Fragment>
            <Box display="flex" flexDirection="column" alignItems="center"
                justifyContent="center" height="100%">
                {UserToAnswer &&
                    <Paper elevation={3} className={classes.paper}>
                        <Box className={clsx('circle', classes.rippleAnimation)}>
                            <Avatar src={UserToAnswer.avatar ? `${baseURL}/files/${UserToAnswer.avatar}` : userAvatar}
                                alt="userToCall" className={clsx(classes.lgAvatar)} />
                        </Box>
                        <Typography component="div" variant="h5" className="bg-text-primary" gutterBottom>
                            {UserToAnswer?.name}
                        </Typography>
                        <Typography component="span" variant="body2" color="textSecondary" className={classes.mb}>
                            {callState}
                        </Typography>

                        <Box>
                            <IconButton className={clsx('wobble', classes.mr)} style={{ backgroundColor: '#04AA6D', color: '#fff' }}
                                onClick={CallAcceptedHandler}>
                                <Call />
                            </IconButton>

                            <IconButton style={{ backgroundColor: '#f50057', color: '#fff' }}
                                onClick={CallEndHandler}>
                                <CallEnd />
                            </IconButton>
                        </Box>
                    </Paper>
                }
            </Box>
            
            <Box className={classes.header}>
                {
                    UserToAnswer && <>
                        <Tooltip title={currentUser.name}>
                            <Avatar src={currentUser.avatar ? `${baseURL}/files/${currentUser.avatar}` : userAvatar}
                                alt="mine" className={classes.mr} />
                        </Tooltip>

                        <Tooltip title={UserToAnswer?.name}>
                            <Avatar src={UserToAnswer.avatar ? `${baseURL}/files/${UserToAnswer.avatar}` : userAvatar}
                                alt="userToCall" />
                        </Tooltip>
                    </>
                }
            </Box>
        </React.Fragment>
    )
}

export default AnswerCall;
