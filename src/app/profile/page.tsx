"use client";

import { ReactNode, useEffect, useState } from "react";
import styles from "./page.module.scss";
import type { Article } from "@/schemas/article";
import getUserArticlesById from "@/api/user/getUserArticlesById";
import getArticleMediaSrc from "@/utils/getArticleMediaSrc";
import ArticleList from "./ArticleList";


export default function UserPage(): ReactNode {
    // const {
    //     userId
    // } = useParams();

    // const { id: userId} = 
    const userId = "123";

    const [articles, setArticles] = useState<Article[]>([]);
    useEffect(() => {
        if (typeof userId === "string") {
            getUserArticlesById().then(v =>setArticles(v.data));
        }
    }, [userId]);
    const [zoomImage, setZoomImage] = useState<string | null>(null);

    return <>
        <ArticleList userId={userId} />
    </>
}