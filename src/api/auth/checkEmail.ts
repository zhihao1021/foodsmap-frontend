import request from "@/config/axios";

export default async function checkEmail(email: string): Promise<void> {
    await request.post("/auth/check-email", {
        email: email
    });
}
