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
import { CallEnd } from '@material-ui/icons';
import { UserModel } from '../../../../models/app.model';
import { useVideoCallContext } from '.';
import clsx from 'clsx';
import userAvatar from '../../../../assets/avatars/profile.jpg';
import { SocketEvents, useSocketContext } from '../../../../context/SocketContext';
import { getSocketId } from '../../../../util/helpers';

const baseURL = process.env.REACT_APP_BASE_URL;

const useStyle = makeStyles((theme: Theme) => ({
    lgAvatar: {
        width: theme.spacing(11),
        height: theme.spacing(11),
    },
    mb: {
        marginBottom: theme.spacing(1)
    },
    mr:{
        marginRight: theme.spacing(1)
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

const callRingtone = new Audio('/audio/caller.mp3');

const Dial = ({currentUser, onCallAccepted}: {currentUser: UserModel, onCallAccepted: () => void}) => {
    const [callState, SetCallState] = React.useState<string>('Dialing...');
    const { onCallEnd, isVideo } = useVideoCallContext();
    const { socket, onlineUsers } = useSocketContext();
    const classes = useStyle();
    let ob = sessionStorage.getItem('userToCall');
    const userToCall: UserModel = ob ? JSON.parse(ob) : null;

    useEffect(() => {

        const init = async () => {
            try{
                if(userToCall){
                    const socketId = await getSocketId(userToCall._id || '', onlineUsers);
                    if(socketId){
                        socket.emit('dial', {to: socketId, from: currentUser, isVideo});
                    }
                    callRingtone.loop = true;
                    callRingtone.play();

                    socket.once(SocketEvents.CALL_END , () => {
                        receiveCallEnd();
                    });

                    socket.once(SocketEvents.CALL_ACCEPTED, () => {
                        onCallAccepted();
                    });
                } 
            }
            catch(err){
                console.error(err);
            }
        };

        init();

        return () => {
            callRingtone.load();
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
        SetCallState('Call Ended.');
        const socketId = await getSocketId(userToCall._id || '', onlineUsers);
        if(socketId)
        socket.emit('cancelCall', socketId);

        setTimeout(() => {
            onCallEnd();
        }, 1000);
    }

    return (
        <React.Fragment>
            <Box display="flex" flexDirection="column" alignItems="center"
                justifyContent="center" height="100%">
                {userToCall &&
                    <Paper elevation={3} className={classes.paper}>
                        <Box className={clsx('circle', classes.rippleAnimation)}>
                            <Avatar src={userToCall.avatar ? `${baseURL}/files/${userToCall.avatar}` : userAvatar}
                                alt="userToCall" className={clsx(classes.lgAvatar)} />
                        </Box>
                        <Typography component="div" variant="h5" className="bg-text-primary" gutterBottom>
                            {userToCall?.name}
                        </Typography>
                        <Typography component="span" variant="body2" color="textSecondary" className={classes.mb}>
                            {callState}
                        </Typography>
                        <IconButton style={{ backgroundColor: '#f50057', color: '#fff' }}
                            onClick={CallEndHandler}>
                            <CallEnd />
                        </IconButton>
                    </Paper>
                }
            </Box>

            <Box className={classes.header}>
                {
                    userToCall && <>
                        <Tooltip title={currentUser.name}>
                            <Avatar src={currentUser.avatar ? `${baseURL}/files/${currentUser.avatar}` : userAvatar}
                                alt="mine" className={classes.mr} />
                        </Tooltip>

                        <Tooltip title={userToCall?.name}>
                            <Avatar src={userToCall.avatar ? `${baseURL}/files/${userToCall.avatar}` : userAvatar}
                                alt="userToCall" />
                        </Tooltip>
                    </>
                }
            </Box>
        </React.Fragment>
    )
}

export default Dial;
