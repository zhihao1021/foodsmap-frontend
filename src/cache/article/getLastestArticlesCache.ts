import { unstable_cache } from "next/cache";
import { cache } from "react";

import getLatestArticles from "@/api/article/getLatestArticle";

const getLatestArticlesCache = cache(unstable_cache(
    getLatestArticles,
    [],
    {
        tags: ["latestArticles"],
        revalidate: 3600
    }
))

export default getLatestArticlesCache;
