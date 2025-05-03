import { ReactNode } from "react";

import LoginForm from "@/components/LoginForm";
import OAuthButton from "@/components/OAuthButton";

import styles from "./page.module.scss";

export default function LoginPage(): ReactNode {
    return <div className={styles.page}>
        <div className={styles.box}>
            <h1>Welcome</h1>
            <LoginForm />
            <div className={styles.or}>or</div>
            <OAuthButton href="" type="google" displayText="Continue with Google" />
        </div>
    </div>;
};
