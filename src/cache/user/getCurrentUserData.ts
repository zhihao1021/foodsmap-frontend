import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

import tokenCache from "@/lib/useTokenCache";

import { User } from "@/schemas/user";

import getCurrentUserData from "@/api/user/getCurrentUserData";

const cacheFuncMap: {
    [key: string]: () => Promise<User>
} = {}

export default async function getCurrentUserDataCache(): Promise<User> {
    const cookiesList = await cookies();
    const token = cookiesList.get("access_token")?.value;

    let userId: string | null = null;
    if (token) {
        try {
            const tokenData = jwtDecode<{ sub: string }>(token);
            userId = tokenData.sub;
        }
        catch { }
    }

    const tag = `user-${userId ?? "unknown"}`;
    if (cacheFuncMap[tag]) {
        return await cacheFuncMap[tag]();
    }

    const cacheFunction = tokenCache(
        getCurrentUserData,
        [],
        { tags: [tag] }
    );
    cacheFuncMap[tag] = cacheFunction;

    return await cacheFunction();
}
