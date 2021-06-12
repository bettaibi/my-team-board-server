import React from 'react';
import {
    Dialog,

} from '@material-ui/core';
import useToggle from '../useToggle';

const useDialog = () => {
    const { handleClose: onDialogClose, handleOpen: onDialogOpen, show } = useToggle();

    const DialogComponent: React.FC = ({children}) => {
        return(
        <Dialog onClose={onDialogClose} aria-labelledby="customized-dialog-content" open={show}>
            {children}
        </Dialog> )
    }

    return {
        DialogComponent,
        onDialogClose,
        onDialogOpen
    }
};

export default useDialog;