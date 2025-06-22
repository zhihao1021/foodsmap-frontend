import request from "@/config/axios";
import ListResponse from "@/lib/listResponse";

import { Article } from "@/schemas/article";

export default async function getArticlesByContext(context: string, token?: string, limit?: number): Promise<ListResponse<Article>> {
    const urlParams = new URLSearchParams();
    if (token) urlParams.append("token", token);
    if (limit !== undefined) urlParams.append("limit", limit.toString())

    const response = await request.get<ListResponse<Article>>(`/article/by-context/${context}?${urlParams}`);

    return response.data;
}
