import request from "@/config/axios";
import { Article, ArticleUpdate } from "@/schemas/article";

export default async function uodateArticle(articleId: string, data: ArticleUpdate): Promise<Article> {
    const response = await request.put<Article>(`/article/by-id/${articleId}`, data);

    return response.data;
}
