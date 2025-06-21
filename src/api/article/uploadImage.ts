// /api/upload/uploadImage.ts
import request from "@/config/axios";

export default async function uploadImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await request.post<{ url: string }>("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data.url; // 回傳圖片 URL 給前端儲存
}
