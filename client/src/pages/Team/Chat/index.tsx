import React, { useRef } from 'react';
import {
    Box,
    makeStyles,
    Theme,
    Avatar,
    Typography,
    IconButton,
    InputBase,
    Tooltip,
    Divider
} from '@material-ui/core';
import {
    InfoOutlined,
    CropOriginal,
    AttachFile,
    SendOutlined,
    SentimentVerySatisfiedOutlined,
    PhoneOutlined,
    VideoCallOutlined,
    DescriptionOutlined
} from '@material-ui/icons';
import userAvatar from '../../../assets/avatars/Henderson.jpg';
import { Picker } from 'emoji-mart';
import useToggle from '../../../hooks/useToggle';
import "./chat.css";
import useSidenav from '../../../hooks/useSidenav';

const useStyles = makeStyles((theme: Theme) => ({
    iconColor: {
        color: '#64748B'
    },
    mr: {
        marginRight: theme.spacing(0.5)
    },
    bgLightBlue: {
        backgroundColor: "#f1f5f9"
    },
    fileAttachment: {
        cursor: "pointer",
        '&:hover': {
            backgroundColor: "#eee"
        }
    }

}));

const Chat = () => {
    const classes = useStyles();

    return (
        <Box display='flex' flexDirection="column" height="calc(100vh - 56px)" position="relative">

            <Box flexGrow={1} >
                <Box boxShadow="0 .125rem .25rem rgba(0,0,0,.075)" p={2} display='flex' flexDirection="row" className={classes.bgLightBlue}
                    alignItems="center" justifyContent="space-between" position="sticky" top={0} zIndex={999999999} >

                    <Box display="flex" flexDirection="row" alignItems="center" justifyContent="start">
                        <Avatar src={userAvatar} alt="user" />
                        <Box display="flex" flexDirection="column" ml={1}>
                            <Typography variant="subtitle2" className="bg-text-primary">
                                Nidhal Bettaibi
                            </Typography>
                            <small className="bg-text-secondary">2 hours ago</small>
                        </Box>
                    </Box>
                    <Box>
                    <ChatDetails />
                    </Box>
                </Box>
                <Box className="bg-white" p={2} display="flex" flexDirection="Column">
                    <Messages />
                </Box>
            </Box>

            <Box style={{ padding: '0.5rem 1rem' }} className="bg-white" position="sticky" bottom={0}>
                <MessageEditor />
            </Box>
        </Box>
    )
}


const MessageEditor = () => {
    const classes = useStyles();
    const { show, toggle: toggleImoji } = useToggle();
    let fileRef = useRef<any>();
    let imageRef = useRef<any>();

    function displayEmoji(emoji: any) {
        console.log(emoji);
        toggleImoji();
    }

    return (
        <Box borderRadius={5} border="1px solid lightgray" overflow="hidden">
            <Box p={1}>
                <InputBase
                    multiline
                    rowsMax={3}
                    fullWidth
                    placeholder="enter your message right here.."
                    inputProps={{ 'aria-label': 'naked' }} />
            </Box>
            <Box className={classes.bgLightBlue} borderTop="1px solid lightgray" p={1} display="flex" flexDirection="row" alignItems="center" justifyContent="space-between">
                <div>
                    {show && <Picker set='twitter' onSelect={(emoji) => displayEmoji(emoji)}
                        style={{ position: 'absolute', bottom: '60px', left: '1.5rem', zIndex: 99999, width: '280px' }} />
                    }

                    <IconButton className={classes.mr} size="small" onClick={toggleImoji}>
                        <SentimentVerySatisfiedOutlined className={classes.iconColor} />
                    </IconButton>

                    <React.Fragment>
                        <Tooltip title="send images">
                            <IconButton className={classes.mr} size="small" onClick={() => imageRef.current.click()}>
                                <CropOriginal className={classes.iconColor} />
                            </IconButton>
                        </Tooltip>
                        <input ref={imageRef} hidden multiple accept="image/*" type="file" />
                    </React.Fragment>

                    <React.Fragment>
                        <Tooltip title="send attachments">
                            <IconButton className={classes.mr} size="small" onClick={() => fileRef.current.click()}>
                                <AttachFile className={classes.iconColor} />
                            </IconButton>
                        </Tooltip>
                        <input ref={fileRef} hidden type="file" />
                    </React.Fragment>
                </div>
                <div style={{ display: 'flex' }}>
                    <Tooltip title="audio call">
                        <IconButton className={classes.mr} size="small">
                            <PhoneOutlined className={classes.iconColor} />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="video call">
                        <IconButton size="small">
                            <VideoCallOutlined className={classes.iconColor} />
                        </IconButton>
                    </Tooltip>
                    <Divider orientation="vertical" flexItem style={{ margin: '0 0.6rem', width: '2px' }} />
                    <Tooltip title="send">
                        <IconButton size="small">
                            <SendOutlined className={classes.iconColor} />
                        </IconButton>
                    </Tooltip>
                </div>
            </Box>
        </Box>
    )
};

const Messages = () => {

    return (
        <React.Fragment>
            <div className="mine messages">
                <div className="message">
                    Dude
                </div>
                <div className="message last">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </div>
                <small style={{ marginRight: '0.5rem' }} className="bg-text-secondary">11:02</small>
            </div>
            <div className="yours messages">
                <div className="message">
                    Hey!
                </div>
                <div className="message">
                    You there?
                </div>
                <FileAttachment />
                <div className="message last">
                    Hello, how's it going?
                </div>
                {/* <small style={{marginLeft:'0.5rem'}} className="bg-text-secondary">11:02</small> */}
            </div>
            <div className="mine messages">
                <div className="message">
                    Great thanks!
                </div>
                <div className="message last">
                    How about you?
                </div>
                <small style={{ marginLeft: '0.5rem' }} className="bg-text-secondary">11:02</small>
            </div>
        </React.Fragment>
    );
};

const FileAttachment = () => {
    const classes = useStyles();

    return (
        <Box display="flex" flexDirection="row" alignItems="center" minWidth="260px"
            border="1px solid lightgray" p={2} m={1} borderRadius={5} className={classes.fileAttachment}>
            <DescriptionOutlined fontSize="large" className={classes.iconColor} />
            <Box mx={1}>
                <Typography variant="subtitle2" className="bg-text-primary"> File name here</Typography>
                <span className="bg-text-secondary">Sent At: 14 sep 14:25</span>
            </Box>
        </Box>
    )
}

const ChatDetails = () => {
    const classes = useStyles();
    const { SidenavComponent, onSidenavClose, onSidenavOpen } = useSidenav('right', 'persistent');

    return (
        <React.Fragment>
            <IconButton onClick={onSidenavOpen}>
                <InfoOutlined className={classes.iconColor} />
            </IconButton>

            <SidenavComponent>
                <Box mt="50px">
                    kdsjfklj sdkfklsdf sdkfjdsk
                    <button onClick={onSidenavClose}>close</button>
                </Box>
            </SidenavComponent>
        </React.Fragment>
    )
}

export default Chat;
