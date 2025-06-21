"use client";
import { ChangeEvent, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";

import styles from "./index.module.scss";
import { Article } from "@/schemas/article";
import { UserDataContext } from "@/context/userDataContext";
import Image from "next/image";
import getAvatarSrc from "@/utils/getAvatarSrc";
import Link from "next/link";
import getArticleMediaSrc from "@/utils/getArticleMediaSrc";
import likeArticle from "@/api/article/likeArticle";
import dislikeArticle from "@/api/article/dislikeArticle";
import countToString from "@/utils/countToString";

const spliter = new RegExp(/#[^#\s]+/g);

function getTaggedContext(context: string): ReactNode {
    const tags = context.matchAll(spliter).reduce((prev, cv) => [...prev, cv[0]], [] as string[]);
    const splitedContext: ReactNode[] = context.split(spliter);

    return splitedContext.map((text, index) => <>
        {text}{tags[index] && <span className={styles.tag}>{tags[index]}</span>}
    </>);
}

type propsType = Readonly<{
    article: Article,
    zoomImage: (src: string) => void
}>;

export default function ArticleCard(props: propsType): ReactNode {
    const { article, zoomImage } = props;

    const [data, setData] = useState<Article>(article);

    const userDataPair = useContext(UserDataContext);

    const isOwner = useMemo(() => {
        if (!userDataPair) return false;

        return data.author.id === userDataPair.data?.id;
    }, [userDataPair, data]);

    const taggedContext = useMemo(() => getTaggedContext(data.context), [data.context]);

    const handleLike = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const checked = event.target.checked;

        if (checked) {
            likeArticle(data.id).then(() => {
                setData(prev => ({
                    ...prev,
                    likesCount: prev.likesCount + 1,
                    likedByUser: true
                }));
            })
        }
        else {
            dislikeArticle(data.id).then(() => {
                setData(prev => ({
                    ...prev,
                    likesCount: prev.likesCount - 1,
                    likedByUser: false
                }));
            });
        }
    }, [data]);

    useEffect(() => setData(data), [article]);

    return <div className={styles.articleCard}>
        <div className={styles.authorBox}>
            <div className={styles.avatarBox}>
                <Image
                    alt="author avatar"
                    fill unoptimized
                    src={getAvatarSrc(data.author.id)}
                />
            </div>
            <Link href={`/user/${data.author.id}`} className={styles.nameBox}>
                <div
                    className={styles.displayName}
                    title={data.author.displayName}
                >{data.author.displayName}</div>
                <div
                    className={styles.username}
                    title={data.author.username}
                >{`@${data.author.username}`}</div>
            </Link>
        </div>
        <div className={styles.contentBox}>
            <div className={styles.titleBox}>
                <h3>{data.title}</h3>
                {<a
                    href={data.googleMapUrl}
                    target="_blank"
                    referrerPolicy="no-referrer"
                    className="ms-nf"
                >pin_drop</a>}
            </div>
            <div className={styles.contextBox}>
                {taggedContext}
            </div>
            <div className={styles.imageBox}>
                <div className={styles.imageList}>
                    {data.mediaList.map(mediaId => (
                        <div
                            key={mediaId}
                            className={styles.image}
                            onClick={() => zoomImage(getArticleMediaSrc(data.id, mediaId))}
                        >
                            <Image
                                alt={`media-${mediaId}`}
                                fill unoptimized
                                src={getArticleMediaSrc(data.id, mediaId)}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
        <div className={styles.functionBox}>
            <div className={styles.likeBox}>
                <label className="ms-p">
                    <input type="checkbox" checked={data.likedByUser} onChange={handleLike} />
                </label>
                <div>{countToString(data.likesCount)}</div>
            </div>
        </div>
    </div >
}