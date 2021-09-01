import React from 'react';
import {
    Popover
} from '@material-ui/core';

interface PopoverProps{
    id: string;
}

const UsePopover = () => {
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    const PopoverComponent: React.FC<PopoverProps> = ({ children, id }) => {
        const newId = open ? id : undefined;

        return (
            <Popover
                id={newId}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                {children}
            </Popover>
        )
    }

    return {
        handleClick,
        handleClose,
        PopoverComponent
    }
}

export default UsePopover;