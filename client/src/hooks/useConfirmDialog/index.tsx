import React, { useCallback } from 'react';
import {
    Typography,
    Dialog,
    DialogActions,
    DialogContent,
    Button
} from '@material-ui/core';
import useToggle from '../useToggle';

interface ConfirmDialogProps {
    message: string;
    onConfirmClick: () => void;
}
const useConfirmDialog = (obj: ConfirmDialogProps) => {
    const { show, handleClose, handleOpen } = useToggle();
    const { message, onConfirmClick } = obj;

    const ConfirmDialog = useCallback(() => (
        <Dialog open={show} onClose={handleClose} maxWidth="xs">
            <DialogContent dividers style={{padding: '1rem'}}>
                <Typography variant="subtitle1" >
                    Confirm
                </Typography>
                <small>
                    {message}
                </small>
            </DialogContent>
            <DialogActions>
                <Button size="small" onClick={handleClose}>Close</Button>
                <Button size="small" variant="contained" color="primary"
                    onClick={onConfirmClick}>Confirm</Button>
            </DialogActions>
        </Dialog>
    ), [show, message, handleClose, onConfirmClick]);

    return {
        handleClose,
        handleOpen,
        ConfirmDialog
    }
};

export default useConfirmDialog;