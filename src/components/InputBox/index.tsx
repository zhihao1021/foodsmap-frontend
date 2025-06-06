"use client"
import { DetailedHTMLProps, InputHTMLAttributes, ReactNode, RefObject, useEffect, useRef } from "react";

import styles from "./index.module.scss";

type propsType = Readonly<{
    error?: boolean,
    title?: string,
    disabled?: boolean,
    next?: () => void,
    focusOnEnabled?: boolean,
}>;

export default function InputBox(props: propsType & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>): ReactNode {
    const {
        error,
        className,
        title,
        disabled,
        next,
        onKeyDown,
        onChange,
        focusOnEnabled,
        ref,
        ...rest
    } = props;

    const customRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!focusOnEnabled || disabled || disabled === undefined) return;

        const element = ((ref || customRef) as RefObject<HTMLInputElement>).current;
        if (!element) return;

        // setTimeout(() => element.focus(), 200);
        element.focus({ preventScroll: true });
    }, [focusOnEnabled, disabled, ref]);

    return <div className={`${styles.inputBox} ${className}`}>
        {title && <span className={styles.title} data-no-context={!props.value}>{title}</span>}
        <input
            {...rest}
            ref={ref || customRef}
            data-error={error === true}
            onChange={!disabled ? onChange : undefined}
            onKeyDown={(e) => {
                onKeyDown?.(e);
                if (e.key === "Enter" && !disabled) next?.();
            }}
            disabled={disabled}
        />
    </div>;
}
