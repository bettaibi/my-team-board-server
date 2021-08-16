import React from 'react';
import {
    Box,
    Container,
    makeStyles,
    Theme
} from '@material-ui/core';

import bgBlur from '../../../../assets/chat/bg-blur.jpg';

const useStyle = makeStyles((theme: Theme) => ({
    root: {
        backgroundColor: '#f1f5f9',
        width: '100%',
        height: '100vh'
    },
    BoxContainer: {
        backgroundImage: `url(${bgBlur})`,
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        height: '100%'
    }
}))

const VideoCallContainer = (props: any) => {
    const classes = useStyle();

    return (
       <Box className={classes.root}>
            <Container maxWidth="md" className={classes.BoxContainer}>
                dskkdsfkds
            </Container>
       </Box>
    )
}

export default VideoCallContainer;
