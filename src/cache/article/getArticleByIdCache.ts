import { cache } from "react";
import { unstable_cache } from "next/cache";

import { Article } from "@/schemas/article";

const cacheFuncMap: {
    [key: string]: (articleId: string) => Promise<Article>
} = {}

export default async function getArticleById(articleId: string): Promise<Article> {
    const tag = `article-${articleId}`;
    if (cacheFuncMap[tag]) {
        return await cacheFuncMap[tag](articleId);
    }

    const cacheFunction = cache(unstable_cache(
        getArticleById
    ));
    cacheFuncMap[tag] = cacheFunction;

    return await cacheFunction(articleId);
}
