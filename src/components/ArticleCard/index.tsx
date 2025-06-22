"use client";
import { ChangeEvent, Fragment, ReactNode, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Article } from "@/schemas/article";

import { UserDataContext } from "@/context/userDataContext";

import likeArticle from "@/api/article/likeArticle";
import dislikeArticle from "@/api/article/dislikeArticle";

import getAvatarSrc from "@/utils/getAvatarSrc";
import getArticleMediaSrc from "@/utils/getArticleMediaSrc";
import countToString from "@/utils/countToString";
import timestampToDelta from "@/utils/timestampToDelta";
import timestampToString from "@/utils/timestampToString";

import styles from "./index.module.scss";

const spliter = new RegExp(/#[^#\s]+/g);

function getTaggedContext(context: string): ReactNode {
    const tags = context.matchAll(spliter).reduce((prev, cv) => [...prev, cv[0]], [] as string[]);
    const splitedContext: ReactNode[] = context.split(spliter);

    return splitedContext.map((text, index) => <Fragment key={index}>
        {text}{tags[index] && <span className={styles.tag}>{tags[index]}</span>}
    </Fragment>);
}

type propsType = Readonly<{
    article: Article,
    zoomImage: (src: string) => void,
    deleteArticle: () => void
}>;

export default function ArticleCard(props: propsType): ReactNode {
    const { article, zoomImage, deleteArticle } = props;

    const toolBoxRef = useRef<HTMLDivElement>(null);

    const [data, setData] = useState<Article>(article);
    const [openToolBox, setOpenToolBox] = useState<boolean>(false);

    const userDataPair = useContext(UserDataContext);

    const isOwner = useMemo(() => {
        if (!userDataPair) return false;

        return data.author.id === userDataPair.data?.id;
    }, [userDataPair, data]);

    const taggedContext = useMemo(() => getTaggedContext(data.context), [data.context]);
    const createTimeDelta = useMemo(() => timestampToDelta(data.createTime), [data.createTime]);
    const createTimeString = useMemo(() => timestampToString(data.createTime), [data.createTime]);
    const editTimeString = useMemo(() => timestampToString(data.editTime), [data.editTime]);

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

    useEffect(() => {
        const func = (e: MouseEvent) => {
            if (!toolBoxRef.current?.contains(e.target as HTMLElement)) {
                setOpenToolBox(false);
            }
        };
        document.addEventListener("click", func);

        return () => document.removeEventListener("click", func);
    }, []);

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
            <div className={styles.datetime}>
                {createTimeDelta}
                {data.createTime !== data.editTime && <span className={styles.update}> (已編輯)</span>}
                <div className={styles.detail}>
                    <div>{createTimeString}</div>
                    {
                        data.createTime !== data.editTime &&
                        <div className={styles.edit}>編輯於 {editTimeString}</div>
                    }
                </div>
            </div>
            {isOwner && <div ref={toolBoxRef} className={styles.toolBox} data-open={openToolBox}>
                <button className={`ms ${styles.icon}`} onClick={() => setOpenToolBox(v => !v)}>more_horiz</button>
                <div className={styles.toolMenuMask}>
                    <div className={styles.toolMenu}>
                        <Link href={`/edit-article/${data.id}`} className={styles.option}>
                            <span className={`ms ${styles.icon}`}>edit</span>
                            <span>編輯</span>
                        </Link>
                        <div className={`${styles.option} ${styles.delete}`} onClick={deleteArticle}>
                            <span className={`ms ${styles.icon}`}>delete</span>
                            <span>刪除</span>
                        </div>
                    </div>
                </div>
            </div>}
        </div>
        <div className={styles.contentBox}>
            <div className={styles.titleBox}>
                <h3>{data.title}</h3>
                {data.googleMapUrl && <a
                    href={data.googleMapUrl}
                    target="_blank"
                    referrerPolicy="no-referrer"
                    className={`ms-nf ${styles.pin}`}
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
                <label>
                    <input type="checkbox" checked={data.likedByUser} onChange={handleLike} />
                </label>
                <div className={styles.count}>{countToString(data.likesCount)}</div>
            </div>
        </div>
    </div >
}