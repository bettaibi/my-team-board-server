import React from 'react';
import {
    Box,
    Typography,
    Fab,
    List,
    ListItem,
    ListItemText,
    Divider,
    ListItemAvatar,
    Avatar
} from '@material-ui/core';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import MyTextField from '../../../components/MyTextField';
import { Add } from '@material-ui/icons';
import userAvatar from '../../../assets/avatars/Henderson.jpg'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            backgroundColor: theme.palette.background.paper,
            paddingBottom: '0 !important',
        },
        listItem: {
            cursor: 'pointer',
            '&:hover': {
                backgroundColor: '#f1f5f9'
            }
        }
    }),
);

const Members = () => {
    const classes = useStyles();
    const members = [1, 2, 3, 4];

    return (
        <Box className="bg-white" width="100%" height="100%">
            <Box p={3}>
                <Typography variant="h4" className="bg-text-primary">
                    Members
                </Typography>
                <Typography variant="subtitle2" color="textSecondary">
                    80 contacts
                </Typography>
                <Box display="flex" flexDirection="row" alignItems="center" my={2}>
                    <MyTextField fullWidth variant="outlined" placeholder="Search members" size="small" />
                    <Fab variant="extended" color="primary" size="medium" style={{ marginLeft: '1rem' }}>
                        <Add style={{ marginRight: '0.4rem' }} />
                        <span>Add</span>
                    </Fab>
                </Box>
            </Box>


            <List component="nav" className={classes.root} aria-label="Members list">
                {members.map((item: number) => (
                    <React.Fragment key={item}>
                        <ListItem className={classes.listItem}>
                            <ListItemAvatar>
                                <Avatar src={userAvatar} />
                            </ListItemAvatar>
                            <ListItemText primary="Photos" secondary="Jan 9, 2014" />
                        </ListItem>
                        <Divider />
                    </React.Fragment>
                ))}

            </List>
        </Box>
    )
}

export default Members;
