import request from "@/config/axios";

import { Article } from "@/schemas/article";
import { jwtDecode } from "jwt-decode";

export default async function getUserArticlesById(userId?: string, token?: string, limit?: number): Promise<ListResponse<Article>> {
    if (userId === undefined) {
        try {
            const token = localStorage.getItem("access_token");
            if (token != null) {
                const data = jwtDecode<{ sub: string }>(token);
                userId = data.sub;
            }
        }
        catch { }
    }
    if (userId === undefined) {
        return {
            data: [],
            token: null,
        };
    }

    const urlParams = new URLSearchParams();
    if (token !== undefined) {
        urlParams.append("token", token);
    }
    if (limit !== undefined) {
        urlParams.append("limit", limit.toString());
    }

    const response = await request.get<ListResponse<Article>>(`/user/by-id/${userId}/articles?${urlParams}`);

    return response.data;
}