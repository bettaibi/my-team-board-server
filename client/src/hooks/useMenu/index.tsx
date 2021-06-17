import React from 'react';
import { Menu } from '@material-ui/core';

interface MenuProps {
    handler: JSX.Element;
    content: JSX.Element;
    control: string;
}

const useMenu = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const onMenuClose = () => {
        setAnchorEl(null);
    };

    const MenuComponent: React.FC<MenuProps> = ({content, handler, control}) => {
        return (
            <React.Fragment>
                {handler}

                <Menu
                    id={control}
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={onMenuClose}>
                    {content}
                </Menu>
            </React.Fragment >
        );
    };

    return {
        MenuComponent,
        onMenuClose,
        handleClick
    };
}

export default useMenu;