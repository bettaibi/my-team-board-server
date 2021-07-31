import ActionType from '../actions/types';

const WorkspaceReducer = (state = [], action: {type: string, payload?: any}) => {

    switch (action.type){
        case ActionType.GET_WORKSPACES:
            return [...state]
        case ActionType.SET_WORKSPACES:
            return [...action.payload];
        case ActionType.NEW_WORKSPACE:
            return [...state, action.payload]

        default: return [...state]
    }
};

export default WorkspaceReducer;