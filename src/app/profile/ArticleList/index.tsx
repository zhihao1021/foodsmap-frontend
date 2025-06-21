"use client";

import { useParams } from "next/navigation";
import { ReactNode, useEffect, useRef, useState } from "react";
import styles from "./index.module.scss";
import type { Article } from "@/schemas/article";
import getUserArticlesById from "@/api/user/getUserArticlesById";
import getAvatarSrc from "@/utils/getAvatarSrc";

type propsType = Readonly<{
    userId: string
}>;

export default function ArticleList(props: propsType): ReactNode {
    const {
        userId
    } = props;

    // const { id: userId} = 
    // const userId = "123";

    const [articles, setArticles] = useState<Article[]>([]);
    useEffect(() => {
        if (typeof userId === "string") {
            getUserArticlesById().then(v => setArticles(v.data));
        }
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

    const handleEdit = (article: Article) => {
        alert(`編輯文章：${article.title}`);
        // 可以導頁或開 modal 編輯
    };

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
            <h1 className={styles.user}>使用者：{userId}</h1>
            {articles.map((article) => (
                <>
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
                                    <button onClick={() => handleEdit(article)}> 編輯</button>
                                    <button onClick={() => handleDelete(article.id)}> 刪除</button>
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
                                    // article.mediaUrl.map((url, index) => (
                                    //     <img
                                    //         key={index}
                                    //         // src={article.mediaURL[index]}
                                    //         src={url}
                                    //         alt="article image"
                                    //         className={styles.image}
                                    //         onClick={() => setZoomImage(url)}
                                    //     />
                                    // ))
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
                </>
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