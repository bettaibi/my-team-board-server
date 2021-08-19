import { AspectModel, BoardModel, DynamicBoard, ProjectModel } from '../../models/app.model';
import ActionType from './types';

export const getBoards = () => {

    return {
        type: ActionType.GET_BOARD,
    };
};

export const newBoard = (payload: DynamicBoard) => {

    return {
        payload,
        type: ActionType.NEW_BOARD,
    };
};

export const editBoard = (id: string, payload: ProjectModel) => {

    return {
        payload,
        type: ActionType.EDIT_BOARD,
    };
};

export const newAspect = (id: string, payload: AspectModel) => {
    return {
        id,
        payload,
        type: ActionType.NEW_ASPECT,
    };
};
export const editAspect = (id: string, payload: AspectModel) => {
    return {
        id,
        payload,
        type: ActionType.EDIT_ASPECT,
    };
};
export const deleteAspect = (id: string, payload: string) => {
    return {
        id,
        payload,
        type: ActionType.DELETE_ASPECT,
    };
};