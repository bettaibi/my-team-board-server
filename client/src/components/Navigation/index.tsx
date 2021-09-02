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
import NewWorkspaceDialog from './NewWorkspace';
import userAvatar from '../../assets/avatars/profile.jpg';
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';
import Workspaces from './Workspaces';
import { useSharedContext } from '../../context';
import { useSelector } from 'react-redux';
import { AppState, UserModel } from '../../models/app.model';
import { ClassNameMap } from '@material-ui/core/styles/withStyles';
import { useSocketContext } from '../../context/SocketContext';

const baseURL = process.env.REACT_APP_BASE_URL;

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

interface PagesNavProps{
    classes: ClassNameMap;
}

const Navigation = React.memo(() => {
    const classes = useStyles();

    return (
        <Grid container className={clsx(classes.root, 'content-scroll')}>
            <Grid className={classes.borderRight} item xs={3}>
                <Box my={2} px={1} display="flex" flexDirection="column" alignItems="center">
                    <Workspaces />
                    <NewWorkspaceDialog />
                </Box>
            </Grid>
            <Grid item xs>

                <CurrentUser />

                <Pages classes={classes} />

                <Box p={2} >
                    <Typography variant="subtitle2" color="primary">
                        Members
                    </Typography>
                    <small className={classes.textSecondary}>
                        Workspace's Members
                    </small>

                    <MemberList classes={classes} />

                </Box>

            </Grid>
        </Grid>
    )
});

const Pages: React.FC<PagesNavProps> = React.memo(({classes}) => {
    const history = useHistory();

    const navigateTo = (path: string) => {
        history.push(path);
    };

   
    return (
        <Box p={2} >
            <Typography variant="subtitle2" color="primary">
                Workspace
            </Typography>
            <small className={classes.textSecondary}>
                Workspace Managment
            </small>

            <Box className={clsx(classes.navItem, { [classes.activeItem]: history.location.pathname === '/team' })} onClick={() => navigateTo('/team')}
                display="flex" flexDirection="row" alignItems="center" justifyContent="start">
                <AssignmentOutlined className={classes.textWhite} />
                <span className={classes.textWhite} style={{ marginLeft: '8px' }} >Scrumboard</span>
            </Box>

            <Box className={clsx(classes.navItem, { [classes.activeItem]: history.location.pathname === '/team/members' })} onClick={() => navigateTo('/team/members')}
                display="flex" flexDirection="row" alignItems="center" justifyContent="start">
                <PeopleOutline className={classes.textWhite} />
                <span className={classes.textWhite} style={{ marginLeft: '8px' }} >Members</span>
            </Box>

        </Box>
    )
});

const MemberList: React.FC<PagesNavProps> = React.memo (({classes}) => {
    const members = useSelector((state: AppState) => state.members);
    const history = useHistory();
    const { onlineUsers } = useSocketContext();

    const navigateTo = (path: string) => {
        history.push(path);
    };

    const isOline = React.useCallback( (id: string | undefined): boolean => {
        if(id){
           return onlineUsers.hasOwnProperty(id) && !onlineUsers[id].lastSeen ? true: false;
        }
        return false;
    }, [onlineUsers]);

    return (
        <>
            {
                members.map((item: UserModel) => (
                    <Box key={item._id} className={clsx(classes.navItem, { [classes.activeItem]: history.location.pathname === `/team/chat/${item._id}` })} onClick={() => navigateTo(`/team/chat/${item._id}`)}
                        display="flex" flexDirection="row" alignItems="center" justifyContent="start">

                       { isOline(item._id) ? <StyledBadge
                            overlap="circular"
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            variant="dot"
                        >
                            <Avatar alt="team member" src={item.avatar? `${baseURL}/files/${item.avatar}` : userAvatar} />
                        </StyledBadge>:
                        <Avatar alt="team member" src={item.avatar? `${baseURL}/files/${item.avatar}` : userAvatar} />
                       }
                        <Box display="flex" flexDirection="column" ml={1} className={classes.textWhite}>
                            <span >{item.name}</span>
                            <small >{item.title || 'Not mention'}</small>
                        </Box>
                    </Box>
                ))
            }
        </>
    )

});

const CurrentUser = () => {
    const classes = useStyles();
    const { currentUser } = useSharedContext();

    return (
        <Box borderBottom="1px solid #2c3344" textAlign="center" display="flex" flexDirection="column" alignItems="center" justifyContent="center"
            style={{ padding: '1.5rem 1rem' }}>
            <Avatar alt="user avatar" src={currentUser.avatar? `${baseURL}/files/${currentUser.avatar}` : userAvatar} className={classes.largeAvatar} />
            <Typography variant="subtitle2" className={clsx(classes.textWhite, 'text-capitalize')} gutterBottom>
                {currentUser.name || 'Unknown'}
            </Typography>
            <small className={classes.textSecondary}>
                {currentUser.email || 'unknown@gmail.com'}
            </small>
        </Box>
    )
};

export default Navigation;
