import request from "@/config/axios";

export default async function updateCurrentUserAvatar(data: File): Promise<void> {
    const formData = new FormData();
    formData.append("file", data);

    await request.put("/avatar", formData);
}