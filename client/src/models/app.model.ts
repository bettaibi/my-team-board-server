export interface UserModel{
    _id?: string;
    name: string;
    email: string;
    country?: string;
    address?: string;
    city?: string;
    avatar?: string;
    title: string;
}

export interface WorkspaceModel{
    _id?: string;
    name: string;
    owner?: string;
    members?: any[];
}

export interface ProjectModel{
    _id?: string;
    title: string;
    description?: string;
    members: any[];
    workspace?: string;
}

export interface AppState{
    user: UserModel;
    workspaces: WorkspaceModel[];
    projects: ProjectModel[];
    members: UserModel[];
}