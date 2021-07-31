import React, { useContext } from 'react';
import useSnackbar from '../hooks/useSnackbar';

type Severity = 'error' | 'warning' | 'info' | 'success';

interface ContextProps{
  showMsg: (msg: string, type: Severity) => void;
}

const NotificationContext = React.createContext({} as ContextProps);

export const NotificationProvider = ({children}: {children: JSX.Element}) => {
    const { showMsg, SnackbarComponent } = useSnackbar({horizontal: 'right', vertical: 'top'});

    const value = {
        showMsg
    };

    return(
        <NotificationContext.Provider value = {value}>
           <React.Fragment>
               <SnackbarComponent />
               {children}
           </React.Fragment>
        </NotificationContext.Provider>
    )
}

export const useNotificationContext = () => {
    const values = useContext(NotificationContext);
    return values;
};