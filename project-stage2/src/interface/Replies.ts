import { IUser } from "./Thread";

export interface IReplies {
    id?: number;
    content?: string;
    user: IUser;
  }

export type IThreadReply = {
    content : string | undefined;
    image: string | File | undefined;
    preview?: string;
}