import React from 'react';
import {
    IconButton,
    Box,
    Badge
} from '@material-ui/core'
import { Menu, NotificationsOutlined, MailOutline, SearchOutlined } from '@material-ui/icons';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#fff',
            padding: '0 1rem',
            height: '56px',
            boxShadow: '0 .125rem .25rem rgba(0,0,0,.075)',
            position: 'sticky',
            top: 0
        },
        menuButton: {
            marginRight: theme.spacing(1),
        },
        icons: {
            color: '#64748B'
        }
    }),
);

const Header = ({ onSidenavToggle }: { onSidenavToggle: () => void }) => {
    const classes = useStyles();

    return (
        <header className={classes.root}>
            <IconButton onClick={onSidenavToggle}
                edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                <Menu className={classes.icons} />
            </IconButton>

            <Box>
                <IconButton edge="start" color="inherit" aria-label="Search" className={classes.menuButton}>
                    <SearchOutlined className={classes.icons} />
                </IconButton>
                <IconButton edge="start" color="inherit" aria-label="notifications" className={classes.menuButton}>
                    <NotificationsOutlined className={classes.icons} />
                </IconButton>
                <IconButton edge="start" color="inherit" aria-label="messages">
                    <Badge badgeContent={4} color="secondary">
                        <MailOutline className={classes.icons} />
                    </Badge>
                </IconButton>
            </Box>
        </header>
    )
}

export default Header
