import request from "@/config/axios";
import JWT from "@/schemas/jwt";
import { UserCreate } from "@/schemas/user";

export default async function register(data: UserCreate): Promise<JWT> {
    const response = await request.post<JWT>("/auth/register", data);

    return response.data;
}