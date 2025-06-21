import { Article } from "@/schemas/article";

import tokenCache from "@/lib/useTokenCache";

import getArticleById from "@/api/article/getArticleById";

const cacheFuncMap: {
    [key: string]: (articleId: string) => Promise<Article>
} = {}

export default async function getArticleByIdCache(articleId: string): Promise<Article> {
    const tag = `article-${articleId}`;
    if (cacheFuncMap[tag]) {
        return await cacheFuncMap[tag](articleId);
    }

    const cacheFunction = tokenCache(
        getArticleById,
        [],
        { tags: [tag] }
    );
    cacheFuncMap[tag] = cacheFunction;

    return await cacheFunction(articleId);
}
