import { ProjectModel } from '../../models/app.model';
import ActionType from '../actions/types';

const ProjectReducer = (state = [], action: { type: string, payload?: any }) => {

    switch (action.type) {
        case ActionType.GET_PROJECTS:
            return [...state]
        case ActionType.SET_PROJECTS:
            return [...action.payload]
        case ActionType.NEW_PROJECT:
            return [action.payload, ...state];
        case ActionType.UPDATE_PROJECT:
            return [...state.map((item: ProjectModel)=> item._id != action.payload._id? item: action.payload)]

        case ActionType.DELETE_PROJECT:
            return [...state.filter((item: ProjectModel)=> item._id != action.payload)];
            
        default: return [...state]
    }
};

export default ProjectReducer;