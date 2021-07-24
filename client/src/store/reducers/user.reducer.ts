import ActionType from '../actions/types';

const defaultState = {
    name: '',
    email: '',
    title: '',
    avatar: '',
    country: '',
    city: '',
    address: ''
};

const UserReducer = (state = {...defaultState}, action: {type: string, payload: any}) => {

    switch (action.type){
        case ActionType.GET_CURRENT_USER:
            return {...state, ...action.payload}
        default: return {...state}
    }
};

export default UserReducer;