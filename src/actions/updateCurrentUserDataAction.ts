"use server";

import { jwtDecode } from "jwt-decode";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export default async function updateCurrentUserDataAction(): Promise<void> {
    const cookiesList = await cookies();
    const token = cookiesList.get("access_token")?.value;

    if (token) {
        try {
            const data = jwtDecode<{ sub: string }>(token);
            const userId = data.sub;

            revalidateTag(`user-${userId ?? "unknown"}`);
        }
        catch { }
    }
}
