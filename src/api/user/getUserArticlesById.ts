import request from "@/config/axios";
import ListResponse from "@/lib/listResponse";

import { Article } from "@/schemas/article";

export default async function getUserArticlesById(userId: string, token?: string, limit?: number): Promise<ListResponse<Article>> {
    const urlParams = new URLSearchParams();
    if (token) urlParams.append("token", token);
    if (limit !== undefined) urlParams.append("limit", limit.toString())

    const response = await request.get<ListResponse<Article>>(`/user/by-id/${userId}/articles?${urlParams}`);

    return response.data;
}