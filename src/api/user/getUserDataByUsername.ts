import request from "@/config/axios";

import { GlobalUser } from "@/schemas/user";

export default async function getUserDataByUsername(username: string): Promise<GlobalUser> {
    const response = await request.get<GlobalUser>(`/user/by-username/${username}`);

    return response.data;
}