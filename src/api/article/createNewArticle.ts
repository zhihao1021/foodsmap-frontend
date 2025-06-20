import request from "@/config/axios";
import { Article, ArticleCreate } from "@/schemas/article";

export default async function createNewArticle(data: ArticleCreate, files: File[]): Promise<Article> {
    const newArticleResponse = await request.post<Article>("/article", data);

    const formData = new FormData();
    files.forEach((file) => {
        formData.append("files", file);
    });
    const response = await request.put<Article>(`/article/${newArticleResponse.data.id}/files`, formData)

    return response.data;
}