import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import useToggle from '../useToggle';
import { Box } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

type Anchors = 'left' | 'right' | 'top' | 'bottom';
type Variant = 'temporary' | 'permanent' | 'persistent';

const useSidenav = (anchor: Anchors, variant: Variant, width: number, state?: boolean) => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));

    const { handleClose: onSidenavClose, handleOpen: onSidenavOpen, show, toggle: onSidenavToggle } = useToggle(state || false);

    const SidenavComponent: React.FC = ({ children }) => {

        return (
            <Drawer
                variant= {matches?variant:'temporary'}
                anchor={anchor}
                open={show}
                onClose={onSidenavClose}
                >
                <Box width={width}>
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