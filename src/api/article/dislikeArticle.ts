import request from "@/config/axios";

export default async function dislikeArticle(articleId: string): Promise<void> {
    await request.delete(`/article/by-id/${articleId}/like`);
}