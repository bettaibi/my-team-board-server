import { BoardModel } from '../../models/app.model';
import ActionType from './types';

export const getBoards = () => {

    return {
        type: ActionType.GET_BOARD,
    };
};

export const newBoard = (payload: BoardModel) => {

    return {
        payload,
        type: ActionType.NEW_BOARD,
    };
};

// export const newBoard = (payload: BoardModel) => {

//     return {
//         payload,
//         type: ActionType.NEW_BOARD,
//     };
// };