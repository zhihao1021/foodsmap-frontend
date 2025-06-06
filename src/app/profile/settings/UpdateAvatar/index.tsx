"use client";
import { ChangeEvent, ReactNode, useCallback, useEffect, useRef, useState } from "react";

import getAvatarSrc from "@/utils/getAvatarSrc";

import styles from "./index.module.scss";
import Image from "next/image";
import updateCurrentUserAvatar from "@/api/avatar/updateCurrentUserAvatar";

type propsType = Readonly<{
    id: string
}>;

export default function UpdateAvatar(props: propsType): ReactNode {
    const { id } = props;

    const fileRef = useRef<HTMLInputElement>(null);

    const [src, setSrc] = useState<string>(getAvatarSrc(id));
    const [loading, setLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [realErrorMessage, setRealErrorMessage] = useState<string>("");
    const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);

    const updateAvatar = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setLoading(true);
        updateCurrentUserAvatar(file).then(() => {
            setSrc(`${getAvatarSrc(id)}?t=${Date.now()}`);
        }).catch(() => setErrorMessage("變更失敗")).finally(() => {
            if (fileRef.current) fileRef.current.value = "";
            setLoading(false);
        });
    }, [id]);

    useEffect(() => {
        setShowErrorMessage(errorMessage !== "");
        if (errorMessage) {
            setRealErrorMessage(errorMessage);
            setTimeout(() => setShowErrorMessage(false), 3000);
        }
    }, [errorMessage]);

    useEffect(() => {
        if (!showErrorMessage) setErrorMessage("");
    }, [showErrorMessage]);

    return <>
        <h2>更換頭像</h2>
        <label className={styles.avatarBox}>
            <Image alt="avatar" src={src} fill />
            <input
                ref={fileRef}
                type="file"
                accept="image/png,image/jpeg"
                onChange={updateAvatar}
            />
            <div className={styles.loading} data-show={loading} />
        </label>
        <div className={styles.errorMessage} data-open={showErrorMessage}>
            <div>{realErrorMessage}</div>
        </div >
    </>
}