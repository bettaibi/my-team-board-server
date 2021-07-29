import ActionType from '../actions/types';

const ProjectReducer = (state = [], action: { type: string, payload?: any }) => {

    switch (action.type) {
        case ActionType.GET_PROJECTS:
            return [...state]
        case ActionType.SET_PROJECTS:
            return [...action.payload]
        case ActionType.NEW_PROJECT:
            return [action.payload, ...state];

        default: return [...state]
    }
};

export default ProjectReducer;