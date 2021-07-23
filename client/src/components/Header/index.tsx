import React from 'react';
import {
    IconButton,
    Box,
    Badge,
    MenuItem,
    Divider,
    Typography,
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    ListItemSecondaryAction,
    Tooltip
} from '@material-ui/core'
import { Menu, CloseOutlined, NotificationsOutlined, SearchOutlined, AccountCircleOutlined, ExitToAppOutlined, SettingsApplicationsOutlined } from '@material-ui/icons';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import UsePopover from '../../hooks/usePopover';
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';
import axios from 'axios';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            zIndex: theme.zIndex.drawer + 1,
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#fff',
            padding: '0 1rem',
            height: '56px',
            boxShadow: '0 .125rem .25rem rgba(0,0,0,.075)',
            position: 'sticky',
            top: 0
        },
        menuButton: {
            marginRight: theme.spacing(1),
        },
        icons: {
            color: '#64748B'
        },
        menuItem: {
            padding: '0.8rem '
        },
        primaryHeader: {
            backgroundColor: theme.palette.primary.main,
            padding: theme.spacing(2),
            color: '#fafafa'
        },
        inline: {
            display: 'inline',
        },
        listItem: {
            backgroundColor: '#fff',
            '&:hover': {
                backgroundColor: '#fafafa', 
            }
        },
        activeItem: {
            backgroundColor: '#f1f5f9 !important',
        }
    }),
);

const Header = ({ onSidenavToggle }: { onSidenavToggle: () => void }) => {
    const classes = useStyles();

    return (
        <header className={classes.root}>
            <IconButton onClick={onSidenavToggle}
                edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                <Menu className={classes.icons} />
            </IconButton>

            <Box>
                <IconButton edge="start" color="inherit" aria-label="Search" className={classes.menuButton}>
                    <SearchOutlined className={classes.icons} />
                </IconButton>

                <NotificationMenu />
                <AccountMenu />

            </Box>
        </header>
    )
};

const NotificationMenu = () => {
    const classes = useStyles();
    const { PopoverComponent, handleClick, handleClose } = UsePopover();

    return (
        <React.Fragment>
            <IconButton aria-describedby="notification-menu" edge="start" color="inherit" aria-label="messages"
                className={classes.menuButton} onClick={handleClick}>
                <Badge badgeContent={4} color="secondary">
                    <NotificationsOutlined className={classes.icons} />
                </Badge>
            </IconButton>

            <PopoverComponent id="notification-menu">
                <React.Fragment>
                    <Notifications />
                </React.Fragment>
            </PopoverComponent>

        </React.Fragment>
    )
};

const AccountMenu = () => {
    const history = useHistory();
    const classes = useStyles();
    const { PopoverComponent, handleClick, handleClose } = UsePopover();

    const navigateTo = (path: string) => {
        history.push(path);
        handleClose();
    };

    const logout = async () => {
        try{
            const { data } = await axios.post(`/auth/logout`);
            if(data.success){
                document.cookie = "jwt=;";
                history.push('/login');
            }
            else{
                handleClose();
            }
        }
        catch(err){
            throw err;
        }
    }

    return (
        <React.Fragment>
            <IconButton aria-describedby="account-menu" color="inherit" aria-label="profile" onClick={handleClick}>
                <AccountCircleOutlined className={classes.icons} />
            </IconButton>

            <PopoverComponent id="account-menu">
                <React.Fragment>
                    <Box py={1} mx={2}>
                        <Typography variant="subtitle2">
                            Signed in as
                        </Typography>
                        <small>bettaibinidhal00@gmail.com</small>
                    </Box>
                    <Divider />
                    <MenuItem onClick={() => navigateTo('/team/profile')} className={classes.menuItem}>
                        <AccountCircleOutlined className={classes.icons} />
                        <span style={{ marginLeft: '0.8rem' }}>Profile</span>
                    </MenuItem>
                    <MenuItem onClick={() => navigateTo('/team/setting')} className={classes.menuItem}>
                        <SettingsApplicationsOutlined className={classes.icons} />
                        <span style={{ marginLeft: '0.8rem' }}>Setting</span>
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={logout} className={classes.menuItem}>
                        <ExitToAppOutlined className={classes.icons} />
                        <span style={{ marginLeft: '0.8rem' }}>Logout</span>
                    </MenuItem>
                </React.Fragment>
            </PopoverComponent>
        </React.Fragment>
    )
};

const Notifications = () => {
    const classes = useStyles();

    return (
        <Box>
            <Box className={classes.primaryHeader}>
                <Typography variant="subtitle1" style={{ fontWeight: 600 }}>
                    Notifications
                </Typography>
            </Box>
            <Box className="content-scroll" minWidth="350px" maxWidth="420px" height="400px" overflow="auto">
                <List className="bg-white p-0">
                    <ListItem alignItems="flex-start" className={clsx(classes.listItem,classes.activeItem)}>
                        <ListItemAvatar>
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                        </ListItemAvatar>
                        <ListItemText
                            primary="Brunch this weekend?"
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        className={classes.inline}
                                        color="textPrimary"
                                    >
                                        Ali Connors
                                    </Typography>
                                    {" — I'll be in your neighborhood doing errands this…"}
                                </React.Fragment>
                            }
                        />
                        <ListItemSecondaryAction>
                            <Tooltip title="remove">
                                <IconButton edge="end" aria-label="delete" size="small">
                                    <CloseOutlined />
                                </IconButton>
                            </Tooltip>
                        </ListItemSecondaryAction>
                    </ListItem>

                    <ListItem alignItems="flex-start" className={clsx(classes.listItem)}>
                        <ListItemAvatar>
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                        </ListItemAvatar>
                        <ListItemText
                            primary="Brunch this weekend?"
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        className={classes.inline}
                                        color="textPrimary"
                                    >
                                        Ali Connors
                                    </Typography>
                                    {" — I'll be in your neighborhood doing errands this…"}
                                </React.Fragment>
                            }
                        />
                        <ListItemSecondaryAction>
                            <Tooltip title="remove">
                                <IconButton edge="end" aria-label="delete" size="small">
                                    <CloseOutlined />
                                </IconButton>
                            </Tooltip>
                        </ListItemSecondaryAction>
                    </ListItem>

                </List>
            </Box>
        </Box>
    )
}

export default Header;
