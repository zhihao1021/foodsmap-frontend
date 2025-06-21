"use client";
import { ReactNode, useContext, useEffect, useMemo, useRef, useState } from "react";

import type { Article } from "@/schemas/article";

import getUserArticlesById from "@/api/user/getUserArticlesById";
import getAvatarSrc from "@/utils/getAvatarSrc";

import styles from "./index.module.scss";
import getArticleMediaSrc from "@/utils/getArticleMediaSrc";
import Link from "next/link";
import deleteArticle from "@/api/article/deleteArticle"; // 接下來會做的 API
import ArticleCard from "@/components/ArticleCard";
import { UserDataContext } from "@/context/userDataContext";


type propsType = Readonly<{
    userId: string
}>;

export default function ArticleList(props: propsType): ReactNode {
    const {
        userId
    } = props;

    const data = useContext(UserDataContext);

    const {
        displayName,
        username
    } = useMemo(() => {
        if (data?.data) {
            return data.data;
        }

        return {
            displayName: "",
            username: ""
        };
    }, [data]);

    const avatarSrc = useMemo(() => getAvatarSrc(userId), [userId]);

    const [articles, setArticles] = useState<Article[]>([]);
    useEffect(() => {
        getUserArticlesById(userId).then(v => setArticles(v.data));
    }, [userId]);


    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setOpenMenuId(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleDelete = (articleId: string) => {
        const confirmDelete = confirm("確定要刪除這篇文章嗎？");
        if (confirmDelete) {
            // 呼叫刪除 API
            alert(`刪除文章 ID：${articleId}`);
        }
    };


    const [zoomImage, setZoomImage] = useState<string | null>(null);
    const [openMenuId, setOpenMenuId] = useState<string | null>(null); // 控制哪一篇文章打開選單
    const menuRef = useRef<HTMLDivElement | null>(null);
    return (
        <main className={styles.container}>
            <div className={styles.profileBox}>
                <img src={avatarSrc} alt="avatar" className={styles.avatarLarge} />
                <div className={styles.userInfo}>
                    <div className={styles.displayName}>{displayName}</div>
                    <div className={styles.username}>@{username}</div>

                </div>
            </div>
            {articles[0] && <ArticleCard article={articles[0]} zoomImage={setZoomImage} />}
            {articles.map((article) => (
                <div key={article.id} className={styles.articleHeader}>
                    <div className={styles.authorInfo}>
                        {(
                            <img src={getAvatarSrc(article.author.id)} alt="avatar" className={styles.avatar} />
                        )}
                        <span className={styles.author}>{article.author.displayName}</span>
                    </div>



                    <div key={article.id} className={styles.articleCard}>
                        <button className={`ms-nf ${styles.more}`}
                            onClick={() => setOpenMenuId(openMenuId === article.id ? null : article.id)}

                        >more_horiz
                        </button>

                        {openMenuId === article.id && (
                            <div className={styles.menu} ref={menuRef}>
                                <Link href={`/edit/${article.id}`}>編輯</Link>
                                <button onClick={() => handleDelete(article.id)}>刪除</button>
                            </div>
                        )}


                        <div className={styles.titleBox}>
                            <h2 className={styles.title}>{article.title}</h2>
                            <a className={`ms-nf ${styles.googleMapUrl}`}
                                href={article.googleMapUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                            // >location_on
                            >pin_drop
                            </a>
                            <div className={styles.createTime}>
                                {article.createTime && new Date(article.createTime).toLocaleDateString()}
                            </div>
                        </div>

                        <p className={styles.context}>{article.context}</p>

                        <div className={styles.footer}>
                            <span className={styles.tags}>
                                {article.tags.map((tag) => `#${tag} `)}
                            </span>
                            <div className={styles.likes}>
                                <span className="ms-nf">thumb_up</span>
                                <span>{article.likesCount}</span>
                            </div>

                        </div>
                        <div className={styles.imageList}>
                            {
                                article.mediaList.map(mediaId => (
                                    <img
                                        key={mediaId}
                                        // src={article.mediaURL[index]}
                                        src={getArticleMediaSrc(article.id, mediaId)}
                                        alt="article image"
                                        className={styles.image}
                                        onClick={() => setZoomImage(getArticleMediaSrc(article.id, mediaId))}
                                    />
                                ))
                            }
                        </div>
                        {/* {article.googleMapUrl && (
                                <a
                                    href={article.googleMapUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.googleMapUrl}
                                >
                                    check Google Map
                                </a>
                            )} */}
                    </div>
                    <hr className={styles.hr} />
                </div>
            ))}

            {zoomImage && (
                <div className={styles.overlay} onClick={() => setZoomImage(null)}>
                    <img
                        src={zoomImage}
                        alt="zoomed"
                        className={styles.zoomedImage}
                        onClick={() => setZoomImage(null)}
                    />
                </div>
            )
            }
        </main >
    );
}