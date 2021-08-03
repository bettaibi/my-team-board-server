export interface UserModel{
    _id?: string;
    name: string;
    email: string;
    country?: string;
    address?: string;
    city?: string;
    avatar?: string;
    title?: string;
    phone?: string;
}

export interface WorkspaceModel{
    _id?: string;
    name: string;
    owner: any;
    members: any[];
}

export interface ProjectModel{
    _id?: string;
    title: string;
    description: string;
    members: any[];
    workspace?: string;
    createdAt?: Date;
}

export interface AppState{
    workspaces: WorkspaceModel[];
    projects: ProjectModel[];
    members: UserModel[];
}