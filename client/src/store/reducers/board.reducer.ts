import { AspectModel, DynamicBoard } from '../../models/app.model';
import ActionType from '../actions/types';

interface ActionPayload{
    type: string;
    id?: string;
    payload?: any;
}
const BoardReducer = (state: DynamicBoard = {}, action: ActionPayload) => {

    switch (action.type) {
        case ActionType.GET_BOARD:
            return {...state};

        case ActionType.NEW_BOARD:
            return {...action.payload, ...state};

        case ActionType.EDIT_BOARD: {
            if(action.id){
                return {...state, [action.id]: {aspects: state[action.id].aspects, project: action.payload}};
            }
            else{ return {...state}};
        }

        case ActionType.NEW_ASPECT: 
            if(action.id){
                let aspects = [...state[action.id].aspects, action.payload];
                return {...state, [action.id]: {project: state[action.id].project, aspects} }
            }
            else{
                return {...state};
            }

        case ActionType.DELETE_ASPECT:
            if(action.id){
                let aspects = [...state[action.id].aspects.filter((item: AspectModel) => {
                    return item._id != action.payload
                })];
                return {...state, [action.id]: {project: state[action.id].project, aspects} } 
            }
            else {return {...state}};

        case ActionType.EDIT_ASPECT: 
        if(action.id){
            let aspects = [...state[action.id].aspects.map((item: AspectModel) => {
                return item._id != action.payload._id ? item: action.payload
            })];
            return {...state, [action.id]: {project: state[action.id].project, aspects} } 
        }
        else{
            return {...state};
        }

        default: return {...state};
    }
};

export default BoardReducer;