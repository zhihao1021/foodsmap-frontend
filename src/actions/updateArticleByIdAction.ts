"use server";
import { revalidateTag } from "next/cache";

export default async function updateArticleById(articleId: string): Promise<void> {
    revalidateTag(`article-${articleId ?? "unknown"}`);
}
