"use client";
import { redirect } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

import getCurrentUserDataCache from "@/cache/user/getCurrentUserData";
import ArticleList from "@/components/ArticleList";
import getUserArticlesById from "@/api/user/getUserArticlesById";

import styles from "./index.module.scss"
import Image from "next/image";
import getAvatarSrc from "@/utils/getAvatarSrc";
import { GlobalUser } from "@/schemas/user";
import { Article } from "@/schemas/article";
import LoadingStrip from "@/components/LoadingStrip";
import LoadingDots from "../LoadingDots";

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
        <LoadingDots show={articles === undefined} />
        {
            articles !== undefined && <ArticleList articles={articles} />
        }
    </div>
}
