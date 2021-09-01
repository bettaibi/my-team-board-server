import React from 'react';
import {
    Box,
    Typography,
    Container,
    makeStyles,
    Theme
} from '@material-ui/core';
import { useSharedContext } from '../../../../context';
import Dial from './Dial';
import AnswerCall from './AnswerCall';
import VideoChat from './VideoChat';

import { ComponentSeverity } from '.';


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

interface VideoCallContainerProps{
    currentComponent: ComponentSeverity;
}
const VideoCallContainer: React.FC<VideoCallContainerProps> = ({currentComponent}) => {
    const { currentUser } = useSharedContext();
    const [activeComponent, setActiveComponent] = React.useState<ComponentSeverity>(currentComponent);
    const classes = useStyle();

    const onCallAccepted = () => {
        setActiveComponent('videoChat');
    };

    return (
       <Box className={classes.root}>
            <Container maxWidth="md" className={classes.BoxContainer}>

               {activeComponent === 'dial' && <Dial  currentUser = {currentUser} onCallAccepted = {onCallAccepted} />}
               {activeComponent === 'answer' && <AnswerCall currentUser = {currentUser} onCallAccepted = {onCallAccepted} />}
               {activeComponent === 'videoChat' && <VideoChat currentUser = {currentUser} />}

                 <Box className={classes.footer}>
                    <Typography component="span" variant="body2" style={{color:'#ccc'}}>
                            Created by Nidhal Bettaibi
                    </Typography>
                 </Box>
            </Container>
       </Box>
    )
}

export default VideoCallContainer;
