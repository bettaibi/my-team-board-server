import React from 'react';
import {
    Box,
    Grid,
    Avatar,
    Typography,
    Badge,
} from '@material-ui/core';
import { Theme, makeStyles, withStyles, createStyles } from '@material-ui/core/styles';
import { AssignmentOutlined, PeopleOutline } from '@material-ui/icons';
import NewWorkspace from './NewWorkspace';
import userAvatar from '../../assets/avatars/Henderson.jpg';
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';

const StyledBadge = withStyles((theme: Theme) =>
    createStyles({
        badge: {
            backgroundColor: '#44b700',
            color: '#44b700',
            boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
            '&::after': {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                animation: '$ripple 1.2s infinite ease-in-out',
                border: '1px solid currentColor',
                content: '""',
            },
        },
        '@keyframes ripple': {
            '0%': {
                transform: 'scale(.8)',
                opacity: 1,
            },
            '100%': {
                transform: 'scale(2.4)',
                opacity: 0,
            },
        },
    }),
)(Badge);

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#0f172a',
        height: '100%',
        minHeight: '100vh',
        overflowY: 'hidden',
        '&:hover': {
            overflowY: 'auto'
        }
    },
    borderRight: {
        borderRight: '1px solid #2c3344'
    },
    textCenter: {
        textAlign: 'center'
    },
    mb: {
        marginBottom: theme.spacing(1)
    },
    namespaces: {
        backgroundColor: '#2c3344',
        cursor: 'pointer',
        fontSize: '14px',
        color: '#868c94',
        '&:hover': {
            backgroundColor: '#475569',
        }
    },
    bgActive: {
        backgroundColor: '#475569',
    },
    textWhite: {
        color: '#fafafa'
    },
    textSecondary: {
        color: '#868c94'
    },
    icons: {
        color: '#64748B'
    },
    largeAvatar: {
        width: theme.spacing(8),
        height: theme.spacing(8),
        marginBottom: theme.spacing(1)
    },
    navItem: {
        margin: theme.spacing(1, 0),
        padding: '0.25rem 0',
        cursor: 'pointer',
        borderRadius: '5px',
        transition: theme.transitions.create(['padding', 'background'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        '&:hover': {
            backgroundColor: '#2c3344',
            padding: theme.spacing(1),
        }
    },
    activeItem: {
        backgroundColor: '#475569',
        padding: theme.spacing(1),
    }

}));

const Navigation = () => {
    const classes = useStyles();
    const history = useHistory();

    const navigateTo = (path: string) => {
        history.push(path);
    };
    let path = history.location.pathname;

    return (
        <Grid container className={classes.root}>
            <Grid className={classes.borderRight} item xs={3}>
                <Box my={2} px={1} display="flex" flexDirection="column" alignItems="center">
                    <Avatar variant="rounded" className={classes.mb + ' ' + classes.namespaces + ' ' + classes.bgActive}>IT</Avatar>
                    <Avatar variant="rounded" className={classes.mb + ' ' + classes.namespaces}>MN</Avatar>
                    <Avatar variant="rounded" className={classes.mb + ' ' + classes.namespaces}>H</Avatar>
                    
                    <NewWorkspace />
                </Box>
            </Grid>
            <Grid item xs>
                <Box borderBottom="1px solid #2c3344" textAlign="center" display="flex" flexDirection="column" alignItems="center" justifyContent="center"
                    style={{ padding: '1.5rem 1rem' }}>
                    <Avatar alt="user avatar" src={userAvatar} className={classes.largeAvatar} />
                    <Typography variant="subtitle2" className={classes.textWhite} gutterBottom>
                        Bettaibi Nidhal
                    </Typography>
                    <small className={classes.textSecondary}>
                        bettaibinidhal00@gmail.com
                    </small>
                </Box>

                <Box p={2} >
                    <Typography variant="subtitle2" color="primary">
                        Workspaces
                    </Typography>
                    <small className={classes.textSecondary}>
                        Workspace Managment
                    </small>

                    <Box className={clsx(classes.navItem, {[classes.activeItem]: path === '/team'})} onClick = {() => navigateTo('/team')}
                        display="flex" flexDirection="row" alignItems="center" justifyContent="start">
                        <AssignmentOutlined className={classes.textWhite} />
                        <span className={classes.textWhite} style={{ marginLeft: '8px' }} >Scrumboard</span>
                    </Box>

                    <Box className={clsx(classes.navItem, {[classes.activeItem]: path === '/team/members'})} onClick = {() => navigateTo('/team/members')}
                        display="flex" flexDirection="row" alignItems="center" justifyContent="start">
                        <PeopleOutline className={classes.textWhite} />
                        <span className={classes.textWhite} style={{ marginLeft: '8px' }} >Members</span>
                    </Box>

                </Box>

                <Box p={2} >
                    <Typography variant="subtitle2" color="primary">
                        Members
                    </Typography>
                    <small className={classes.textSecondary}>
                        Workspace's Members
                    </small>

                    <Box className={clsx(classes.navItem, {[classes.activeItem]: path === '/team/chat/members1'})} onClick = {() => navigateTo('/team/chat/members1')}
                        display="flex" flexDirection="row" alignItems="center" justifyContent="start">

                        <StyledBadge
                            overlap="circle"
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            variant="dot"
                        >
                            <Avatar alt="team member" src={userAvatar} />
                        </StyledBadge>
                        <Box display="flex" flexDirection="column" ml={1} className={classes.textWhite}>
                            <span >Nidhal Bettaibi</span>
                            <small >Developer</small>
                        </Box>
                    </Box>
                    <Box className={clsx(classes.navItem, {[classes.activeItem]: path === '/team/chat/members2'})} onClick = {() => navigateTo('/team/chat/members2')}
                        display="flex" flexDirection="row" alignItems="center" justifyContent="start">

                        <StyledBadge
                            overlap="circle"
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            variant="dot"
                        >
                            <Avatar alt="team member" src={userAvatar} />
                        </StyledBadge>
                        <Box display="flex" flexDirection="column" ml={1} className={classes.textWhite}>
                            <span >Nidhal Bettaibi</span>
                            <small >Developer</small>
                        </Box>
                    </Box>

                </Box>

            </Grid>
        </Grid>
    )
}

export default Navigation
