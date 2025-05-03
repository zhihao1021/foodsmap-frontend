import request from "@/config/axios";

export default async function checkUsername(username: string): Promise<void> {
    await request.post("/auth/check-username", {
        username: username
    });
}
