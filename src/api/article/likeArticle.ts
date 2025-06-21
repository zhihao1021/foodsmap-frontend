import request from "@/config/axios";

export default async function likeArticle(articleId: string): Promise<void> {
    await request.put(`/article/by-id/${articleId}/like`);
}