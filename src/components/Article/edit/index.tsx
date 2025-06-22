"use client";

import { Article } from "@/schemas/article";
import { useState } from "react";
import styles from "./index.module.scss";
import InputBox from "@/components/InputBox";
import updateArticle from "@/api/article/updateArticle";
import { useRouter } from "next/navigation";
import { profile } from "node:console";
import updateArticleDataAction from "@/actions/updateArticleDataAction";


export default function EditArticle({ article }: { article: Article }) {
    const [title, setTitle] = useState<string>(article.title || "");
    const [context, setContext] = useState<string>(article.context);
    const [message, setMessage] = useState("");
    const [mediaList, setMediaList] = useState<File[]>([]);
    const [mediaPreview, setMediaPreview] = useState<string[]>([]);
    const [googleMapUrl, setGoogleMapUrl] = useState<string>(article.googleMapUrl);
    const router = useRouter();
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            // 加上新的 File
            const fileArray = Array.from(files);
            setMediaList((prevList) => [...prevList, ...fileArray]);
            setMediaPreview(prev => [...prev, ...fileArray.map(file => URL.createObjectURL(file))]);
            e.target.value = ''; // 清空 input 的值
        }
    };
    const handleRemoveMedia = (indexToRemove: number) => {
        setMediaPreview(prev => prev?.filter((_, i) => i !== indexToRemove) || []);
        setMediaList(prev => prev?.filter((_, i) => i !== indexToRemove) || []);
    };
    const handleSubmit = () => {
        // Handle form submission logic here
        if (!title || !context) {
            setMessage("請填寫所有欄位");
            return;
        }
        console.log("Title:", title);
        console.log("Content:", context);

        updateArticle(article.id, {
            title: title,
            context: context,
            googleMapUrl: googleMapUrl,
        }).then(() => updateArticleDataAction(article.id)).then(() => {
            setMessage("文章編輯成功！");
            router.push(`/profile`); // 返回文章頁面
            //返回個人頁面


            // setTitle("");
            // setContext("");
            // setMediaList([]);
            // setMediaPreview([]);
        })
    };
    return (
        <div className={styles.header}>
            <h2>編輯文章</h2>
            <div className={styles.container}>
                <InputBox
                    className={styles.titleInputBox}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}

                />
                <InputBox
                    className={styles.mapInputBox}
                    value={googleMapUrl}
                    onChange={(e) => setGoogleMapUrl(e.target.value)}

                />
                <textarea
                    className={styles.textarea}
                    value={context}
                    onChange={(e) => setContext(e.target.value)}
                />

                <div className={styles.imageList}>
                    {
                        mediaList && mediaPreview?.map((url, index) => <div
                            key={index}
                            className={styles.pictureBox}
                        >
                            <button
                                className={`ms ${styles.removeButton}`}
                                onClick={() => handleRemoveMedia(index)}

                            >close</button>
                            {
                                mediaList[index] && mediaList[index].type.startsWith("image/") ? <img src={url} /> : <video src={url} />
                            }
                        </div>)
                    }
                    <label className={styles.pictureBox}>
                        <input
                            type="file"
                            accept="image/*,video/*"
                            multiple
                            onChange={handleFileChange}
                        />
                        <span className={`ms-nf ${styles.photo_library}`}>photo_library</span>
                    </label>
                </div>

                <div className={styles.buttonBox}>
                    <button className={styles.button} onClick={handleSubmit}>
                        儲存變更
                    </button>
                </div>

                {message && <div className={styles.message}>{message}</div>}
            </div>
        </div>
    )
}