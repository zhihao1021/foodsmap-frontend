"use client";
import { Fragment, ReactNode, useCallback, useEffect, useState } from "react";

import { Article } from "@/schemas/article";

import deleteArticle from "@/api/article/deleteArticle";

import ArticleCard from "@/components/ArticleCard";
import LoadingDots from "@/components/LoadingDots";

import updateArticleDataAction from "@/actions/updateArticleDataAction";
import updateLatestArticleAction from "@/actions/updateLatestArticleAction";

import styles from "./index.module.scss";

type propsType = Readonly<{
    articles?: Article[],
    deleteCallback?: (articleId: string) => void
}>;

export default function ArticleList(props: propsType): ReactNode {
    const {
        articles,
        deleteCallback
    } = props;

    const [articleList, setArticleList] = useState<Article[] | undefined>(articles);
    const [showImage, setShowImage] = useState<boolean>(false);
    const [imageSrc, setImageSrc] = useState<string>("");
    const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);
    const [deleteArticleId, setDeleteArticleId] = useState<string>("");
    const [deleteSuccess, setDeleteSuccess] = useState<boolean>(false);
    const [deleteDialogSection, setDeleteDialogSection] = useState<0 | 1 | 2>(0);

    const handleDelete = useCallback(() => {
        setDeleteDialogSection(1);
        deleteArticle(deleteArticleId).then(async () => {
            await updateArticleDataAction(deleteArticleId)
            await updateLatestArticleAction();
        }).then(async () => {
            await setDeleteSuccess(true);
            setArticleList(prev => prev ? prev.filter(article => article.id !== deleteArticleId) : prev);
            deleteCallback?.(deleteArticleId);
        }).catch(
            () => setDeleteSuccess(false)
        ).finally(
            () => setDeleteDialogSection(2)
        );
    }, [deleteArticleId, deleteCallback]);

    useEffect(() => {
        if (showDeleteDialog) setDeleteDialogSection(0);
    }, [showDeleteDialog])

    useEffect(() => {
        setArticleList(articles)
    }, [articles]);

    return <>
        <div className={styles.zoomImage} data-show={showImage} onClick={event => {
            const target = event.target as HTMLElement;
            if (target.classList.contains(styles.zoomImage)) {
                setShowImage(false);
            }
        }} >
            {imageSrc && <img alt="zoom image" src={imageSrc} />}
            {/* <div className={styles.imageBox}>
            </div> */}
        </div>
        <div className={styles.deleteDialog} data-show={showDeleteDialog} onClick={event => {
            const target = event.target as HTMLElement;
            if (target.classList.contains(styles.deleteDialog)) {
                setShowDeleteDialog(false);
            }
        }}><div className={styles.box}>
                <div className={styles.section} data-show={deleteDialogSection > 0 ? "L" : "C"}>
                    <div className={styles.title}>確定要刪除嗎？</div>
                    <div className={styles.buttons}>
                        <button className={styles.cancel} onClick={() => setShowDeleteDialog(false)}>取消</button>
                        <button className={styles.delete} onClick={handleDelete}>刪除</button>
                    </div>
                </div>
                <div className={styles.section} data-show={deleteDialogSection < 1 ? "R" : deleteDialogSection > 1 ? "L" : "C"}>
                    <LoadingDots className={styles.loadingDots} />
                </div>
                <div className={styles.section} data-show={deleteDialogSection < 2 ? "R" : "C"}>
                    <div className={`${styles.icon} ms-nf`}>{deleteSuccess ? "done_all" : "error"}</div>
                    <div className={styles.info}>{deleteSuccess ? "刪除成功" : "刪除失敗"}</div>
                    <div className={styles.buttons}>
                        <button className={styles.confirm} onClick={() => setShowDeleteDialog(false)}>確認</button>
                    </div>
                </div>
            </div>
        </div >
        <div className={styles.articleList}>
            <LoadingDots className={styles.loadingDots} show={articleList === undefined} />
            {articleList && <>
                {articleList.map((data, index) => <Fragment key={data.id}>
                    {index !== 0 && <hr />}
                    <ArticleCard
                        article={data}
                        zoomImage={src => {
                            setShowImage(true);
                            setImageSrc(src);
                        }}
                        deleteArticle={() => {
                            setDeleteArticleId(data.id);
                            setShowDeleteDialog(true);
                        }}
                    />
                </Fragment>)}
                < div className={styles.bottom}>
                    <div>已經到底了~</div>
                </div>
            </>}
        </div >
    </>
}