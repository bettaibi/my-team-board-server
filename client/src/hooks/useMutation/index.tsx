import React from 'react';
import { useNotificationContext } from '../../context/NotificationContext';
import axios, { AxiosRequestConfig } from 'axios';

interface toJsonResponse{
    success: boolean;
    message: string;
    data?: any;
}

const useMutation = () => {
    const [loading, setLoading] = React.useState<boolean>(false);
    const { showMsg } = useNotificationContext();

    async function onMutate(options: AxiosRequestConfig): Promise<toJsonResponse> {
        try{
            setLoading(true);
            const { data } = await axios({...options});
            if(data.success){
                showMsg(data.message, 'success');
                setLoading(false);
            }
            else{
                showMsg(data.message, 'error');
                setLoading(false);
            }
            return data;
        }
        catch(err){
            setLoading(false);
            throw err;
        }
    }
    
    return {
        loading,
        onMutate
    }
}

export default useMutation;