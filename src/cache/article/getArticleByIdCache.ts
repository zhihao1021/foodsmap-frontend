import tokenCache from "@/lib/useTokenCache";

import getArticleById from "@/api/article/getArticleById";
import { unstable_cache } from "next/cache";
import { cache } from "react";

// const getArticleByIdCache = cache(unstable_cache(getArticleById, [], { revalidate: 3600 }));
const getArticleByIdCache = getArticleById;

export default getArticleByIdCache;
