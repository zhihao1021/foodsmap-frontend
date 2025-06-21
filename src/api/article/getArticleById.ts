import request from "@/config/axios";

import { Article } from "@/schemas/article";

export default async function getArticleById(articleId: string): Promise<Article> {
    const response = await request.get<Article>(`/article/by-id/${articleId}`);

    return response.data;
}