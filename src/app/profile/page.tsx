"use server";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

import getCurrentUserDataCache from "@/cache/user/getCurrentUserData";
import ArticleList from "@/components/ArticleList";
import getUserArticlesById from "@/api/user/getUserArticlesById";

// import ArticleList from "./ArticleList";

import styles from "./page.module.scss"

export default async function Profile(): Promise<ReactNode> {
    try {
        const { id } = await getCurrentUserDataCache();
        const articles = await getUserArticlesById(id);

        return <div className={styles.profile}>
            <ArticleList articles={articles.data} />
        </div>
    }
    catch {
        redirect("/login");
    }
}
