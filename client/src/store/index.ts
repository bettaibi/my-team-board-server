import { combineReducers } from 'redux';
import MemberReducer from './reducers/member.reducer';
import ProjectReducer from './reducers/project.reducer';
import UserReducer from './reducers/user.reducer';
import WorkspaceReducer from './reducers/workspace.reducer';

const appReducer = combineReducers({
    user: UserReducer,
    workspaces: WorkspaceReducer,
    members: MemberReducer,
    projects: ProjectReducer, 
});

export default appReducer;