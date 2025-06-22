"use server";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

import getCurrentUserDataCache from "@/cache/user/getCurrentUserData";

import BasicData from "./BasicData";
import ChangeEmail from "./ChangeEmail";
import UpdateAvatar from "./UpdateAvatar";

import styles from "./page.module.scss";

export default async function ProfilePage(): Promise<ReactNode> {
    try {
        const {
            id,
            username,
            displayName,
            email,
        } = await getCurrentUserDataCache();

        return <div className={styles.profile}>
            <h1>帳號設定</h1>
            <UpdateAvatar id={id} />
            <BasicData
                username={username}
                displayName={displayName}
            />
            <ChangeEmail
                email={email}
            />
        </div>;
    }
    catch {
        redirect("/login");
    }
};
