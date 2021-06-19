import React, {lazy, Suspense} from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from '../../components/Header';
import Navigation from '../../components/Navigation';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import useSwipeableSidenav from '../../hooks/useSwipeableSidenav';

const Scrumboard = lazy(() => import('./Scrumboard'));
const Members = lazy(() => import('./Members'));

const drawerWidth = 280;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        open : {
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
    const { SwipeableSidenav, onSidenavToggle, show } = useSwipeableSidenav('left', 'persistent', drawerWidth);
    const classes = useStyles();
    
    return (
        <React.Fragment>
            <SwipeableSidenav >
                 <Navigation />
            </SwipeableSidenav>

            <main className = {show? classes.open: classes.close }>
                <Header onSidenavToggle = {onSidenavToggle} />
                <Suspense fallback={<span>loading content .....</span>}>
                    <Switch>
                        <Route path="/team" exact component = {Scrumboard} />
                        <Route path="/team/members" exact component = {Members} />
                    </Switch>
                </Suspense>
            </main>
        </React.Fragment>
    )
}

export default Team;
