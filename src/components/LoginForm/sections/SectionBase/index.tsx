"use client";
import { ReactNode, useEffect, useState } from "react";

import styles from "./index.module.scss";

type propsType = Readonly<{
    children: ReactNode,
    showState: number,
    errorMessage?: string,
    buttonDisabled?: boolean,
    buttonText?: string,
    buttonOnClick?: () => void,
    smallGap?: boolean,
    lastStepOnClick?: () => void
}>;

export default function SectionBase(props: propsType): ReactNode {
    const {
        children,
        showState,
        errorMessage,
        buttonDisabled: buttonDisable,
        buttonText,
        buttonOnClick,
        smallGap,
        lastStepOnClick,
    } = props;

    const [lastShowState, setLastShowState] = useState<number>(showState);
    const [currentShowState, setCurrentShowState] = useState<number>(showState);

    useEffect(() => {
        setCurrentShowState(v => {
            if (Math.abs(v) > 0.2 || v === 0)
                setLastShowState(v === 0 ? 0 : v > 0 ? 1 : -1);
            return showState;
        })
    }, [showState]);

    return <div
        className={styles.section}
        data-show={currentShowState === 0 ? undefined : currentShowState < 0 ? "LEFT" : "RIGHT"}
        data-trans={currentShowState === 0 || lastShowState === 0}
    >
        <div className={styles.inputBlock} data-small-gap={smallGap}>
            {children}
            {errorMessage && <div className={styles.error}>
                <div className="ms">warning</div>
                <div>{errorMessage}</div>
            </div>}
        </div>
        {
            buttonText && buttonOnClick && <>
                <button
                    onClick={buttonOnClick}
                    disabled={buttonDisable}
                    className={styles.nextButton}
                >{buttonText}</button>
                {
                    lastStepOnClick && <button
                        onClick={lastStepOnClick}
                        className={styles.lastButton}
                    >
                        <span className="ms">arrow_back</span>
                        <span>上一步</span>
                    </button>
                }
            </>
        }
    </div>;
}
