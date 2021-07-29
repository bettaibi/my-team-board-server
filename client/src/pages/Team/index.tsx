import React, { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from '../../components/Header';
import Navigation from '../../components/Navigation';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import useSwipeableSidenav from '../../hooks/useSwipeableSidenav';
import { ContextProvider } from '../../context';

const Board = lazy(() => import('./Board'));
const Scrumboard = lazy(() => import('./Board/Scrumboard'));
const Members = lazy(() => import('./Members'));
const Chat = lazy(() => import('./Chat'));
const Profile = lazy(() => import('./Profile'));
const Setting = lazy(() => import('./Setting'));

const drawerWidth = 280;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        open: {
            [theme.breakpoints.up('sm')]: {
                width: `calc(100% - ${drawerWidth}px)`,
                marginLeft: drawerWidth,
                transition: theme.transitions.create(['margin', 'width'], {
                    easing: theme.transitions.easing.easeOut,
                    duration: theme.transitions.duration.enteringScreen,
                }),
            },
        },
        close: {
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        }
    }),
);

const Team = () => {
    const classes = useStyles();
    const { SwipeableSidenav, onSidenavToggle, show, onSidenavClose } = useSwipeableSidenav('left', 'persistent', drawerWidth);

    return (
        <ContextProvider>
            <React.Fragment>
                <SwipeableSidenav>
                    <Navigation onSidenavClose={onSidenavClose} />
                </SwipeableSidenav>
                <main className={show ? classes.open : classes.close}>
                    <Header onSidenavToggle={onSidenavToggle} />
                    <Suspense fallback={<span>loading content .....</span>}>
                        <Switch>
                            <Route path="/team" exact component={Board} />
                            <Route path="/team/scrumboard" component={Scrumboard} />
                            <Route path="/team/members" component={Members} />
                            <Route path="/team/profile" component={Profile} />
                            <Route path="/team/setting" component={Setting} />
                            <Route path="/team/chat/:roomID" component={Chat} />
                        </Switch>
                    </Suspense>
                </main>
            </React.Fragment>
        </ContextProvider>
    )
};

export default Team;
