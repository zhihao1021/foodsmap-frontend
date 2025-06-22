"use client";
import Image from "next/image";
import { ReactNode, useEffect, useState } from "react";

import { GlobalUser } from "@/schemas/user";
import { Article } from "@/schemas/article";

import getUserArticlesById from "@/api/user/getUserArticlesById";

import ArticleList from "@/components/ArticleList";

import getAvatarSrc from "@/utils/getAvatarSrc";

import styles from "./index.module.scss"

type propsType = Readonly<{
    userData: GlobalUser
}>;

export default function Profile(props: propsType): ReactNode {
    const { id, username, displayName } = props.userData;

    const [articles, setArticles] = useState<Article[]>();
    const [nextToken, setNextToken] = useState<string | null>(null);

    useEffect(() => {
        getUserArticlesById(id).then(data => {
            setArticles(data.data);
            setNextToken(data.token);
        })
    }, []);

    return <div className={styles.profile}>
        <div className={styles.profileHeader}>
            <div className={styles.avatarBox}>
                <Image alt="user avatar" src={getAvatarSrc(id)} fill unoptimized />
            </div>
            <h1 className={styles.displayName}>{displayName} 的主頁</h1>
            <h2 className={styles.username}>@{username}</h2>
        </div>
        <ArticleList
            articles={articles}
            deleteCallback={articleId => setArticles(prev => prev ? prev.filter(article => article.id !== articleId) : prev)}
        />
    </div>
}
