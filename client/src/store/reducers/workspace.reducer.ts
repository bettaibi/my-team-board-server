import { WorkspaceModel } from '../../models/app.model';
import ActionType from '../actions/types';

const WorkspaceReducer = (state = [], action: {type: string, payload?: any}) => {

    switch (action.type){
        case ActionType.GET_WORKSPACES:
            return [...state]
        case ActionType.SET_WORKSPACES:
            return [...action.payload];
        case ActionType.NEW_WORKSPACE:
            return [...state, action.payload];
        case ActionType.UPDATE_WORKSPACE:
            return [...state.map((item: WorkspaceModel) => {return item._id == action.payload._id ? action.payload : item})];
        case ActionType.DELETE_WORKSPACE:
            return [...state.filter((item: WorkspaceModel) => {return item._id != action.payload})]
        default: return [...state];
    }
};

export default WorkspaceReducer;