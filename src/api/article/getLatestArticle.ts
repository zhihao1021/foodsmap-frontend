import request from "@/config/axios";
import { Article } from "@/schemas/article";


export default async function getLatestArticle(limit?: number): Promise<Article[]> {
    const urlParams = new URLSearchParams();
    if (limit !== undefined) urlParams.append("limit", limit.toString())

    const response = await request.get<Article[]>(`/search/latest-articles?${urlParams}`);

    return response.data;
}