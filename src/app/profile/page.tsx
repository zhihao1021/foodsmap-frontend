"use server";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

import getCurrentUserDataCache from "@/cache/user/getCurrentUserData";
import ArticleList from "@/components/ArticleList";
import getUserArticlesById from "@/api/user/getUserArticlesById";

import styles from "./index.module.scss"
import Image from "next/image";
import getAvatarSrc from "@/utils/getAvatarSrc";
import Profile from "@/components/Profile";

export default async function SelfProfilePage(): Promise<ReactNode> {
    try {
        const userData = await getCurrentUserDataCache();

        return <Profile userData={userData} />
    }
    catch {
        redirect("/login");
    }
}
