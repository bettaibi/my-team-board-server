import React from 'react';
import {
    Box,
    Typography,
    Fab,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    Divider,
    ListItemAvatar,
    Avatar,
    InputAdornment,
    IconButton,
} from '@material-ui/core';
import { DeleteOutline } from '@material-ui/icons';
import { useSelector } from 'react-redux';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Add, SearchOutlined } from '@material-ui/icons';
import { AppState, UserModel } from '../../../models/app.model';
import { useSharedContext } from '../../../context';
import { deleteMember } from '../../../store/actions/members.actions';

import useConfirmDialog from '../../../hooks/useConfirmDialog';
import useSidenav from '../../../hooks/useSidenav';
import MyTextField from '../../../components/MyTextField';
import NewMember from './NewMember';
import userAvatar from '../../../assets/avatars/Henderson.jpg'
import axios from 'axios';
import useSnackbar from '../../../hooks/useSnackbar';
import { useNotificationContext } from '../../../context/NotificationContext';

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
                        }}
                    />
                    <AddMember />
                </Box>
            </Box>

            <List component="nav" className={classes.root} aria-label="Members list">
                {members.map((item: UserModel) => (
                    <React.Fragment key={item._id}>
                        <ListItem className={classes.listItem}>
                            <ListItemAvatar>
                                <Avatar src={item.avatar ? item.avatar : userAvatar} />
                            </ListItemAvatar>
                            <ListItemText primary={item.name} secondary={item.title || 'Title not mentioned'} />
                            <ListItemSecondaryAction>
                                <DeleteMember memberId={item._id || ''} />
                            </ListItemSecondaryAction>
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

const DeleteMember = ({ memberId }: { memberId: string }) => {
    const { ConfirmDialog, handleOpen, handleClose } = useConfirmDialog({
        onConfirmClick: onDelete,
        message: 'Are you sure you want to delete this member?'
    });
    const { dispatch, selectedWorkspace } = useSharedContext();
    const { showMsg } = useNotificationContext();

    async function onDelete() {
        try {
            if (memberId && selectedWorkspace) {
                const { data } = await axios.delete(`/workspace/members/${memberId}/${selectedWorkspace}`);
                if (data.success) {
                    dispatch(deleteMember(memberId));
                    showMsg(data.data.message, 'success')
                }
                else{
                    showMsg(data.data.message, 'error')

                    setTimeout(()=> {
                     handleClose()
                    });
                }
            }
        }
        catch (err) {
            console.error(err);
        }
    }

    return (
        <React.Fragment>
            <IconButton onClick={onDelete}>
                <DeleteOutline />
            </IconButton>

            <ConfirmDialog />
        </React.Fragment>
    )
};

export default Members;
