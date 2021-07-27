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

export interface AppState{
    user: UserModel;
}