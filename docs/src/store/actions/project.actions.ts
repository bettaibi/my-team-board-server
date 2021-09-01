import { ProjectModel } from '../../models/app.model';
import ActionType from './types';

export const getUserProjects = () => {

    return {
        type: ActionType.GET_PROJECTS,
    };
};

export const setProjects = (payload: ProjectModel[]) => {

    return {
        payload,
        type: ActionType.SET_PROJECTS,
    };
};

export const newProject = (payload: ProjectModel) => {

    return {
        payload,
        type: ActionType.NEW_PROJECT,
    };
};

export const updateProject = (payload: ProjectModel) => {

    return {
        payload,
        type: ActionType.UPDATE_PROJECT,
    };
};

export const deleteProject = (payload: string) => {

    return {
        payload,
        type: ActionType.DELETE_PROJECT,
    };
}