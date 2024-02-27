export type IReply = {
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