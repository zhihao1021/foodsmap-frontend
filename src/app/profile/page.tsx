"use server";
import { ReactNode } from "react";

import getCurrentUserDataCache from "@/cache/user/getCurrentUserData";

import ArticleList from "./ArticleList";


export default async function Profile(): Promise<ReactNode> {
    const { id } = await getCurrentUserDataCache();

    return <ArticleList userId={id} />
}