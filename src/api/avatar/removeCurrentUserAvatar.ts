import request from "@/config/axios";

export default async function removeCurrentUserAvatar(): Promise<void> {
    await request.delete("/avatar");
}