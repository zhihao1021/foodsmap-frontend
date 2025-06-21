import { GlobalUser } from "./user";

type Article = Readonly<{
    id: string,
    title: string,
    context: string,
    createTime: number,
    editTime: number,
    tags: string[],
    author: GlobalUser,
    mediaList: string[],
    googleMapUrl: string,
    likesCount: number,
}>;

type ArticleCreate = {
    title: string,
    context: string,
    googleMapUrl: string,
};

type ArticleUpdate = {
    title?: string,
    context?: string,
    googleMapUrl?: string,
}

export type { Article, ArticleCreate, ArticleUpdate };
