import React, { useCallback } from 'react';
import {
    Dialog, 
    useTheme
} from '@material-ui/core';
import useToggle from '../useToggle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Slide from '@material-ui/core/Slide';
import Fade from '@material-ui/core/Fade';
import { TransitionProps } from '@material-ui/core/transitions';

const SlideTransition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="right" ref={ref} {...props} />;
});
const FadeTransition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>,
  ) {
    return <Fade  ref={ref} {...props} />;
});

const useDialog = (fullSize?: boolean) => {
    const { handleClose: onDialogClose, handleOpen: onDialogOpen, show } = useToggle();
    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.down('xs'));
    const fullScreen = fullSize || isXs;


    const DialogComponent: React.FC = useCallback(({children}) => {
        return(
        <Dialog 
            onClose={onDialogClose} 
            aria-labelledby="customized-dialog-content" 
            open={show}
            TransitionComponent={fullScreen ? SlideTransition: FadeTransition}
            fullScreen={fullScreen}>
            {children}
        </Dialog> )
    }, [show, fullScreen]);

    return {
        DialogComponent,
        onDialogClose,
        onDialogOpen
    }
};

export default useDialog;