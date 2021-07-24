export interface UserModel{
    name: string;
    email: string;
    country: string;
    address: string;
    city: string;
    avatar: string;
    title: string;
}

export interface AppState{
    user: UserModel;
}