import React, { useRef, useEffect } from 'react';
import {
    Box,
    makeStyles,
    Theme,
    Tooltip,
    Avatar,
    Typography
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
import { getSocketId } from '../../../../util/helpers';
import Peer from "simple-peer";
import posterImg from '../../../../assets/chat/poster.jpg';

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
    counter: {
        position: 'absolute',
        top: theme.spacing(8),
        width: '100%',
        color: 'white',
        [theme.breakpoints.down('xs')]: {
            color: '#1E293B',
            top: theme.spacing(10),
        },
    },
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

            if (initiator === false) {
                socket.emit('onCallAccepted', to);
            }

            myPeer = new Peer({ initiator: initiator, stream: st, trickle: false });
            myPeer.on('signal', data => {
                socket.emit('receiveSignal', { to: to, dataSignal: data });
            });

            myPeer.on('stream', stream => {
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

            myPeer.on('error', (err)=>{
                onCallEnded();
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
            let screenStream = await navigator.mediaDevices.getDisplayMedia({cursor: true});

            if (myVideoRefStream.current) {
                myPeer.replaceTrack(stream.getVideoTracks()[0], screenStream.getVideoTracks()[0], stream)
                myVideoRefStream.current.srcObject = screenStream
               
                screenStream.getTracks()[0].onended = () =>{
                    if(myVideoRefStream.current){
                        myPeer.replaceTrack(screenStream.getVideoTracks()[0], stream.getVideoTracks()[0], stream)
                        myVideoRefStream.current.srcObject=stream
                    }
                }
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
                    <video ref={partnerRefStream} className={classes.videoPartner} 
                    autoPlay playsInline />

                    <Box className={classes.myVideoContainer}>
                        <video className={classes.myVideo} ref={myVideoRefStream} muted autoPlay />
                    </Box>
                </React.Fragment>
            )
        }
        else {
            return (
                <React.Fragment>
                    <Box className={classes.counter} display="flex" flexDirection="column"
                        alignItems="center" justifyContent="center" textAlign="center">
                        <Typography component="span" variant="subtitle1" gutterBottom>
                            Incoming call...
                        </Typography>
                        <TimeCounter />
                    </Box>
                    <video ref={partnerRefStream} className={classes.videoPartner}
                        autoPlay poster={posterImg} playsInline />

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
            { icon: <ScreenShareOutlined />, name: 'Share Screen', index: 4, iconOff: <StopScreenShareOutlined />, isOn: false }
        ]
    );

    React.useEffect(() => {
        if (!isVideo) {
            setActions([
                { icon: <CallEnd />, name: 'End Call', index: 1, isOn: true },
                { icon: <MicNoneOutlined />, name: 'Mute', index: 2, iconOff: <MicOffOutlined />, isOn: true },
                { icon: <ScreenShareOutlined />, name: 'Share Screen', index: 4, iconOff: <StopScreenShareOutlined />, isOn: false }
            ]);
        }
    }, [])

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

interface TimeConterProps{
    seconds: number;
    minutes: number;
    hours: number;
}
const TimeCounter = () => {
    const [time, setTime] = React.useState<TimeConterProps>({seconds: 0, minutes: 0, hours: 0});

    React.useEffect(() => {
        let interval = setInterval( () => {
            
            if(time.seconds < 59){
                setTime(state => {return {...state, seconds: state.seconds + 1}});
            }
            else if( time.minutes < 59){
                setTime(state => {return {...state, seconds: 0, minutes: state.minutes + 1}});
            }
            else{
                setTime(state => {return {hours: state.hours + 1, seconds: 0, minutes: 0}});
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [time]);

    return (
        <span>
            {`${time.hours} : ${time.minutes} : ${time.seconds}`}
        </span>
    )
};

export default VideoChat;
