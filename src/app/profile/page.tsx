"use server";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

import getCurrentUserDataCache from "@/cache/user/getCurrentUserData";

import Profile from "@/components/Profile";

export default async function SelfProfilePage(): Promise<ReactNode> {
    try {
        const userData = await getCurrentUserDataCache();

        return <Profile userData={userData} />
    }
    catch {
        redirect("/login");
    }
}
