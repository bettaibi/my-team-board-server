import React, { useRef, useEffect } from 'react';
import {
    IconButton,
    Avatar,
    Typography,
    Box,
    Paper,
    makeStyles,
    Theme
} from '@material-ui/core';
import {
    CallEnd,
    MicOff,
    VideocamOffOutlined,
    ScreenShareOutlined,

} from '@material-ui/icons';
import clsx from 'clsx';
import stream from 'stream';
import { SpeedDial, SpeedDialAction, SpeedDialIcon, SpeedDialProps } from '@material-ui/lab';
import useToggle from '../../../../hooks/useToggle';

const useStyle = makeStyles((theme: Theme) => ({
    videoPartner: {
        width: '100%',
        height: 'auto',
        [theme.breakpoints.down('xs')]: {
            height: '100vh'
        },
    },
    myVideoContainer: {
        width: theme.spacing(12),
        height: theme.spacing(12),
        borderRadius: '50%',
        position: 'absolute',
        bottom: theme.spacing(4),
        right: theme.spacing(1),
        border: '2px solid #fff',
        padding: '5px',
        overflow: 'hidden'
    },
    myVideo: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        borderRadius: '50%',
    },
    speedDial: {
        position: 'absolute',
        bottom: theme.spacing(18),
        right: theme.spacing(2.5),
    },
}));

const VideoChat = () => {
    const classes = useStyle();
    const partnerRefStream = useRef<HTMLVideoElement>(null);
    const myVideoRefStream = useRef<HTMLVideoElement>(null);
    let stream: any;

    useEffect(() => {
        loadMedia();

        return () => {
            try {
                if (stream) {
                    var track = stream?.getTracks()[0];
                    track.stop();
                }
            }
            catch (err) {
                console.error(err);
            }
        }
    }, []);

    async function loadMedia() {
        try {
            stream = await navigator.mediaDevices.getUserMedia({ audio: false, video: true });
            if (partnerRefStream.current && myVideoRefStream.current) {
                partnerRefStream.current.srcObject = stream;
                partnerRefStream.current.play();
                myVideoRefStream.current.srcObject = stream;
                myVideoRefStream.current.play();
            }
        }
        catch (err) {
            console.error(err.message);
        }
    }

    return (
        <Box width="100%" height="100vh" position="relative">
            <video ref={partnerRefStream} className={classes.videoPartner} autoPlay />

            <Box className={classes.myVideoContainer}>
                <video className={classes.myVideo} ref={myVideoRefStream} autoPlay />
            </Box>
            <MenuActionButtons />
        </Box>
    )
};

const MenuActionButtons = () => {
    const { handleClose, handleOpen, show } = useToggle();
    const classes = useStyle();

    const actions = [
        { icon: <CallEnd />, name: 'End Call' },
        { icon: <MicOff />, name: 'Mute' },
        { icon: <VideocamOffOutlined />, name: 'Video Camera Off' },
        { icon: <ScreenShareOutlined />, name: 'Share Screen' }
    ];

    return (
        <React.Fragment>
            <SpeedDial
                ariaLabel="SpeedDial openIcon example"
                className={classes.speedDial}
                hidden={false}
                icon={<SpeedDialIcon />}
                onClose={handleClose}
                onOpen={handleOpen}
                open={show}
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        onClick={handleClose}
                    />
                ))}
            </SpeedDial>
        </React.Fragment>
    )
}

export default VideoChat;
