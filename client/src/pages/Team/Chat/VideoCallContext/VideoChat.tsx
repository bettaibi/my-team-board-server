import React, { useRef, useEffect } from 'react';
import {
    Box,
    makeStyles,
    Theme,
    Tooltip,
    Avatar
} from '@material-ui/core';
import {
    CallEnd,
    MicOffOutlined,
    MicNoneOutlined,
    VideocamOffOutlined,
    VideocamOutlined,
    StopScreenShareOutlined,
    ScreenShareOutlined,
} from '@material-ui/icons';
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@material-ui/lab';
import useToggle from '../../../../hooks/useToggle';
import { useVideoCallContext } from '.';
import { UserModel } from '../../../../models/app.model';

import userAvatar from '../../../../assets/avatars/profile.jpg';
import { SocketEvents, useSocketContext } from '../../../../context/SocketContext';
import { getSocketId } from '../helpers';

const baseURL = process.env.REACT_APP_BASE_URL;

const useStyle = makeStyles((theme: Theme) => ({
    videoPartner: {
        width: '100%',
        height: 'auto',
        [theme.breakpoints.down('xs')]: {
            height: '100vh'
        },
    },
    mr: {
        marginRight: theme.spacing(1)
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

const VideoChat = ({ currentUser }: { currentUser: UserModel }) => {

    const classes = useStyle();
    const { onCallEnd, caller } = useVideoCallContext();
    const { socket, onlineUsers } = useSocketContext();

    const partnerRefStream = useRef<HTMLVideoElement>(null);
    const myVideoRefStream = useRef<HTMLVideoElement>(null);

    const userToCall: UserModel = JSON.parse(sessionStorage.getItem('userToCall') || '') || null;

    let stream: any;

    useEffect(() => {
        socket.on(SocketEvents.CALL_END, () => {
            onCallEnd();
        });

        return () => {
            socket.off(SocketEvents.CALL_END);
        }
    }, []);

    useEffect(() => {
        loadMedia();

        return () => {
            try {
                if (stream) {
                    const tracks = stream.getTracks();
                    tracks.forEach(function (track: any) {
                        track.stop();
                    });
                }
            }
            catch (err) {
                console.error(err);
            }
        }
    }, []);

    async function loadMedia() {
        try {
            stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
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

    function onVideoOff() {
        try {
            stream.getVideoTracks()[0].enabled = !(stream.getVideoTracks()[0].enabled);
        }
        catch (err) {
            console.error(err.message);
        }
    }

    function onSwitchMic() {
        try {
            stream.getAudioTracks()[0].enabled = !(stream.getAudioTracks()[0].enabled);
        }
        catch (err) {
            console.error(err.message);
        }
    }

    async function onShareScreen() {
        try {
            // @ts-ignore
            stream = await navigator.mediaDevices.getDisplayMedia({
                video: {
                    cursor: "always"
                },
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true,
                    sampleRate: 44100
                }
            });
            if (partnerRefStream.current) {
                partnerRefStream.current.srcObject = stream;
                partnerRefStream.current.play();
            }
        }
        catch (err) {
            console.error(err.message);
        }
    }

    async function onCallEnded() {
        try {
            if (caller._id == currentUser._id) {
                const socketId = await getSocketId(userToCall._id || '', onlineUsers);
                if (socketId)
                socket.emit('cancelCall', socketId);
            }
            else {
                const socketId = await getSocketId(caller._id || '', onlineUsers);
                if (socketId)
                socket.emit('cancelCall', socketId);
            }
            onCallEnd();
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
            <MenuActionButtons onVideoOff={onVideoOff} onSwitchMic={onSwitchMic}
                onCallEnded={onCallEnded} onShareScreen={onShareScreen} />

            <Box className={classes.header}>
                <Tooltip title={currentUser.name}>
                    <Avatar src={currentUser.avatar ? `${baseURL}/files/${currentUser.avatar}` : userAvatar}
                        alt="mine" className={classes.mr} />
                </Tooltip>
                <>
                    {
                        caller.name ?
                            <Tooltip title={caller?.name}>
                                <Avatar src={caller.avatar ? `${baseURL}/files/${caller.avatar}` : userAvatar}
                                    alt="userToCall" />
                            </Tooltip>
                            : <Tooltip title={userToCall?.name}>
                                <Avatar src={userToCall.avatar ? `${baseURL}/files/${userToCall.avatar}` : userAvatar}
                                    alt="userToCall" />
                            </Tooltip>
                    }
                </>
            </Box>
        </Box>
    )
};

interface MenuActionsProps {
    onSwitchMic: () => void;
    onShareScreen: () => void;
    onVideoOff: () => void;
    onCallEnded: () => void;
}
const MenuActionButtons: React.FC<MenuActionsProps> = ({ onSwitchMic, onShareScreen, onCallEnded, onVideoOff }) => {
    const { handleClose, handleOpen, show } = useToggle();
    const classes = useStyle();
    const [actions, setActions] = React.useState(
        [
            { icon: <CallEnd />, name: 'End Call', index: 1, isOn: true },
            { icon: <MicNoneOutlined />, name: 'Mute', index: 2, iconOff: <MicOffOutlined />, isOn: true },
            { icon: <VideocamOutlined />, name: 'Video Camera Off', index: 3, iconOff: <VideocamOffOutlined />, isOn: true },
            { icon: <ScreenShareOutlined />, name: 'Share Screen', index: 4, iconOff: <StopScreenShareOutlined />, isOn: true }
        ]
    );

    function switchIcon(index: number): void {
        setActions([...actions.map((item: any) => item.index != index ? item : { ...item, isOn: !item.isOn })]);
    }

    function actionHandler(index: number): void {
        switch (index) {
            case 1: onCallEnded(); break;
            case 2: onSwitchMic(); switchIcon(index); break;
            case 3: onVideoOff(); switchIcon(index); break;
            case 4: onShareScreen(); switchIcon(index); break;
        }
    }

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
                        icon={action.isOn ? action.icon : action.iconOff}
                        tooltipTitle={action.name}
                        onClick={() => actionHandler(action.index)}
                    />
                ))}
            </SpeedDial>
        </React.Fragment>
    )
}

export default VideoChat;
