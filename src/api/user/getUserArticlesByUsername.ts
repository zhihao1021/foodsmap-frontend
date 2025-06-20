import request from "@/config/axios";

import { Article } from "@/schemas/article";

export default async function getUserArticlesByUsername(username: string): Promise<Article[]> {
    const response = await request.get<Article[]>(`/user/by-username/${username}/articles`)

    return response.data;
}