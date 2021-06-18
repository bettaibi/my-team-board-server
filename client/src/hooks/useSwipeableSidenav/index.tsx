import React from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import useToggle from '../useToggle';
import { Box } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';


type Anchors = 'left' | 'right' | 'top' | 'bottom';
type Variant = 'temporary' | 'permanent' | 'persistent';

const useSwipeableSidenav = (anchor: Anchors, variant: Variant, width: number) => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));

    const { handleClose: onSidenavClose, handleOpen: onSidenavOpen, show, toggle: onSidenavToggle } = useToggle(matches);

    const SwipeableSidenav: React.FC = ({ children }) => {

        return (
            <SwipeableDrawer
                variant={matches ? variant : 'temporary'}
                anchor={anchor}
                open={show}
                onOpen={onSidenavOpen}
                onClose={onSidenavClose}
            >
                <Box width={width} overflow="hidden">
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