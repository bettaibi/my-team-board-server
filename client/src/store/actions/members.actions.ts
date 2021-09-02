import { UserModel } from '../../models/app.model';
import ActionType from './types';

export const getWorkspaceMembers = () => {

    return {
        type: ActionType.GET_MEMBERS,
    };
};

export const setWorkspaceMembers = (payload: UserModel[]) => {

    return {
        payload,
        type: ActionType.SET_MEMBERS,
    };
};

export const newMember = (payload: UserModel) => {

    return {
        payload,
        type: ActionType.NEW_MEMBER,
    };
};

export const deleteMember = (payload: string) => {

    return{
        payload,
        type: ActionType.DELETE_MEMBER
    }
}