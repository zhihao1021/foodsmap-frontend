import User, { UserUpdate } from "@/schemas/user";

import request from "@/config/axios";

export default async function updateCurrentUserData(data: UserUpdate): Promise<User> {
    const response = await request.put("/user", data);

    return response.data;
}