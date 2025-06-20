import request from "@/config/axios";

import { JWT } from "@/schemas/jwt";

export default async function refreshToken(): Promise<JWT> {
    const response = await request.get<JWT>("/auth/refresh");

    return response.data;
}