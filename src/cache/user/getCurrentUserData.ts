import getCurrentUserData from "@/api/user/getCurrentUserData";
import tokenCache from "@/lib/useTokenCache";

const getCurrentUserDataCache = tokenCache(getCurrentUserData, [], { tags: ["userData"], revalidate: 3600 });

export default getCurrentUserDataCache;
