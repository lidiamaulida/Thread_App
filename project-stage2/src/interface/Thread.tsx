export type IThreadCard = {
    id: number;
    fullName?: string;
    userName?: string;
    content?: string;
    image?: string;
    profilePicture?: string;
    likesCount?: number;
    repliesCount?: number;
    postedAt: string;
    is_liked: boolean;
    user?: IUser
};

export type IUser = {
    fullName?: string;
    userName?: string;
    profil_picture?: string;
};

export type IThreadPost = {
    content : string | undefined;
    image: string | File | undefined;
    preview?: string;
}