import tokenCache from "@/lib/useTokenCache";

import getCurrentUserData from "@/api/user/getCurrentUserData";

const getCurrentUserDataCache = tokenCache(getCurrentUserData, [], { tags: ["userData"], revalidate: 3600 });

export default getCurrentUserDataCache;
