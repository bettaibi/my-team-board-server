import React from 'react';
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
    VideoCallOutlined
} from '@material-ui/icons';
import userAvatar from '../../../assets/avatars/Henderson.jpg';
import { Picker } from 'emoji-mart';
import useToggle from '../../../hooks/useToggle';
import "./chat.css";

const useStyles = makeStyles((theme: Theme) => ({
    iconColor: {
        color: '#64748B'
    },
    mr: {
        marginRight: theme.spacing(0.5)
    },
    bgLightBlue: {
        backgroundColor: "#f1f5f9"
    }

}));

const Chat = () => {
    const classes = useStyles();

    return (
        <Box display='flex' flexDirection="column" height="calc(100vh - 56px)" position="relative">
            <Box p={2} borderBottom="1px solid lightgray" display='flex' flexDirection="row"
                alignItems="center" justifyContent="space-between">

                <Box display="flex" flexDirection="row" alignItems="center" justifyContent="start">
                    <Avatar src={userAvatar} alt="user" />
                    <Box display="flex" flexDirection="column" ml={1}>
                        <Typography variant="subtitle2" className="bg-text-primary">
                            Nidhal Bettaibi
                        </Typography>
                        <small className="bg-text-secondary">2 hours ago</small>
                    </Box>
                </Box>
                <IconButton>
                    <InfoOutlined className={classes.iconColor} />
                </IconButton>
            </Box>
            <Box p={2} display="flex" flexDirection="Column" flexGrow={1} className="bg-white" overflow="auto">
                <Messages />
            </Box>
            <Box style={{ padding: '0.5rem 1rem' }} className="bg-white">
                <MessageEditor />
            </Box>
        </Box>
    )
}


const MessageEditor = () => {
    const classes = useStyles();
    const { show, toggle: toggleImoji } = useToggle();

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
                    <Tooltip title="send images">
                        <IconButton className={classes.mr} size="small">
                            <CropOriginal className={classes.iconColor} />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="send attachments">
                        <IconButton className={classes.mr} size="small">
                            <AttachFile className={classes.iconColor} />
                        </IconButton>
                    </Tooltip>
                </div>
                <div style={{display:'flex'}}>
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
                    <Divider orientation="vertical" flexItem style={{margin:'0 0.6rem', width:'2px'}} />
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
                <div className="message last">
                    Dude
                </div>
                <div className="message last">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut a id labore impedit natus nisi tempora voluptates maiores similique accusantium illum, sint error, dicta consequuntur voluptatum voluptatibus porro facilis. Et!
                </div>
            </div>
            <div className="yours messages">
                <div className="message">
                    Hey!
                </div>
                <div className="message">
                    You there?
                </div>
                <div className="message last">
                    Hello, how's it going?
                </div>
            </div>
            <div className="mine messages">
                <div className="message">
                    Great thanks!
                </div>
                <div className="message last">
                    How about you?
                </div>
            </div>
        </React.Fragment>
    );
};

export default Chat;
