"use client";
import { ReactNode, useContext, useMemo, useState } from "react";

import styles from "./index.module.scss";
import { Article } from "@/schemas/article";
import { UserDataContext } from "@/context/userDataContext";
import Image from "next/image";
import getAvatarSrc from "@/utils/getAvatarSrc";
import Link from "next/link";
import getArticleMediaSrc from "@/utils/getArticleMediaSrc";

const spliter = new RegExp(/#[^#\s]+/g);

function getTaggedContext(context: string): ReactNode {
    const tags = context.matchAll(spliter).reduce((prev, cv) => [...prev, cv[0]], [] as string[]);
    const splitedContext: ReactNode[] = context.split(spliter);

    return splitedContext.map((text, index) => <>
        {text}{tags[index] && <span className={styles.tag}>{tags[index]}</span>}
    </>);
}

type propsType = Readonly<{
    data: Article,
    zoomImage: (src: string) => void
}>;

export default function ArticleCard(props: propsType): ReactNode {
    const { data, zoomImage } = props;

    const [likeCount, setLikeCount] = useState<number>(data.likesCount);

    const userDataPair = useContext(UserDataContext);

    const isOwner = useMemo(() => {
        if (!userDataPair) return false;

        return data.author.id === userDataPair.data?.id;
    }, [userDataPair, data]);

    const taggedContext = useMemo(() => getTaggedContext(data.context), [data.context]);


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
                <label>
                    <input type="checkbox" />
                </label>
            </div>
        </div>
    </div >
}