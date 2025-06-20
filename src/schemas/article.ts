import { GlobalUser } from "./user";

type Article = Readonly<{
    id: string,
    title: string,
    context: string,
    likes: number,
    createTime: number,
    editTime: number,
    tags: string[],
    author: GlobalUser,
    mediaUrl: string,
    googleMapUrl: string,
    likesCount: number,
}>;

export type { Article };
