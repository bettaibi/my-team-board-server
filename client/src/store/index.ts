import { combineReducers } from 'redux';
import BoardReducer from './reducers/board.reducer';
import MemberReducer from './reducers/member.reducer';
import ProjectReducer from './reducers/project.reducer';
import WorkspaceReducer from './reducers/workspace.reducer';

const appReducer = combineReducers({
    workspaces: WorkspaceReducer,
    members: MemberReducer,
    projects: ProjectReducer, 
    boards: BoardReducer
});

export default appReducer;