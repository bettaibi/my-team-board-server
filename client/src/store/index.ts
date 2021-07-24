import { combineReducers } from 'redux';
import UserReducer from './reducers/user.reducer';

const appReducer = combineReducers({
    user: UserReducer
});

export default appReducer;