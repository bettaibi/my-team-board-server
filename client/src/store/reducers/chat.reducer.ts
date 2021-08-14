import { ChatModel } from '../../models/app.model';
import ActionType from '../actions/types';

const ChatReducer = (state: ChatModel = {}, action: { type: string, payload?: any, key?: string }) => {

    switch (action.type) {
        case ActionType.GET_CHAT:
            return {...state};
        case ActionType.SET_CHAT:
            if(action?.key && !state.hasOwnProperty(action?.key))
            return {...state, [action.key]: [...action.payload]};
            else
            return {...state};
        case ActionType.POST_MESSAGE:
            if(action?.key && state.hasOwnProperty(action?.key || '')){
                let messages = [...state[action.key], action.payload];
                return {...state, [action.key]: messages};
            }
            return {...state};
        case ActionType.INIT_CHAT: 
         return {};

        default: return {...state}
    }
};

export default ChatReducer;