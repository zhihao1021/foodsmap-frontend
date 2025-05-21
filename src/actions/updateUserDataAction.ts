"use server";

import { revalidateTag } from "next/cache";

export default async function updateUserDataAction(): Promise<void> {
    revalidateTag("userData");
}
