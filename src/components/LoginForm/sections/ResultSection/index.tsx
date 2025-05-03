"use client";
import { ReactNode, useEffect, useState } from "react";

import SectionBase from "../SectionBase";
import SectionState from "../../sectionState";

import styles from "./index.module.scss";

type propsType = Readonly<{
    success: boolean,
    message: string,
    restart: () => void
    currentSection: SectionState
}>;

export default function ResultSection(props: propsType): ReactNode {
    const {
        success,
        message,
        restart,
        currentSection
    } = props;

    const [showProgress, setShowProgress] = useState<boolean>(false);

    useEffect(() => {
        setShowProgress(success && currentSection === SectionState.RESULT);
    }, [success, currentSection]);

    return <SectionBase
        showState={SectionState.RESULT - currentSection}
        buttonText={!success ? "返回" : undefined}
        buttonOnClick={!success ? restart : undefined}
    >
        <div className="ms">{success ? "task_alt" : "error"}</div>
        <div>{message}</div>
        {
            success && <div data-show={showProgress} className={styles.progress} />
        }
    </SectionBase>;
}