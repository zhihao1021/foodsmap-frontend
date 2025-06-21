"use server";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

import getCurrentUserDataCache from "@/cache/user/getCurrentUserData";

import ArticleList from "./ArticleList";


export default async function Profile(): Promise<ReactNode> {
    try {
        const { id } = await getCurrentUserDataCache();

        return <ArticleList userId={id} />
    }
    catch {
        redirect("/login");
    }
}
