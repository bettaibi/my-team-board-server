import ActionType from './types';

export const getCurrentUser = (payload: any) => {

    return {
        type: ActionType.GET_CURRENT_USER,
        payload
    };
};