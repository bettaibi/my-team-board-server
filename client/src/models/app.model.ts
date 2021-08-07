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

interface TaskModel{
    description: string;
    order: number;
    done: boolean;
}

export interface SprintModel {
    _id?: string;
    title: string;
    description?: string;
    dueDate: Date;
    tasks?: TaskModel[];
    aspect?: string;
    order?: number;
}

export interface AspectModel {
    _id?: string;
    title: string;
    project?: string;
    cards?: SprintModel[];
}

export interface BoardModel{
    project: ProjectModel;
    aspects: AspectModel[];
}

export interface AppState{
    workspaces: WorkspaceModel[];
    projects: ProjectModel[];
    members: UserModel[];
    boards: BoardModel[];
}