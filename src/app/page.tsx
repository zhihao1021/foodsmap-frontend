"use server";
import { ReactNode } from "react";

import getLatestArticles from "@/api/article/getLatestArticle";

import styles from "./page.module.scss";
import ArticleList from "@/components/ArticleList";

export default async function HomePage(): Promise<ReactNode> {
    const articles = await getLatestArticles();

    return <div className={styles.homePage}>
        <h1>最新文章</h1>
        <ArticleList articles={articles.data} />
    </div>
}
