import request from "@/config/axios";

import { Article } from "@/schemas/article";

export default async function getLatestArticles(token?: string, limit?: number): Promise<ListResponse<Article>> {
    const urlParams = new URLSearchParams();
    if (token) urlParams.append("token", token);
    if (limit !== undefined) urlParams.append("limit", limit.toString())

    const response = await request.get<ListResponse<Article>>(`/article/latest?${urlParams}`);

    return response.data;
}
