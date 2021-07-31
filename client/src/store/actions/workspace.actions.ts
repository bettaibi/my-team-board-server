import { WorkspaceModel } from '../../models/app.model';
import ActionType from './types';

export const getUserWorkspaces = () => {

    return {
        type: ActionType.GET_WORKSPACES,
    };
};

export const setWorkspaces = (payload: WorkspaceModel[]) => {

    return {
        payload,
        type: ActionType.SET_WORKSPACES,
    };
};

export const newWorkspace = (payload: WorkspaceModel) => {

    return {
        payload,
        type: ActionType.NEW_WORKSPACE,
    };
};

