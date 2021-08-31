import React, { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { ContextProvider } from '../../context';
import { NotificationProvider } from '../../context/NotificationContext';
import { SocketProvider } from '../../context/SocketContext';
import { Box, CircularProgress, Typography } from '@material-ui/core';
import Header from '../../components/Header';
import { VideoCallProvider } from './Chat/VideoCallContext';

const Board = lazy(() => import('./Board'));
const Scrumboard = lazy(() => import('./Board/Scrumboard'));
const Members = lazy(() => import('./Members'));
const Chat = lazy(() => import('./Chat'));
const Profile = lazy(() => import('./Profile'));
const Setting = lazy(() => import('./Setting'));

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        open: {
            [theme.breakpoints.up('sm')]: {

                transition: theme.transitions.create(['margin', 'width'], {
                    easing: theme.transitions.easing.easeOut,
                    duration: theme.transitions.duration.enteringScreen,
                }),
            },
        }
    }),
);

const Team = () => {
    const classes = useStyles();
    return (
        <ContextProvider>
            <SocketProvider>
                <VideoCallProvider>
                    <NotificationProvider>
                        <React.Fragment>
                            <main id="app-main" className={classes.open}>
                                <Header />
                                <Suspense fallback={<LoadingPage />}>
                                    <Switch>
                                        <Route path="/team" exact component={Board} />
                                        <Route path="/team/scrumboard/:projectId" component={Scrumboard} />
                                        <Route path="/team/members" component={Members} />
                                        <Route path="/team/profile" component={Profile} />
                                        <Route path="/team/setting" component={Setting} />
                                        <Route path="/team/chat/:memberId" component={Chat} />
                                    </Switch>
                                </Suspense>
                            </main>
                        </React.Fragment>
                    </NotificationProvider>
                </VideoCallProvider>
            </SocketProvider>
        </ContextProvider>
    )
};

const LoadingPage = () => {

    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center"
            width="100%" height="calc(100vh - 56px)">
            <Typography component="div" variant="subtitle1" color="textSecondary" gutterBottom>
                Loading....
            </Typography>
            <CircularProgress disableShrink />
        </Box>
    )
};

export default Team;
