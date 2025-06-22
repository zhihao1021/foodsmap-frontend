"use client";
import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

import styles from "./index.module.scss";
import { useRouter } from "next/navigation";

export default function BackButton(props: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) {
    const {
        className,
        onClick,
        ...restProps
    } = props;

    const router = useRouter();

    return <button
        className={`${styles.button} ${className || ""}`.trim()}
        onClick={event => {
            onClick?.(event);
            router.back()
        }}
        {...restProps}
    >返回上一頁</button>
}