import React from 'react';
import Drawer from '@material-ui/core/Drawer';

import useToggle from '../useToggle';
import { Box } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import clsx from 'clsx';

type Anchors = 'left' | 'right' | 'top' | 'bottom';
type Variant = 'temporary' | 'permanent' | 'persistent';

const useStyles = makeStyles((theme: Theme) => ({

    drawerOpen: {
        [theme.breakpoints.down('xs')]: {
            width: '100%'
        },
        width: '40%',
    },
    drawerClose: {
        width: 0,
    },
}));

const useSidenav = (anchor: Anchors, variant: Variant, state?: boolean) => {
    const classes = useStyles();
    const { handleClose: onSidenavClose, handleOpen: onSidenavOpen, show, toggle: onSidenavToggle } = useToggle(state || false);

    const SidenavComponent: React.FC = ({ children }) => {

        return (
            <Drawer
            transitionDuration={{ enter: 500, exit: 1000 }}
                variant={variant}
                anchor={anchor}
                open={show}
                onClose={onSidenavClose}
                className={clsx({
                    [classes.drawerOpen]: show,
                    [classes.drawerClose]: !show,
                  })}
                classes={{
                    paper: clsx({
                      [classes.drawerOpen]: show,
                      [classes.drawerClose]: !show,
                    }),
                  }} >
                <Box overflow="hidden">
                    {children}
                </Box>
            </Drawer>
        )
    };

    return {
        onSidenavClose,
        onSidenavOpen,
        onSidenavToggle,
        SidenavComponent,
        show
    };

};

export default useSidenav;