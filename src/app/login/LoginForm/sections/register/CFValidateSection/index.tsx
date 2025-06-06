"use client"
import { CSSProperties, ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { Turnstile, TurnstileInstance } from "@marsidev/react-turnstile";

import validateEmail from "@/api/auth/validateEmail";

import SectionState from "../../../sectionState";
import SectionBase from "../../../sections/SectionBase";

import styles from "./index.module.scss";

type propsType = Readonly<{
    setSection: (section: SectionState) => void,
    setIdentifyCode: (identifyCode: string | undefined) => void,
    email: string | undefined,
    currentSection: SectionState,
}>

export default function CFValidateSection(props: propsType): ReactNode {
    const {
        setSection,
        setIdentifyCode,
        email,
        currentSection,
    } = props

    const ref = useRef<TurnstileInstance>(null);

    const [code, setCode] = useState<string | undefined>(undefined);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [windowWidth, setWindowWidth] = useState<number>(-1);
    const [onResize, setOnResize] = useState<(() => void) | undefined>(undefined);

    const width = useMemo(() => {
        if (windowWidth === -1) return 1;
        return Math.min(1, windowWidth * 0.71 / 300);
    }, [windowWidth]);

    useEffect(() => {
        if (currentSection !== SectionState.REGISTER_CF_VALIDATE)
            return;

        setCode(undefined);
        ref.current?.reset();
        ref.current?.render();
        ref.current?.execute();
    }, [currentSection]);

    useEffect(() => {
        if (!email || !code) return;
        setSection(SectionState.LOADING);
        setErrorMessage("");

        validateEmail({ email: email, code: code }).then(identifyCode => {
            setIdentifyCode(identifyCode);
            setSection(SectionState.REGISTER_VALIDATE_EMAIL);
        }).catch(() => {
            setErrorMessage("未知的錯誤，請稍後再試");
            setSection(SectionState.REGISTER_CF_VALIDATE);
        })
    }, [email, code, setIdentifyCode, setSection]);

    useEffect(() => {
        setWindowWidth(window.innerWidth);
        const onResize = () => {
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener("resize", onResize);
        setOnResize(onResize);
    }, []);

    useEffect(() => () => {
        if (onResize === undefined) return;
        window.removeEventListener("resize", onResize);
    }, [onResize])

    return <SectionBase
        errorMessage={errorMessage}
        showState={SectionState.REGISTER_CF_VALIDATE - currentSection}
    >
        <Turnstile
            ref={ref}
            className={styles.cf}
            style={{ "--ratio": width } as CSSProperties}
            siteKey={process.env.NEXT_PUBLIC_CF_TURNSTILE_SITE_KEY || ""}
            onSuccess={code => setTimeout(() => setCode(code), 1000)}
            options={{
                theme: "light",
                size: "flexible",
                execution: "execute",
                appearance: "execute",
            }}
        />
    </SectionBase>;
}