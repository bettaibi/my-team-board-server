import React, { useRef, useEffect } from 'react';
import {
    Box,
    makeStyles,
    Theme,
    Tooltip,
    Avatar,
    Typography,
    Paper,
    IconButton
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
import Peer from "simple-peer";
import clsx from 'clsx';

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
    mt: {
        marginTop: theme.spacing(1)
    },
    lgAvatar: {
        width: theme.spacing(11),
        height: theme.spacing(11),
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
    },
    audioPartner: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
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
    buttonIcons: {
        backgroundColor: '#f5f4f4'
    }
}));

const VideoChat = React.memo(({ currentUser }: { currentUser: UserModel }) => {

    const classes = useStyle();
    const { onCallEnd, caller, isVideo } = useVideoCallContext();
    const { socket, onlineUsers } = useSocketContext();

    let ob = sessionStorage.getItem('userToCall');
    const userToCall: UserModel = ob ? JSON.parse(ob) : null;

    const partnerRefStream = useRef<HTMLVideoElement>(null);
    const myVideoRefStream = useRef<HTMLVideoElement>(null);

    const myPartner = React.useMemo(() => {
        return caller.hasOwnProperty('_id') ? caller : userToCall;
    }, [currentUser, caller]);

    const socketId = React.useMemo(async () => {
        return await getSocketId(myPartner._id || '', onlineUsers);
    }, [])

    let stream: any;
    let myPeer: Peer.Instance;

    useEffect(() => {
        socket.once(SocketEvents.CALL_END, () => {
            onCallEnd();
        });

        socket.once(SocketEvents.EMIT_SIGNAL, (dataSignal: Peer.SignalData) => {
            console.log("handshake has been succesfully done")
            myPeer.signal(dataSignal);
        });

        return () => {
            socket.off(SocketEvents.CALL_END);
            socket.off(SocketEvents.EMIT_SIGNAL);
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

                    if (myPeer) {
                        myPeer.destroy();
                    }
                }
            }
            catch (err) {
                console.error(err);
            }
        }
    }, []);

    function loadMedia() {
        if (navigator.mediaDevices === undefined) {
            navigator.getUserMedia({
                video: isVideo,
                audio: true
            }, gotMedia, (err) => { console.error(err) });
        }
        else {
            navigator.mediaDevices.getUserMedia({
                video: isVideo,
                audio: true
            }).then(gotMedia).catch((err) => { console.error(err) });
        }
    }

    async function gotMedia(st: MediaStream) {
        try {
            if (isVideo && myVideoRefStream.current) {
                if ("srcObject" in myVideoRefStream.current) {
                    myVideoRefStream.current.srcObject = st;
                } else {
                    // Avoid using this in new browsers, as it is going away.
                    // @ts-ignore
                    myVideoRefStream.current.src = window.URL.createObjectURL(st);
                }
                myVideoRefStream.current.onloadedmetadata = function (e) {
                    myVideoRefStream.current?.play();
                };
            }
            stream = st;
            const initiator = !caller.hasOwnProperty('_id');
            let to = await socketId;

            myPeer = new Peer({ initiator: initiator, stream: st, trickle: false });
            myPeer.on('signal', data => {
                socket.emit('receiveSignal', { to: to, dataSignal: data });
            });

            myPeer.on('stream', stream => {
                console.log("Stream has been recieved");
                if (partnerRefStream.current) {
                    if ("srcObject" in partnerRefStream.current) {
                        partnerRefStream.current.srcObject = stream;
                    } else {
                        // Avoid using this in new browsers, as it is going away.
                        // @ts-ignore
                        partnerRefStream.current.src = window.URL.createObjectURL(stream);
                    }
                    partnerRefStream.current.onloadedmetadata = function (e) {
                        partnerRefStream.current?.play();
                    };
                }
            });
        }
        catch (err) {
            throw err;
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
            const to = await socketId;
            if (to)
                socket.emit('cancelCall', to);

            setTimeout(() => {
                onCallEnd();
            }, 0);
        }
        catch (err) {
            console.error(err.message);
        }
    }

    function callContent(): JSX.Element {
        if (isVideo) {
            return (
                <React.Fragment>
                    <video ref={partnerRefStream} className={classes.videoPartner} autoPlay />

                    <Box className={classes.myVideoContainer}>
                        <video className={classes.myVideo} ref={myVideoRefStream} muted autoPlay />
                    </Box>

                </React.Fragment>
            )
        }
        else {
            return (
                <React.Fragment>
                    <video ref={partnerRefStream} className={classes.videoPartner} autoPlay />
                    <Box width="100%" height="100%" display="flex" className={classes.audioPartner}
                        flexDirection="column" alignItems="center" justifyContent="center">
                        <Paper elevation={3} className={classes.paper}>
                            <Avatar src={myPartner.avatar ? `${baseURL}/files/${myPartner.avatar}` : userAvatar}
                                alt="partner" className={classes.lgAvatar} />
                            <Typography component="div" variant="h5" className={clsx('bg-text-primary', classes.mt)} gutterBottom>
                                {myPartner?.name}
                            </Typography>
                            <Typography component="span" variant="body2" color="textSecondary" gutterBottom>
                                03:51
                            </Typography>
                            <Box>
                               <IconButton className={clsx(classes.mr, classes.buttonIcons)}
                                    onClick={onSwitchMic}>
                                    <MicNoneOutlined />
                                </IconButton>

                                <IconButton className={clsx(classes.mr, classes.buttonIcons)}
                                    onClick={onShareScreen}>
                                    <ScreenShareOutlined />
                                </IconButton>

                                <IconButton className={classes.buttonIcons}
                                    onClick={onCallEnded}>
                                    <CallEnd />
                                </IconButton>
                            </Box>
                        </Paper>
                    </Box>
                </React.Fragment>
            )
        }
    }

    return (
        <Box width="100%" height="100vh" position="relative">
            {callContent()}

            <MenuActionButtons onVideoOff={onVideoOff} onSwitchMic={onSwitchMic}
                onCallEnded={onCallEnded} onShareScreen={onShareScreen} isVideo={isVideo} />

            <Box className={classes.header}>
                <Tooltip title={currentUser.name}>
                    <Avatar src={currentUser.avatar ? `${baseURL}/files/${currentUser.avatar}` : userAvatar}
                        alt="mine" className={classes.mr} />
                </Tooltip>
                <Tooltip title={myPartner?.name}>
                    <Avatar src={myPartner.avatar ? `${baseURL}/files/${myPartner.avatar}` : userAvatar}
                        alt="userToCall" />
                </Tooltip>
            </Box>
        </Box>
    )
});

interface MenuActionsProps {
    onSwitchMic: () => void;
    onShareScreen: () => void;
    onVideoOff: () => void;
    onCallEnded: () => void;
    isVideo: boolean;
}
const MenuActionButtons: React.FC<MenuActionsProps> = ({ onSwitchMic, onShareScreen, onCallEnded, onVideoOff, isVideo }) => {
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

    React.useEffect(() => {
        if (!isVideo) {
            setActions([
                { icon: <CallEnd />, name: 'End Call', index: 1, isOn: true },
                { icon: <MicNoneOutlined />, name: 'Mute', index: 2, iconOff: <MicOffOutlined />, isOn: true },
                { icon: <ScreenShareOutlined />, name: 'Share Screen', index: 4, iconOff: <StopScreenShareOutlined />, isOn: true }
            ]);
        }
    }, []);

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
                        key={action.index}
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
