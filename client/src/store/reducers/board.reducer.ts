import { BoardModel } from '../../models/app.model';
import ActionType from '../actions/types';

interface ActionPayload{
    type: string;
    id?: string;
    payload?: any;
}
const BoardReducer = (state: BoardModel[] = [], action: ActionPayload) => {

    switch (action.type) {
        case ActionType.GET_BOARD:
            return [...state];
        case ActionType.NEW_BOARD:
            return [action.payload, ...state];

        case ActionType.NEW_ASPECT: 
            let found: BoardModel | undefined = state.find((item: BoardModel) => item.project._id == action.id);
            if(found) {
                let aspects = [...found.aspects, action.payload];
                return [...state.map((item: BoardModel) => {
                   if(item.project._id == action.id){
                       return {project: item.project, aspects};
                   }
                   else{ return item };
                })];
            }
            return [...state];

        default: return [...state];
    }
};

export default BoardReducer;