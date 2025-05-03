import { ReactNode } from "react";

import styles from "./index.module.scss";

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
        <img alt={type} src={iconMap[type]} />
        <span>{displayText}</span>
    </a>;
}