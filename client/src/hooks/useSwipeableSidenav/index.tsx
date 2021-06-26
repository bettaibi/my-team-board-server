import React from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import useToggle from '../useToggle';
import { Box } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme, makeStyles,Theme } from '@material-ui/core/styles';


type Anchors = 'left' | 'right' | 'top' | 'bottom';
type Variant = 'temporary' | 'permanent' | 'persistent';

const useStyles = makeStyles((theme: Theme) => ({
    boxWidth: {
        [theme.breakpoints.down('xs')]: {
            width: '100vw'
        },
    },
}));

const useSwipeableSidenav = (anchor: Anchors, variant: Variant, width: number) => {
    const classes = useStyles();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));

    const { handleClose: onSidenavClose, handleOpen: onSidenavOpen, show, toggle: onSidenavToggle } = useToggle(true);


    const SwipeableSidenav: React.FC = ({ children }) => {
        return (
            <SwipeableDrawer
                variant={matches ? variant : 'temporary'}
                anchor={anchor}
                open={show}
                onOpen={onSidenavOpen}
                onClose={onSidenavClose}>

                <Box width={width} overflow="hidden" className = {classes.boxWidth}>
                    {children}
                </Box>
            </SwipeableDrawer>
        )
    };

    return {
        onSidenavClose,
        onSidenavOpen,
        onSidenavToggle,
        SwipeableSidenav,
        show
    };

};

export default useSwipeableSidenav;