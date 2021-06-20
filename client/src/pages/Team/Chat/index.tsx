import React from 'react';
import {
    Box,
    makeStyles,
    Theme,
    Avatar,
    Typography,
    IconButton,

} from '@material-ui/core';
import {
 InfoOutlined,
 CropOriginal,
 AttachFile,
 SentimentDissatisfiedOutlined
} from '@material-ui/icons';
import clsx from 'clsx';
import userAvatar from '../../../assets/avatars/Henderson.jpg';

const useStyles = makeStyles((theme: Theme) => ({
   iconColor: {
       color: '#64748B'
   },
   mr:{
       marginRight: theme.spacing(0.1)
   }
}));

const Chat = () => {
    const classes = useStyles();

    return (
        <Box display = 'flex' flexDirection="column" height="calc(100vh - 56px)">
            <Box p={2} borderBottom="1px solid lightgray" display = 'flex' flexDirection="row"
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
            <Box style={{padding: '1rem 0.5rem'}} className="bg-white">
                <Box borderRadius={5} border="1px solid lightgray" display="flex" flexDirection="row" alignItems="center">
                    <IconButton className={classes.mr}>
                        <SentimentDissatisfiedOutlined className={classes.iconColor} />
                    </IconButton>
                    <IconButton className={classes.mr}>
                        <CropOriginal className={classes.iconColor}/>
                    </IconButton>
                    <IconButton className={classes.mr}>
                        <AttachFile className={classes.iconColor} />
                    </IconButton>
                </Box>
            </Box>
        </Box>
    )
}

export default Chat;
