import React from 'react';
import useDialog from '../../../hooks/useDialog';
import {IconButton, makeStyles} from '@material-ui/core';
import {Add} from '@material-ui/icons';
import WithTooltip from '../../WithTooltip';


const useStyles = makeStyles((theme) => ({
    mb: {
        marginBottom: theme.spacing(1)
    },
    icons: {
        color: '#64748B'
    },
}));

const NewWorkspace = () => {
    const { DialogComponent, onDialogClose, onDialogOpen } = useDialog();
    const classes = useStyles();

    return (
        <React.Fragment>
            <WithTooltip title="New Workspace"
                text="Create a new workspace or switch to a different workspace by clicking on the icons above.">
                <IconButton className={classes.mb}
                onClick={onDialogOpen}>
                    <Add className={classes.icons} />
                </IconButton>
            </WithTooltip>

            <DialogComponent>
                new workspace
                <button onClick={onDialogClose}>Close Modal</button>
            </DialogComponent>
        </React.Fragment>
    )
}

export default NewWorkspace;
