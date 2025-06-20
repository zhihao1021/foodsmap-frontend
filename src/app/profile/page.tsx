"use client";

import { ReactNode, useEffect, useState } from "react";
import styles from "./page.module.scss";
import type { Article } from "@/schemas/article";
import getUserArticlesById from "@/api/user/getUserArticlesById";
import getArticleMediaSrc from "@/utils/getArticleMediaSrc";


export default function UserPage(): ReactNode {
    // const {
    //     userId
    // } = useParams();

    // const { id: userId} = 
    const userId = "123";

    const [articles, setArticles] = useState<Article[]>([]);
    useEffect(() => {
        if (typeof userId === "string") {
            getUserArticlesById(userId).then(setArticles);
        }
    }, [userId]);
    const [zoomImage, setZoomImage] = useState<string | null>(null);

    return (
        <main className={styles.container}>
            <h1 className={styles.user}>使用者：{userId}</h1>
            {articles.map((article) => (
                <div key={article.id} className={styles.articleCard}>
                    <div className={styles.titleBox}>
                        <h2 className={styles.title}>{article.title}</h2>
                        <a className={`ms-nf ${styles.googleMapURL}`}
                            href={article.googleMapUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                        // >location_on
                        >pin_drop
                        </a>
                        <div className={styles.date}>
                            {new Date(article.createTime).toLocaleDateString()}
                        </div>
                    </div>

                    <p className={styles.context}>{article.context}</p>

                    <div className={styles.footer}>
                        <div className={styles.likes}>
                            <span className="ms-nf">thumb_up</span>
                            <span>{article.likesCount}</span>
                        </div>
                        <span className={styles.tags}>
                            {article.tags.map((tag) => `#${tag} `)}
                        </span>
                    </div>
                    <div className={styles.imageList}>
                        {
                            article.mediaList.map(v => getArticleMediaSrc(article.id, v)).map(src => (
                                <img
                                    key={src}
                                    src={src}
                                    alt="article image"
                                    className={styles.image}
                                    onClick={() => setZoomImage(src)}
                                />
                            ))}
                    </div>
                    {/* {article.googleMapURL && (
                        <a
                            href={article.googleMapURL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.googleMapURL}
                        >
                            check Google Map
                        </a>
                    )} */}
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