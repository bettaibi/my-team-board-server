import React, {useEffect} from 'react';
import {
    IconButton,
    Avatar,
    Typography,
    Box,
    Paper,
    makeStyles,
    Theme
} from '@material-ui/core';
import { CallEnd } from '@material-ui/icons';
import { UserModel } from '../../../../models/app.model';
import { useVideoCallContext } from '.';
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
}));


const Dial = ({userToCall}: {userToCall: UserModel}) => {
    const classes = useStyle();
    const { onCallEnd } = useVideoCallContext();
    const [callState, SetCallState] = React.useState<string>('Dialing...');
    const callRingtone = new Audio('/audio/caller.mp3');

    useEffect(() => {
        callRingtone.loop = true;
        callRingtone.play();

        return () => {
            callRingtone.pause();
            callRingtone.currentTime = 0;
        }
    }, []);

    async function CallEndHandler(){
        SetCallState('Call Ended.')
        setTimeout(() => {
            onCallEnd();
        }, 1000);
    }

    return (
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
                    <IconButton style={{backgroundColor: '#f50057', color: '#fff'}}
                    onClick={CallEndHandler}>
                        <CallEnd />
                    </IconButton>
                </Paper>
             }
        </Box>
    )
}

export default Dial;
