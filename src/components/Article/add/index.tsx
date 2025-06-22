"use client";
import { useState } from "react";
import styles from "./index.module.scss";
import InputBox from "@/components/InputBox";
import createNewArticle from "@/api/article/createNewArticle";
import updateLatestArticleAction from "@/actions/updateLatestArticleAction";

export default function AddArticle() {
    const [title, setTitle] = useState<string>("");
    const [context, setContext] = useState<string>("");
    const [message, setMessage] = useState("");
    const [mediaList, setMediaList] = useState<File[]>([]);
    const [mediaPreview, setMediaPreview] = useState<string[]>([]);
    const [googleMapUrl, setGoogleMapUrl] = useState<string>("");
    // const [hashtags, setHashtags] = useState<string[]>([]);
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // const files = e.target.files ? e.target.files[0] : null;
        const files = e.target.files;
        if (files) {
            // 加上新的 File

            const fileArray = Array.from(files);
            setMediaList((prevList) => [...prevList, ...fileArray]);
            setMediaPreview(prev => [...prev, ...fileArray.map(file => URL.createObjectURL(file))]);
            e.target.value = ''; // 清空 input 的值
        }

        // else {
        //     setMediaList(null);
        //     setMessage("未選擇檔案");
        // }
    };

    const handleSubmit = () => {
        // Handle form submission logic here
        if (!title || !context) {
            setMessage("請填寫標題和內文欄位");
            return;
        }
        console.log("Title:", title);
        console.log("Content:", context);
        console.log("Google Map URL:", googleMapUrl);

        createNewArticle({
            title: title,
            context: context,
            googleMapUrl: googleMapUrl,
        }, mediaList).then(() => updateLatestArticleAction()).then(() => {
            setMessage("文章新增成功！");
            setTitle("");
            setContext("");
            setMediaList([]);
            setMediaPreview([]);
            setGoogleMapUrl("");
        })
    };
    const handleRemoveMedia = (indexToRemove: number) => {
        setMediaPreview(prev => prev?.filter((_, i) => i !== indexToRemove) || []);
        setMediaList(prev => prev?.filter((_, i) => i !== indexToRemove) || []);
    };
    return (
        <div className={styles.header}>
            <h2>新增文章</h2>
            <div className={styles.container}>
                {/* <label className={styles.label}>標題</label> */}
                <InputBox
                    className={styles.titleInputBox}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    title="文章標題"
                    placeholder="早安美資城"
                />
                <InputBox
                    className={styles.mapInputBox}
                    value={googleMapUrl}
                    onChange={(e) => setGoogleMapUrl(e.target.value)}
                    title="Google Map 連結"
                    placeholder="https://www.google.com/maps/place/..."
                />
                {/* <label className={styles.label}>內容</label> */}
                <textarea
                    className={styles.textarea}
                    value={context}
                    onChange={(e) => setContext(e.target.value)}
                    placeholder="輸入文章內容"
                />

                {/* <div className={styles.label}>新增hashtag</div> */}

                {/* <div className={styles.label}>上傳圖片或影片</div> */}
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
                        發佈
                    </button>
                </div>

                {message && <div className={styles.message}>{message}</div>}
            </div>
        </div>
    );

}