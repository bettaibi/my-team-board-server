import React, { useEffect } from 'react';
import {
    Avatar,
    Tooltip
} from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { AppState, WorkspaceModel } from '../../../models/app.model';
import { setWorkspaces } from '../../../store/actions/workspace.actions';
import { setProjects } from '../../../store/actions/project.actions';
import { setWorkspaceMembers } from '../../../store/actions/members.actions';

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
    const dispatch = useDispatch();

    useEffect(() => {
        const getWorkspaces = async () => {
            try {
                const { data } = await axios.get('/workspace');
                if (data.success) {
                    dispatch(setWorkspaces(data.data))
                }
                console.log(data)
            }
            catch (err) {
                console.error(err);
            }
        };

        getWorkspaces()
    }, []);

    async function onSwitch (id: string){
        try{
            if(id){
                const {data} = await axios.get(`/workspace/switch/${id}`);
                if(data.success){
                    localStorage.setItem('workspace', id);
                    dispatch(setProjects(data.data.projects));
                    dispatch(setWorkspaceMembers(data.data.members));
                }
                console.log(data)
            }
            
        }
        catch(err){
            console.error(err);
        }
    }

    return (
        <React.Fragment>
            {/* <Tooltip title="Spark" placement="right">
                <Avatar variant="rounded" className={classes.mb + ' ' + classes.namespaces + ' ' + classes.bgActive}>IT</Avatar>
            </Tooltip> */}
            {
                list.map((item: WorkspaceModel) => (
                    <Tooltip title={item.name} key={item._id} placement="right">
                        <Avatar variant="rounded" onClick={()=> onSwitch(item._id || '')}
                            className={classes.mb + ' ' + classes.namespaces}>
                                {item.name.charAt(0).toUpperCase()+item.name.charAt(1).toUpperCase()}
                        </Avatar>
                    </Tooltip>
                ))
            }
        </React.Fragment>
    )
}

export default Workspaces
