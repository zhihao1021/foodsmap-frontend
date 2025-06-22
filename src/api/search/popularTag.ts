import request from "@/config/axios";

export default async function getArticlesByTag(token?: string, limit?: number): Promise<string[]> {
    const urlParams = new URLSearchParams();
    if (token) urlParams.append("token", token);
    if (limit !== undefined) urlParams.append("limit", limit.toString())

    const response = await request.get<string[]>(`/search/popular-tags?${urlParams}`);

    return response.data;
}
