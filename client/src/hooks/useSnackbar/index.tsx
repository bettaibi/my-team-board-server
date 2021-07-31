import { useCallback, useState } from "react";
import { 
    Snackbar
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import Slide from '@material-ui/core/Slide';

type Severity = 'error' | 'warning' | 'info' | 'success';

interface Direction {
    vertical: 'top' | 'bottom';
    horizontal: 'left' | 'center' | 'right';
}

interface ToastState{
    message: string;
    type: Severity;
    open: boolean;
}

const useSnackbar = (direction?: Direction) => {
    const [toast, setToast] = useState<ToastState>({message: '', open: false, type: 'success'})

    function showMsg(message: string, type: Severity): void {
        setToast({message, open: true, type : type});
    };

    const handleClose = () => {
        setToast({message: '', open: false, type : 'success'});
    };

    const { vertical, horizontal } = direction || {vertical: 'top', horizontal: 'right'};

    const SnackbarComponent = useCallback(
        () => (
            <Snackbar 
                open={toast.open} 
                autoHideDuration={90000} 
                onClose={handleClose}
                anchorOrigin={{ vertical, horizontal }}
                key={vertical + horizontal}
                TransitionComponent={Slide}
                >
                <Alert onClose={handleClose} severity={toast.type}>
                    {toast.message}
                </Alert>
            </Snackbar>
        ),
        [toast, vertical, horizontal],
    )

    return {
        showMsg,
        SnackbarComponent
    };
};

export default useSnackbar;