import request from "@/config/axios";

import { Article } from "@/schemas/article";

export default async function getUserArticlesById(userId: string): Promise<Article[]> {
    const response = await request.get<Article[]>(`/user/by-id/${userId}/articles`)

    return response.data;
}