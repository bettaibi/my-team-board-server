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
    Hidden,
    Tooltip
} from '@material-ui/core';

import { useSelector } from 'react-redux';

import AvatarGroup from '@material-ui/lab/AvatarGroup';
import userAvatar from '../../../assets/avatars/profile.jpg';
import { AppState } from '../../../models/app.model';
import { useSharedContext } from '../../../context';

const baseURL = process.env.REACT_APP_BASE_URL;

const MyWorkspaces = () => {
    const rows = useSelector((state: AppState) => state.workspaces);
    const { currentUser } = useSharedContext(); 

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

                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.name}>
                            <TableCell component="th" scope="row" className="text-capitalize">
                                {row.name}
                            </TableCell>
                            <TableCell>{row.owner._id === currentUser._id?'Owner': 'Member'}</TableCell>
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

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default MyWorkspaces;
