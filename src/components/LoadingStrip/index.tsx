import { ReactNode } from "react";

import styles from "./index.module.scss";

type propsType = Readonly<{
    show: number,
    className?: string
}>

export default function LoadingStrip(props: propsType): ReactNode {
    const { show, className } = props;

    return <div className={`${styles.loadingStrip} ${className}`} data-show={show === 0 ? "SHOW" : show > 0 ? "RIGHT" : "LEFT"}>
        <div className={styles.box}>
            <div className={styles.strip} />
        </div>
    </div>;
}