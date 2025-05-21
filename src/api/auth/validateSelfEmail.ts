import request from "@/config/axios";

export default async function validateSelfEmail(data: { email: string, code: string }): Promise<string> {
    const response = await request.post<string>("/auth/validate-self-email", data);

    return response.data;
}