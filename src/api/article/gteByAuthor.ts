// src/api/article/byAuthor.ts
import request from "@/config/axios";

import { User } from "@/schemas/user";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE;

export default async function getUserByAuthor(displayName: string, token?: string, limit?: number): Promise<ListResponse<User>> {
    const urlParams = new URLSearchParams();
    if (token) urlParams.append("token", token);
    if (limit !== undefined) urlParams.append("limit", limit.toString())

    const response = await request.get<ListResponse<User>>(`/article/by-author/${displayName}?${urlParams}`);

    return response.data;
}
