import request from "@/config/axios";
import ListResponse from "@/lib/listResponse";

import { User } from "@/schemas/user";

export default async function getUsersByDisplayName(displayName: string, token?: string, limit?: number): Promise<ListResponse<User>> {
    const urlParams = new URLSearchParams();
    if (token) urlParams.append("token", token);
    if (limit !== undefined) urlParams.append("limit", limit.toString())

    const response = await request.get<ListResponse<User>>(`/user/by-display-name/${encodeURI(displayName)}?${urlParams}`);

    return response.data;
}
