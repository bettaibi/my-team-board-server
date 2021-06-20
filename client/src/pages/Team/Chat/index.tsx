import React from 'react';
import {
    Box,
    makeStyles,
    Theme,
    Avatar,
    Typography,
    IconButton,
    InputBase,
    Tooltip
} from '@material-ui/core';
import {
    InfoOutlined,
    CropOriginal,
    AttachFile,
    SentimentDissatisfiedOutlined,
    SendOutlined
} from '@material-ui/icons';
import clsx from 'clsx';
import userAvatar from '../../../assets/avatars/Henderson.jpg';
import { Picker } from 'emoji-mart';

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
    flexGrow: {
        flexGrow: 1
    }
}));

const Chat = () => {
    const classes = useStyles();

    return (
        <Box display='flex' flexDirection="column" height="calc(100vh - 56px)">
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
            <Box p={2} flexGrow={1} className="bg-white" overflow="auto">
                dslldsl
                lorem*50
            </Box>
            <Box style={{ padding: '0.5rem 1rem' }} className="bg-white">
                <MessageEditor />
            </Box>
        </Box>
    )
}


const MessageEditor = () => {
    const classes = useStyles();

    return (
        <Box borderRadius={5} border="1px solid lightgray" overflow="hidden">
            <Box p={1}>
                <InputBase
                    multiline
                    rowsMax={3}
                    fullWidth
                    placeholder="enter a message here.."
                    inputProps={{ 'aria-label': 'naked' }} />
            </Box>
            <Box className={classes.bgLightBlue} borderTop="1px solid lightgray" p={1} display="flex" flexDirection="row" alignItems="center" justifyContent="space-between">
                <div>
                    <Picker set='apple'
                    style={{ position: 'absolute', bottom: '60px', left: '1.5rem', zIndex: 99999,  width: '280px' }} />
                    <IconButton className={classes.mr} size="small">
                        <SentimentDissatisfiedOutlined className={classes.iconColor} />
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
                <Tooltip title="send">
                    <IconButton className={classes.mr} size="small">
                        <SendOutlined className={classes.iconColor} />
                    </IconButton>
                </Tooltip>
            </Box>
        </Box>
    )
};

export default Chat;
