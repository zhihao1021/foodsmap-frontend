"use client";
import { ReactNode, useEffect, useState } from "react";

import updateCurrentUserData from "@/api/user/updateCurrentUserData";

import InputBox from "@/components/InputBox";
import LoadingStrip from "@/components/LoadingStrip";

import updateUserDataAction from "@/actions/updateUserDataAction";

import shareStyles from "../share.module.scss";
import styles from "./index.module.scss";

type propsType = Readonly<{
    username: string,
    displayName: string
}>;

export default function BasicData(props: propsType): ReactNode {
    const {
        username,
        displayName
    } = props;

    const [newDisplayName, setNewDisplayName] = useState<string>(displayName);
    const [editDisplayName, setEditDisplayName] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [result, setResult] = useState<boolean | null>(null);
    const [message, setMessage] = useState<string>("");

    useEffect(() => {
        if (editDisplayName) return;
        if (newDisplayName === displayName) return;

        setLoading(true);
        updateCurrentUserData({
            displayName: newDisplayName
        }).then(
            () => updateUserDataAction()
        ).then(() => {
            setResult(true);
            setMessage("更新成功！");
        }).catch(() => {
            setResult(false);
            setMessage("更新失敗！");
            setNewDisplayName(displayName);
        }).finally(() => {
            setLoading(false);
            setTimeout(() => setResult(null), 3000)
        })
    }, [editDisplayName, newDisplayName, displayName]);

    return <>
        <h2>基本設定</h2>
        <div className={shareStyles.field}>
            <span>使用者名稱</span>
            <span>{username}</span>
        </div>
        <div className={shareStyles.field}>
            <span>顯示名稱</span>
            {editDisplayName ? <InputBox
                className={shareStyles.inputBox}
                value={newDisplayName}
                onChange={(e) => setNewDisplayName(e.target.value)}
                next={() => setEditDisplayName(false)}
                disabled={!editDisplayName}
                focusOnEnabled
            /> : <span className={`${shareStyles.inputBox} ${styles.changeName}`}>{newDisplayName}</span>}

            <label className="ms-p">
                <input
                    type="checkbox"
                    checked={editDisplayName}
                    onChange={(e) => setEditDisplayName(e.target.checked)}
                />
            </label>
            <LoadingStrip className={shareStyles.loadingStrip} show={loading} fullWidth />
        </div>
        <div className={shareStyles.message} data-success={result ?? "HIDE"}>
            {message}
        </div>
    </>
}