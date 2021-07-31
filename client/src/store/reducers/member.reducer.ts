import { UserModel } from '../../models/app.model';
import ActionType from '../actions/types';

const MemberReducer = (state = [], action: {type: string, payload?: any}) => {

    switch (action.type){
        case ActionType.GET_MEMBERS:
            return [...state]
        case ActionType.SET_MEMBERS:
            return [...action.payload]
        case ActionType.NEW_MEMBER: 
            return [...state, {...action.payload}];
        case ActionType.DELETE_MEMBER:
            return [...state.filter((item: UserModel) => item._id != action.payload)];

        default: return [...state];
    }
};

export default MemberReducer;