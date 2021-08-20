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
import Peer from "simple-peer";

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

const VideoChat = React.memo(({ currentUser }: { currentUser: UserModel }) => {

    const classes = useStyle();
    const { onCallEnd, caller } = useVideoCallContext();
    const { socket, onlineUsers } = useSocketContext();

    let ob = sessionStorage.getItem('userToCall');
    const userToCall: UserModel = ob ? JSON.parse(ob) : null;

    const partnerRefStream = useRef<HTMLVideoElement>(null);
    const myVideoRefStream = useRef<HTMLVideoElement>(null);

    const myPartner = React.useMemo(() => {
       return caller.hasOwnProperty('_id') ? caller : userToCall;
    }, [currentUser, caller]);

    const socketId = React.useMemo(async() => {
        return await getSocketId(myPartner._id || '', onlineUsers);
    }, [])

    console.log(myPartner)

    let stream: any;
    let partnerPeer = new Peer();

    useEffect(() => {
        socket.on(SocketEvents.CALL_END, () => {
            onCallEnd();
        });

        socket.on(SocketEvents.EMIT_SIGNAL, (dataSignal: Peer.SignalData) => {
            console.log("handshake has been succesfully done")
            partnerPeer.signal(dataSignal);
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

                    // partnerPeer.destroy();
                }
            }
            catch (err) {
                console.error(err);
            }
        }
    }, []);

    function loadMedia() {
        navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        }).then(gotMedia).catch((err) => {console.error(err)});
    }

    async function gotMedia(st: MediaStream){
        try{
            if(myVideoRefStream.current){
                myVideoRefStream.current.srcObject = st;
                myVideoRefStream.current.play();
                stream = st;
            }
            const initiator = !caller.hasOwnProperty('_id');
            let to = await socketId;
            if(initiator) {
                let peer = new Peer({ initiator: initiator, stream: st });
                peer.on('signal', data => {
                   socket.emit('receiveSignal', {to: to, dataSignal: data});
                });
            }

            partnerPeer.on('signal', data => {
                socket.emit('receiveSignal', {to: to, dataSignal: data});
            });

            partnerPeer.on('stream', stream => {
                console.log("Stream has been recieved");
                if(partnerRefStream.current){
                    partnerRefStream.current.srcObject = stream;
                    partnerRefStream.current.play();
                }
            });
        }
        catch(err){
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

            setTimeout(()=>{
                onCallEnd();
            },0);
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
