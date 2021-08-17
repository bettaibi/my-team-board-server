import React from 'react';
import {
    Box,
    Typography,
    Container,
    makeStyles,
    Theme,
    Tooltip,
    Avatar
} from '@material-ui/core';
import { UserModel } from '../../../../models/app.model';
import { useSharedContext } from '../../../../context';
import Dial from './Dial';
import AnswerCall from './AnswerCall';
import VideoChat from './VideoChat';

import userAvatar from '../../../../assets/avatars/profile.jpg';

const baseURL = process.env.REACT_APP_BASE_URL;

const useStyle = makeStyles((theme: Theme) => ({
    root: {
        backgroundColor: '#fff',
        width: '100%',
        height: '100vh',
        overflow: 'hidden'
    },
    BoxContainer: {
        backgroundColor: '#f1f5f9',
        height: '100%',
        position: 'relative',
        padding: '0 !important',
    },
    footer: {
        position: 'absolute',
        bottom: theme.spacing(1),
        transform: 'translate(-50%, 0)',
        left: '50%',
        width: '100%',
        textAlign: 'center',
    },
    mr:{
        marginRight: theme.spacing(1)
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
}))

const VideoCallContainer = () => {
    const classes = useStyle();
    const userToCall: UserModel = JSON.parse(sessionStorage.getItem('userToCall') || '') || null;
    const { currentUser } = useSharedContext();

    return (
       <Box className={classes.root}>
            <Container maxWidth="md" className={classes.BoxContainer}>
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

                {/* <Dial userToCall = {userToCall} /> */}
                {/* <AnswerCall UserToAnswer = {currentUser} /> */}
                <VideoChat />

                 <Box className={classes.footer}>
                    <Typography component="span" variant="body2" color="textSecondary">
                            Created by Nidhal Bettaibi
                    </Typography>
                 </Box>
            </Container>
       </Box>
    )
}

export default VideoCallContainer;
