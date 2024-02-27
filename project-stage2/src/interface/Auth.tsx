export type IRegister = {
    fullName: string;
    email: string;
    password: string;
}

export type ILogin = {
    email: string;
    password: string;
}

export interface Iuser  {
    id: number;
    userName: string;
    fullName: string;
    email: string;
    profil_picture?: string;
    profil_description?: string;
    followers_count?: number;
    followings_count?: number;
}