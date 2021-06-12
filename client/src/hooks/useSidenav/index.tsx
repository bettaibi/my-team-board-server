import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import useToggle from '../useToggle';

type Anchors = 'left' | 'right' | 'top' | 'bottom';

const useSidenav = (anchor: Anchors) => {
    const { handleClose: onSidenavClose, handleOpen: onSidenavOpen, show } = useToggle();

    const SidenavComponent: React.FC = ({ children }) => {

        return (
            <Drawer
                variant= "temporary"
                anchor={anchor}
                open={show}
                onClose={onSidenavClose}
                >
                {children}
            </Drawer>
        )
    };

    return { 
        onSidenavClose, 
        onSidenavOpen,
        SidenavComponent
    };

};

export default useSidenav;