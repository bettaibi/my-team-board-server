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
    CloseOutlined
} from '@material-ui/icons';
import { UserModel } from '../../../models/app.model';
import MyAccordion from '../../../components/MyAccordion';
import MyTextField from '../../../components/MyTextField';

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
    member: UserModel | undefined;
}
const ChatDetails: React.FC<ChatDetailsProps> = ({ onSidenavClose, member }) => {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Box height="70px" p={2} boxShadow="0 .125rem .25rem rgba(0,0,0,.075)" display="flex" flex-direction="row" alignItems="center" justifyContent="space-between">
                <Box>
                    <Typography variant="h6" className="bg-text-primary">
                        Details
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        #{member?.name}
                    </Typography>
                </Box>

                <Tooltip title="Close">
                    <IconButton className={classes.lightGrayIcons} size="small"
                        onClick={onSidenavClose}>
                        <CloseOutlined />
                    </IconButton>
                </Tooltip>
            </Box>

            {/* <Box p={2} display="flex" flexDirection="row"
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
            </Box> */}

            <MyAccordion label="About" isOpen={true}>
                <Box display="flex" flexDirection="column" flexGrow={1}>
                <div className="form-group">
                    <label>Name</label>
                    <MyTextField disabled fullWidth variant="outlined" size="small" value={member?.name} />
                </div>
                <div className="form-group">
                    <label>Title</label>
                    <MyTextField disabled fullWidth variant="outlined" size="small" value={member?.title || 'Not mention'} />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <MyTextField disabled fullWidth variant="outlined" size="small" value={member?.email} />
                </div>
                </Box>
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
