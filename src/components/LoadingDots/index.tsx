import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

import styles from "./index.module.scss";

type propsType = Readonly<{
    show?: boolean
}> & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export default function LoadingDots(props: propsType): ReactNode {
    const { show, className, ...rest } = props;

    return <div
        className={`${styles.loading} ${className || ""}`.trim()} {...rest}
        data-show={show === false ? "false" : "true"}
    >
        {Array.from({ length: 3 }).map((_, index) => <div key={index} />)}
    </div>
}