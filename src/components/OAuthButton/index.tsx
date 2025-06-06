import { ReactNode } from "react";

import styles from "./index.module.scss";
import Image from "next/image";

type propsType = Readonly<{
    href: string,
    type: "google",
    displayText: string
}>

const iconMap = {
    "google": "/assets/login-icon/google.svg"
}

export default function OAuthButton(props: propsType): ReactNode {
    const {
        href,
        type,
        displayText
    } = props;

    return <a
        target="_self"
        href={href}
        className={styles.loginButton}
        data-type={type}
    >
        <div className={styles.iconContainer}>
            <Image alt={type} src={iconMap[type]} fill />
        </div>
        <span>{displayText}</span>
    </a>;
}