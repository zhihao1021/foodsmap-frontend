"use server";
import { ReactNode } from "react";

import getCurrentUserData from "@/api/user/getCurrentUserData";

import useTokenCache from "@/lib/useTokenCache";

import BasicData from "./BasicData";
import ChangeEmail from "./ChangeEmail";

import styles from "./page.module.scss";

const getUserData = useTokenCache(getCurrentUserData, [], { tags: ["userData"] });

export default async function ProfilePage(): Promise<ReactNode> {
    const {
        username,
        displayName,
        email,
    } = await getUserData();

    return <div className={styles.profile}>
        <h1>帳號設定</h1>
        <BasicData
            username={username}
            displayName={displayName}
        />
        <ChangeEmail
            email={email}
        />
    </div>;
};
