import React from 'react';
import {
    Box,
    Typography,
    IconButton,
    Tooltip,
    makeStyles,
    Theme,
} from '@material-ui/core';
import {
    PhoneOutlined,
    VideoCallOutlined,
    FindInPageOutlined,
    CloseOutlined
} from '@material-ui/icons';
import MyAccordion from '../../../components/MyAccordion';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
    lightGrayIcons: {
        backgroundColor: '#f5f4f4'
    },
    mr: {
        marginRight: theme.spacing(3)
    }
}));

interface ChatDetailsProps {
    onSidenavClose: () => void;
}
const ChatDetails: React.FC<ChatDetailsProps> = ({ onSidenavClose }) => {
    const classes = useStyles();
    return (
        <React.Fragment>
            <Box height="70px" p={2} boxShadow="0 .125rem .25rem rgba(0,0,0,.075)" display="flex" flex-direction="row" alignItems="center" justifyContent="space-between">
                <Box>
                    <Typography variant="h6" className="bg-text-primary">
                        Details
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        #bettaibi-nidhal
                    </Typography>
                </Box>

                <Tooltip title="Close">
                    <IconButton className={classes.lightGrayIcons} size="small"
                        onClick={onSidenavClose}>
                        <CloseOutlined />
                    </IconButton>
                </Tooltip>
            </Box>

            <Box p={2} display="flex" flexDirection="row"
                alignItems="center" justifyContent="center">
                <Tooltip title="Audio call">
                    <IconButton className={clsx(classes.lightGrayIcons, classes.mr)}>
                        <PhoneOutlined />
                    </IconButton>
                </Tooltip>

                <Tooltip title="Video chat">
                    <IconButton className={clsx(classes.lightGrayIcons, classes.mr)}>
                        <VideoCallOutlined />
                    </IconButton>
                </Tooltip>

                <Tooltip title="Search in conversation">
                    <IconButton className={clsx(classes.lightGrayIcons, classes.mr)}>
                        <FindInPageOutlined />
                    </IconButton>
                </Tooltip>
            </Box>

            <MyAccordion label="About" isOpen={true}>
                About this member
            </MyAccordion>
            <MyAccordion label="View photos and videos" >
                you will find all sent media in here
            </MyAccordion>
            <MyAccordion label="File Attachment">
                you will find all sent media in here
            </MyAccordion>
            <MyAccordion label="Calls History" >
                List of peviews calls is here
            </MyAccordion>

        </React.Fragment>
    )
}

export default ChatDetails;
