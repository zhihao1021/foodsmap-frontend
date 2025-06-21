import request from "@/config/axios";


export default async function getArticlesByTag(limit?: number): Promise<string[]> {
    const urlParams = new URLSearchParams();
    if (limit !== undefined) urlParams.append("limit", limit.toString())

    const response = await request.get<string[]>(`/search/popular-tags?${urlParams}`);

    return response.data;
}