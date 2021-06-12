import React from 'react';
import {
    Dialog,

} from '@material-ui/core';
import useToggle from '../useToggle';

const useDialog = () => {
    const { handleClose, handleOpen, show } = useToggle();

    const DialogComponent: React.FC = ({children}) => {
        return(
        <Dialog onClose={handleClose} aria-labelledby="customized-dialog-content" open={show}>
            {children}
        </Dialog> )
    }

    return {
        DialogComponent,
        handleOpen,
        handleClose
    }
};

export default useDialog;