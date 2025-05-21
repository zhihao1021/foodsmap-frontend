"use server";
import { ReactNode } from "react";

import getCurrentUserData from "@/api/user/getCurrentUserData";

import User from "@/schemas/user";

import favicon from "@/assets/favicon.png";

import styles from "./index.module.scss";
import useTokenCache from "@/lib/useTokenCache";

const getUserData = useTokenCache(getCurrentUserData, [], { tags: ["userData"] });

export default async function TopBar(): Promise<ReactNode> {
    let data: User | null = null;
    try {
        data = await getUserData();
        // await getUserData();
        // console.log("TopBar", data);
    } catch { }

    return <div className={styles.topBar}>
        <img src={favicon.src} />
    </div>;
}