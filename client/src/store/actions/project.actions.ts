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