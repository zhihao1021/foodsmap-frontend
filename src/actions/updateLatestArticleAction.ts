"use server";
import { revalidateTag } from "next/cache";

export default async function updateLatestArticleAction(): Promise<void> {
    revalidateTag("latestArticles");
}