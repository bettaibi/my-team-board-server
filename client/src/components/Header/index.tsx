import React from 'react';
import {
    IconButton,
    Box,
    Badge,
    MenuItem,
    Divider,
    Typography
} from '@material-ui/core'
import { Menu, NotificationsOutlined, MailOutline, SearchOutlined, AccountCircleOutlined, ExitToAppOutlined, SettingsApplicationsOutlined } from '@material-ui/icons';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import useMenu from '../../hooks/useMenu';

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
        },
        menuItem: {
            padding: '0.8rem '
        }
    }),
);

const Header = ({ onSidenavToggle }: { onSidenavToggle: () => void }) => {
    const classes = useStyles();
    const { handleClick, onMenuClose, MenuComponent } = useMenu();
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
                <IconButton edge="start" color="inherit" aria-label="messages" className={classes.menuButton}>
                    <Badge badgeContent={4} color="secondary">
                        <MailOutline className={classes.icons} />
                    </Badge>
                </IconButton>
                <MenuComponent
                    control="account-menu"
                    handler={
                        <IconButton aria-controls="account-menu" aria-haspopup="true"
                            edge="start" color="inherit" aria-label="profile" onClick={handleClick}>
                            <AccountCircleOutlined className={classes.icons} />
                        </IconButton>
                    }
                    content={
                        <div id="account-menu">
                            <Box py={1} mx={2}>
                                <Typography variant="subtitle2">
                                    Signed in as
                                </Typography>
                                <small>bettaibinidhal00@gmail.com</small>
                            </Box>
                            <Divider />
                            <MenuItem onClick={onMenuClose} className={classes.menuItem}>
                                <AccountCircleOutlined className={classes.icons} />
                                <span style={{ marginLeft: '0.8rem' }}>Profile</span>
                            </MenuItem>
                            <MenuItem onClick={onMenuClose} className={classes.menuItem}>
                                <SettingsApplicationsOutlined className={classes.icons} />
                                <span style={{ marginLeft: '0.8rem' }}>Setting</span>
                            </MenuItem>
                            <Divider />
                            <MenuItem onClick={onMenuClose} className={classes.menuItem}>
                                <ExitToAppOutlined className={classes.icons} />
                                <span style={{ marginLeft: '0.8rem' }}>Logout</span>
                            </MenuItem>
                        </div>
                    }
                />
            </Box>
        </header>
    )
}

export default Header
