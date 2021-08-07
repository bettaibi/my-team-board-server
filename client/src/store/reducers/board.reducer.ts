import { BoardModel } from '../../models/app.model';
import ActionType from '../actions/types';

const BoardReducer = (state = [], action: { type: string, payload?: BoardModel }) => {

    switch (action.type) {
        case ActionType.GET_BOARD:
            return [...state];
        case ActionType.NEW_BOARD:
            return [action.payload, ...state];

        default: return [...state];
    }
};

export default BoardReducer;