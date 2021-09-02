import { AspectModel, DynamicBoard, SprintModel } from '../../models/app.model';
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
            return {...state, ...action.payload};

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

        case ActionType.NEW_SPRINT: 
            if(action.id){
                let found = state[action.id].aspects;
                let index = state[action.id].aspects.findIndex((item: AspectModel)=> {
                    return item._id == action.payload.aspect
                });
                if(index > -1){
                    found[index].cards = [...found[index].cards || [], action.payload];
                    return {...state, [action.id]: {project: state[action.id].project, aspects: found} } 
                }
                else{ return {...state}}
            }
            else {return {...state}}
        
        case ActionType.EDIT_SPRINT: 
        if(action.id){
            let aspects = state[action.id].aspects;
            let index = state[action.id].aspects.findIndex((item: AspectModel)=> {
                return item._id == action.payload.aspect
            });
            if(index > -1 && aspects[index].cards){
                aspects[index].cards = aspects[index].cards?.map((item: SprintModel)=> {
                   return item._id != action.payload._id ? item : action.payload
                });
                return {...state, [action.id]: {project: state[action.id].project, aspects} } 
            }
            else{ return {...state}}
        }
        else { return {...state}};

        case ActionType.DELETE_SPRINT:
            if(action.id){
                let aspects = state[action.id].aspects;
                let index = state[action.id].aspects.findIndex((item: AspectModel)=> {
                    return item._id == action.payload.aspect
                });
                if(index > -1 && aspects[index].cards){
                    aspects[index].cards = aspects[index].cards?.filter((item: SprintModel)=>{
                        return item._id != action.payload._id
                    });
                    return {...state, [action.id]: {project: state[action.id].project, aspects} } 
                }
                else{
                    return {...state};
                }
            }
            else{
                return {...state};
            }

        case ActionType.DELETE_BOARD: 
        if(action.id){
            delete state[action.id];
            return {...state};
        }
        else{ return {...state}}

        default: return {...state};
    }
};

export default BoardReducer;