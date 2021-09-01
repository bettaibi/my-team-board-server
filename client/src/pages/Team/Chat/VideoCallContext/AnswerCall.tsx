import React, { useEffect, useRef } from 'react';
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
import { getSocketId } from '../../../../util/helpers';
import {Howl} from 'howler'
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

const callRingtone = new Howl({
    src: '/audio/app_call.mp3',
    loop: true,
    preload: true
  })

const AnswerCall = ({ currentUser, onCallAccepted }: { currentUser: UserModel, onCallAccepted: () => void }) => {

    const classes = useStyle();
    const { onCallEnd, caller: UserToAnswer } = useVideoCallContext();
    const { socket, onlineUsers } = useSocketContext();
    const [callState, SetCallState] = React.useState<string>('Calling...');
    const audioRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        var timer: NodeJS.Timeout;
        const init = async () => {
            try{
                timer = setTimeout(() =>{
                    audioRef.current?.click();
                },1000);

                socket.once(SocketEvents.CALL_END , ()=> {
                    receiveCallEnd();
                });
            }
            catch(err){
                console.error(err);
            }
        };

        init();

        return () => {
            callRingtone.stop();
            clearTimeout(timer);
            socket.off(SocketEvents.CALL_END);
        }
    }, []);

    function audionHandler(){
        callRingtone.play();
    }

    function receiveCallEnd (){
        SetCallState('Call Ended.');
        setTimeout(() => {
            onCallEnd();
        }, 1000);
    }

    async function CallEndHandler() {
       try{
        SetCallState('Call Ended.')
        const socketId = await getSocketId(UserToAnswer._id || '', onlineUsers);
        if(socketId)
        socket.emit('cancelCall', socketId);

        setTimeout(() => {
            onCallEnd();
        }, 1000);
       }
       catch(err){
           throw err;
       }
    }

    async function CallAcceptedHandler(){
       try{            
            onCallAccepted();
       }
       catch(err){
           console.error(err)
       }
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
                            <button hidden ref={audioRef} onClick={audionHandler}></button>

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
