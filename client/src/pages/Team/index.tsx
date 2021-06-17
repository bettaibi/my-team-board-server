import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from '../../components/Header';
import Navigation from '../../components/Navigation';
import useSidenav from '../../hooks/useSidenav';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const Scrumboard = React.lazy(() => import('./Scrumboard'));

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
    const { SidenavComponent, onSidenavToggle, show } = useSidenav('left', 'persistent', drawerWidth, true);
    const classes = useStyles();
    
    return (
        <React.Fragment>
            <SidenavComponent>
                 <Navigation />
            </SidenavComponent>

            <main className = {show? classes.open: classes.close }>
                <Header onSidenavToggle = {onSidenavToggle} />
                <Switch>
                    <Route path="/team" exact component = {Scrumboard} />
                </Switch>
            </main>
        </React.Fragment>
    )
}

export default Team;
