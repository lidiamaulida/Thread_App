export type IThreadCard = {
    id: number;
    fullName?: string;
    userName?: string;
    content?: string;
    image?: string;
    profilePicture?: string;
    likesCount?: number;
    repliesCount?: number;
    posted_at: string;
    user?: IUser
};

export type IUser = {
    fullName?: string;
    userName?: string;
    profil_picture?: string;
};

export type IThreadPost = {
    content : string;
    image: string | File | undefined;
}