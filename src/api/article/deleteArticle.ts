import request from "@/config/axios";

export default async function deleteArticle(articleId: string): Promise<void> {
  await request.delete(`/article/by-id/${articleId}`);
}
