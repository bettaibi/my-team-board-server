import React from 'react';
import {
    Typography,
    Box
} from '@material-ui/core';
import RoundedButton from '../../../components/RoundedButton';
import axios from 'axios';

const SessionExpired = ({onDialogClose}: {onDialogClose: () => void}) => {
    const [ loading, setLoading ] = React.useState<boolean>(false);

    const logout = async () => {
        try{
            setLoading(true);
            const {data} = await axios({
                url: `/auth/logout`,
                method: 'POST',
            });

            if(data.success){
                onDialogClose();
                document.cookie = "jwt=;";
                localStorage.clear();
                sessionStorage.clear();
                setTimeout(() =>{
                    window.location.reload();
                }, 1000);
            }
        }
        catch(err){
            throw err;
        }
    }

    return (
        <Box p={2} maxWidth={250}>
            <Typography variant="h5" gutterBottom>
                Session Expired!
            </Typography>

            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                Your session has expired. Please login again to continue working.
            </Typography>

            <RoundedButton variant="contained" color="primary" fullWidth onClick={logout}
            style={{marginTop: '0.5rem'}}>
              {loading?'Loading...':'login'}
            </RoundedButton>
        </Box>
    )
}

export default SessionExpired;
