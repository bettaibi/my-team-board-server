import { MessageModel } from '../../models/app.model';
import ActionType from './types';

export const getChat = () => {

    return {
        type: ActionType.GET_CHAT,
    };
};

export const setChat = (payload: MessageModel[], key: string) => {

    return {
        key,
        payload,
        type: ActionType.SET_CHAT,
    };
};

export const PostNewMessage = (payload: MessageModel, key: string) => {

    return {
        key,
        payload,
        type: ActionType.POST_MESSAGE,
    };
};

export const initChat = () => {

    return {
        type: ActionType.INIT_CHAT,
    };
};