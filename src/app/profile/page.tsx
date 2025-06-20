"use client";

import { useParams } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import styles from "./page.module.scss";
import type { Article } from "@/schemas/article";
import getUserArticles from "@/api/user/getUserArticles";


export default function UserPage(): ReactNode {
    // const {
    //     userId
    // } = useParams();

    // const { id: userId} = 
    const userId = "123";

    const [articles, setArticles] = useState<Article[]>([]);
    useEffect(() => {
        if (typeof userId === "string") {
            getUserArticles(userId).then(setArticles);
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
                            href={article.googleMapURL}
                            target="_blank"
                            rel="noopener noreferrer"
                        // >location_on
                        >pin_drop
                        </a>
                        <div className={styles.date}>
                            {article.date && new Date(article.date).toLocaleDateString()}
                        </div>
                    </div>

                    <p className={styles.context}>{article.context}</p>

                    <div className={styles.footer}>
                        <div className={styles.likes}>
                            <span className="ms-nf">thumb_up</span>
                            <span>{article.like}</span>
                        </div>
                        <span className={styles.tags}>
                            {article.tags.map((tag) => `#${tag} `)}
                        </span>
                    </div>
                    <div className={styles.imageList}>
                        {
                            article.mediaURL.map((url, index) => (
                                <img
                                    key={index}
                                    // src={article.mediaURL[index]}
                                    src={url}
                                    alt="article image"
                                    className={styles.image}
                                    onClick={() => setZoomImage(url)}
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