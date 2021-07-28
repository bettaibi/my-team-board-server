import ActionType from '../actions/types';

const ProjectReducer = (state = [], action: {type: string, payload?: any}) => {

    switch (action.type){
        case ActionType.GET_PROJECTS:
            return [...state]
        case ActionType.SET_PROJECTS:
            return [...action.payload]

        default: return [...state]
    }
};

export default ProjectReducer;