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
    Divider,
    makeStyles
} from '@material-ui/core';
import {
    MoreVertOutlined,
    EditOutlined,
    DeleteOutline
} from '@material-ui/icons';
import AvatarGroup from '@material-ui/lab/AvatarGroup';

import avatar2 from '../../../assets/avatars/Christy.jpg';
import UsePopover from '../../../hooks/usePopover';

function createData(name: string, role: string, members: any[]) {
    return { name, role, members };
}
const rows = [
    createData('Frozen yoghurt', 'Owner', [1, 2, 3]),
    createData('Ice cream sandwich', 'Owner', [1, 2, 3, 4, 5, 8, 7, 8, 4, 1]),
    createData('Eclair', 'Member', [1, 2, 3, 4, 5])
];

const useStyles = makeStyles((theme) => ({
    icons: {
        color: '#64748B'
    },
    menuItem: {
        padding: '0.8rem '
    }
}))

const MyWorkspaces = () => {
    return (
        <TableContainer component={Paper} style={{ borderRadius: '10px' }}>
            <Table style={{ width: '100%' }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Workspace's Name</TableCell>
                        <TableCell>Role</TableCell>
                        <TableCell>Members</TableCell>
                        <TableCell align="right"></TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.name}>
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell>{row.role}</TableCell>
                            <TableCell>
                                <AvatarGroup max={3}>
                                    {
                                        row.members.map((item) => (
                                            <Avatar alt="Remy Sharp" src={avatar2} />
                                        ))
                                    }
                                </AvatarGroup>
                            </TableCell>
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
    const { PopoverComponent, handleClick, handleClose } = UsePopover();
    const classes = useStyles();
    
    return (
        <React.Fragment>
            <IconButton aria-describedby="actions-menu" color="inherit" aria-label="profile" onClick={handleClick}>
                <MoreVertOutlined className={classes.icons} />
            </IconButton>

            <PopoverComponent id="actions-menu">
                <React.Fragment>
                    <MenuItem className={classes.menuItem}>
                        <EditOutlined  className={classes.icons} />
                        <span style={{ marginLeft: '0.8rem' }}>Edit</span>
                    </MenuItem>
                   
                    <MenuItem className={classes.menuItem}>
                        <DeleteOutline className={classes.icons} />
                        <span style={{ marginLeft: '0.8rem' }}>Delete</span>
                    </MenuItem>
                </React.Fragment>
            </PopoverComponent>
        </React.Fragment>
    )
};

export default MyWorkspaces;
