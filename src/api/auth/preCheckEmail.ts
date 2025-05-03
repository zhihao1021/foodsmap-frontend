import request from "@/config/axios";

export default async function preCheckEmail(data: {
    email: string,
    code: string,
    identifyCode: string
}): Promise<void> {
    await request.post("/auth/precheck-email", data);
}