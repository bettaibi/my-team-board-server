import { AspectModel, DynamicBoard, ProjectModel, SprintModel } from '../../models/app.model';
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
        id,
        payload,
        type: ActionType.EDIT_BOARD
    };
};

export const deleteBoard = (id: string) => {

    return {
        id,
        type: ActionType.DELETE_BOARD
    };
};

export const newAspect = (id: string, payload: AspectModel) => {
    return {
        id,
        payload,
        type: ActionType.NEW_ASPECT
    };
};
export const editAspect = (id: string, payload: AspectModel) => {
    return {
        id,
        payload,
        type: ActionType.EDIT_ASPECT
    };
};
export const deleteAspect = (id: string, payload: string) => {
    return {
        id,
        payload,
        type: ActionType.DELETE_ASPECT
    };
};

export const newSprint = (id: string, payload: SprintModel) => {

    return {
        id,
        payload,
        type: ActionType.NEW_SPRINT
    };
};

export const editSprint = (id: string, payload: SprintModel) => {

    return {
        id,
        payload,
        type: ActionType.EDIT_SPRINT
    };
};

export const deleteSprint = (id: string, payload: SprintModel) => {

    return {
        id,
        payload,
        type: ActionType.DELETE_SPRINT
    };
};