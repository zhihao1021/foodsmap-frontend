"use server";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { cookies } from "next/headers";
import { redirect, RedirectType } from "next/navigation";
import { ReactNode } from "react";

import JWTPayload from "@/schemas/jwtPayload";

import OAuthButton from "@/components/OAuthButton";

import LoginForm from "./LoginForm";

import styles from "./page.module.scss";

export default async function LoginPage(): Promise<ReactNode> {
    const cookiesList = await cookies();
    const token = cookiesList.get("access_token")?.value;

    if (token) {
        let data: JwtPayload | null = null;

        try {
            data = jwtDecode(token) as JWTPayload;
        }
        catch { };

        const now = Date.now() / 1000;

        if (data?.exp && data.exp > now) {
            redirect("/profile", RedirectType.replace);
        }
    }


    return <div className={styles.page}>
        <div className={styles.box}>
            <h1>Welcome</h1>
            <LoginForm />
            <div className={styles.or}>or</div>
            <OAuthButton href="" type="google" displayText="Continue with Google" />
        </div>
    </div>;
};
