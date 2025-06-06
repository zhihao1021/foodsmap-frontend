"use server";
import { ReactNode } from "react";

import getCurrentUserData from "@/api/user/getCurrentUserData";

import tokenCache from "@/lib/useTokenCache";

import BasicData from "./BasicData";
import ChangeEmail from "./ChangeEmail";

import styles from "./page.module.scss";
import { redirect } from "next/navigation";

const getUserData = tokenCache(getCurrentUserData, [], { tags: ["userData"] });

export default async function ProfilePage(): Promise<ReactNode> {
    try {
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
    }
    catch {
        redirect("/login");
    }
};
