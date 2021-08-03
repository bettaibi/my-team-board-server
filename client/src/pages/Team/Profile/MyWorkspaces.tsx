import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    TableHead,
    Paper,
    Avatar,
    IconButton,
    MenuItem,
    Hidden,
    Tooltip,
    makeStyles
} from '@material-ui/core';
import {
    MoreVertOutlined,
    EditOutlined,
} from '@material-ui/icons';
import { useSelector } from 'react-redux';

import AvatarGroup from '@material-ui/lab/AvatarGroup';
import userAvatar from '../../../assets/avatars/profile.jpg';
import UsePopover from '../../../hooks/usePopover';
import { AppState } from '../../../models/app.model';

const baseURL = process.env.REACT_APP_BASE_URL;

const useStyles = makeStyles((theme) => ({
    icons: {
        color: '#64748B'
    },
    menuItem: {
        padding: '0.8rem '
    }
}))

const MyWorkspaces = () => {
    const rows = useSelector((state: AppState) => state.workspaces);

    console.log(rows);
    return (
        <TableContainer component={Paper} style={{ borderRadius: '10px' }}>
            <Table style={{ width: '100%' }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Workspace</TableCell>
                        <TableCell>Role</TableCell>
                        <Hidden xsDown>
                            <TableCell>Members</TableCell>
                        </Hidden>
                        <TableCell align="right"></TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.name}>
                            <TableCell component="th" scope="row" className="text-capitalize">
                                {row.name}
                            </TableCell>
                            <TableCell>Owner</TableCell>
                            <Hidden xsDown>
                                <TableCell>
                                    <AvatarGroup max={3}>
                                        {
                                            row.members.map((item) => (
                                                <Tooltip key={item._id} title={item.name}>
                                                    <Avatar alt="user avatar"  src={item.avatar? `${baseURL}/files/${item.avatar}` : userAvatar} />
                                                </Tooltip>
                                            ))
                                        }
                                    </AvatarGroup>
                                </TableCell>
                            </Hidden>
                            <TableCell align="right">
                                <MenuActions />
                            </TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

const MenuActions = () => {
    const { PopoverComponent, handleClick } = UsePopover();
    const classes = useStyles();

    return (
        <React.Fragment>
            <IconButton aria-describedby="actions-menu" color="inherit" aria-label="profile" onClick={handleClick}>
                <MoreVertOutlined className={classes.icons} />
            </IconButton>

            <PopoverComponent id="actions-menu">
                <React.Fragment>
                    <MenuItem className={classes.menuItem}>
                        <EditOutlined className={classes.icons} />
                        <span style={{ marginLeft: '0.8rem' }}>Edit</span>
                    </MenuItem>
                </React.Fragment>
            </PopoverComponent>
        </React.Fragment>
    )
};

export default MyWorkspaces;
