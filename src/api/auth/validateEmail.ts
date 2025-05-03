import request from "@/config/axios";

export default async function validateEmail(data: { email: string, code: string }): Promise<string> {
    const response = await request.post<string>("/auth/validate-email", data);

    return response.data;
}