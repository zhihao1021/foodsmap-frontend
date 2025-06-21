// src/api/article/byTag.ts
import request from "@/config/axios";

import { Article } from "@/schemas/article";

export default async function getArticlesByTag(tagName: string, token?: string, limit?: number): Promise<ListResponse<Article>> {
    const urlParams = new URLSearchParams();
    if (token) urlParams.append("token", token);
    if (limit !== undefined) urlParams.append("limit", limit.toString())

    const response = await request.get<ListResponse<Article>>(`/article/by-tag/${tagName}?${urlParams}`);

    return response.data;
}
