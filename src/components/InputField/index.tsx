import { DetailedHTMLProps, InputHTMLAttributes, ReactNode } from "react";

import InputBox from "../InputBox";

import styles from "./index.module.scss";

type propsType = Readonly<{
    error?: boolean,
    title?: string,
    disabled?: boolean,
    next?: () => void,
    icon: string,
    inputBoxClassName?: string,
    footer?: ReactNode,
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    setValue?: (value: any) => void,
    focusOnEnabled?: boolean,
}>

export default function InputField(props: propsType & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>): ReactNode {
    const {
        error,
        icon,
        className,
        inputBoxClassName,
        footer,
        setValue,
        onChange,
        ...rest
    } = props;

    return <label className={`${styles.inputField} ${className}`} data-error={error === true}>
        <span className="ms">{icon}</span>
        <InputBox
            className={`${styles.inputBox} ${inputBoxClassName}`}
            error={error}
            onChange={setValue ? (e) => { setValue(e.target.value); onChange?.(e) } : onChange}
            {...rest}
        />
        {footer && <div className={styles.footer}>{footer}</div>}
    </label>;
}