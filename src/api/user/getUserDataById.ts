import request from "@/config/axios";

import { GlobalUser } from "@/schemas/user";

export default async function getUserDataById(userId: string): Promise<GlobalUser> {
    const response = await request.get<GlobalUser>(`/user/by-id/${userId}`);

    return response.data;
}