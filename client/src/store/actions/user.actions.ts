import ActionType from './types';
import axios from 'axios';
import { Dispatch } from 'redux';

export const fetchCurrentUser = () => {
    
    return function(dispatch: Dispatch<any>){
        console.log("dkdk dkdk djsdjd dsjjd sjdjsd")

        axios.get(`/auth/user`).then((res)=> {
            dispatch(updateCurrentUser(res.data.data))
        }).catch((err) => {
            throw err;
        });
    }
};

export const getCurrentUser = () => {

    return {
        type: ActionType.GET_CURRENT_USER,
    };
};

export const updateCurrentUser = (payload: any) => {

    return {
        type: ActionType.UPDATE_CURRENT_USER,
        payload
    };
};