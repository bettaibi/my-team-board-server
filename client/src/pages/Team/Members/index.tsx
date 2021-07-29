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
    Avatar,
    InputAdornment
} from '@material-ui/core';
import NewMember from './NewMember';
import { useSelector } from 'react-redux';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import MyTextField from '../../../components/MyTextField';
import { Add, SearchOutlined } from '@material-ui/icons';
import userAvatar from '../../../assets/avatars/Henderson.jpg'
import useSidenav from '../../../hooks/useSidenav';
import { AppState, UserModel } from '../../../models/app.model';

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
        },
        search: {
            [theme.breakpoints.down('xs')]: {
                flexDirection: 'column'
            },
        },
        searchFabButton: {
            [theme.breakpoints.down('xs')]: {
                marginLeft: '0 !important',
                width: '100%',
            },
        }
    }),
);

const Members = () => {
    const classes = useStyles();
    const members = useSelector((state: AppState) => state.members);

    const fire = () => {
        console.log('fire')
    }

    return (
        <Box className="bg-white" width="100%" height="100%">
            <Box p={3}>
                <Typography variant="h4" className="bg-text-primary fw-700">
                    Members
                </Typography>
                <Typography variant="subtitle2" color="textSecondary">
                    {members.length > 0 ? members.length : 'Add a new '} contacts
                </Typography>
                <Box display="flex" flexDirection="row" my={2} className={classes.search}>
                    <MyTextField style={{ marginBottom: '0.5rem' }} fullWidth variant="outlined" placeholder="Search members" size="small"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchOutlined color="disabled" />
                                </InputAdornment>
                            ),
                        }} />
                    <AddMember />
                </Box>
            </Box>

            <List component="nav" className={classes.root} aria-label="Members list">
                {members.map((item: UserModel) => (
                    <React.Fragment key={item._id}>
                        <ListItem className={classes.listItem} onClick={fire}>
                            <ListItemAvatar>
                                <Avatar src={item.avatar ? item.avatar : userAvatar} />
                            </ListItemAvatar>
                            <ListItemText primary={item.name} secondary={item.title || 'Title not mentioned'} />
                        </ListItem>
                        <Divider />
                    </React.Fragment>
                ))}

            </List>

            {
                members.length === 0 && (
                    <Box mt={4} p={3}>
                        <Typography variant="subtitle1" component="span" style={{ color: 'lightgray' }} gutterBottom>
                            No Members found
                        </Typography>
                    </Box>
                )
            }
        </Box>
    )
}

const AddMember = () => {
    const classes = useStyles();
    const { onSidenavClose, onSidenavOpen, SidenavComponent } = useSidenav('right', 'persistent');

    return (
        <React.Fragment>
            <Fab onClick={onSidenavOpen} className={classes.searchFabButton} variant="extended" color="primary" size="medium" style={{ marginLeft: '1rem', minWidth: '120px' }}>
                <Add style={{ marginRight: '0.4rem' }} />
                <span>Add</span>
            </Fab>

            <SidenavComponent>
                <div style={{ overflowY: 'auto', height: 'calc(100% - 56px)', marginTop: '56px', }}>
                    <NewMember onSidenavClose={onSidenavClose} />
                </div>
            </SidenavComponent>
        </React.Fragment>
    )
};

export default Members;
