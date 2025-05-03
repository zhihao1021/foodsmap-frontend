import request from "@/config/axios";

import JWT from "@/schemas/jwt";
import LoginMethod from "@/schemas/loginMethods";

export default async function login(data: {
    emailOrUsername: string,
    code: string,
    method: LoginMethod,
    noExpiration?: boolean
}): Promise<JWT> {
    const response = await request.post<JWT>("/auth/login", data);

    return response.data;
}