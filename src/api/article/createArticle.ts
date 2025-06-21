import request from "@/config/axios";
import { Article, ArticleCreate } from "@/schemas/article";

export default async function createArticle(data: ArticleCreate): Promise<Article> {
    const response = await request.post<Article>("/article", data);

    return response.data;
}
