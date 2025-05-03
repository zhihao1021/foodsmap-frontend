"use server"

import { revalidatePath } from "next/cache"

export async function refreshProfile(): Promise<void> {
    revalidatePath("/profile");
}
