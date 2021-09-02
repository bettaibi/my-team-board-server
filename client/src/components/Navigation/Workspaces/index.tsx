import React from 'react';
import {
    Avatar,
    Tooltip
} from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { AppState, WorkspaceModel } from '../../../models/app.model';
import clsx from 'clsx';
import { useSharedContext } from '../../../context';

const useStyles = makeStyles((theme: Theme) => ({
    mb: {
        marginBottom: theme.spacing(1)
    },
    namespaces: {
        backgroundColor: '#2c3344',
        cursor: 'pointer',
        fontSize: '14px',
        color: '#868c94',
        '&:hover': {
            backgroundColor: '#475569',
        }
    },
    bgActive: {
        backgroundColor: '#475569',
    },

}))

const Workspaces = () => {
    const classes = useStyles();
    const list = useSelector((state: AppState) => state.workspaces);
    const {selectedWorkspace, setSelectedWorkspace} = useSharedContext();

    function onSwitch (id: string){
        if(id){
            setSelectedWorkspace(id);
        }
    }

    return (
        <React.Fragment>
            {
                list.map((item: WorkspaceModel) => (
                    <Tooltip title={item.name} key={item._id} placement="right">
                        <Avatar variant="rounded" onClick={()=> onSwitch(item._id || '')}
                            className={clsx(classes.mb , classes.namespaces, {[classes.bgActive]: item._id === selectedWorkspace})}>
                                {item.name.charAt(0).toUpperCase()+item.name.charAt(1).toUpperCase()}
                        </Avatar>
                    </Tooltip>
                ))
            }
        </React.Fragment>
    )
}

export default Workspaces
