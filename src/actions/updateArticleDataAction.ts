"use server";
import { revalidateTag } from "next/cache";

export default async function updateArticleDataAction(articleId: string): Promise<void> {
    revalidateTag(`article-${articleId}`);
}
