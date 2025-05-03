"use client";
import { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";

import InputField from "@/components/InputField";
import SectionState from "@/components/LoginForm/sectionState";
import SectionBase from "@/components/LoginForm/sections/SectionBase";

type propsType = Readonly<{
    setSection: (section: SectionState) => void,
    password: string | undefined,
    setPassword: (password: string | undefined) => void,
    currentSection: SectionState
}>

export default function PasswordSection(props: propsType): ReactNode {
    const {
        setSection,
        password,
        setPassword,
        currentSection,
    } = props

    const confirmInputRef = useRef<HTMLInputElement>(null);

    const [passwordConfirm, setPasswordConfirm] = useState<string | undefined>(undefined);

    const passwordCheck = useMemo(() => {
        const reg = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[\d])(?=.*[^A-Za-z0-9]).{8,}$/);
        return reg.test(password || "");
    }, [password]);

    const passwordMatch = useMemo(() => {
        return passwordCheck && password === passwordConfirm
    }, [passwordCheck, password, passwordConfirm]);

    const next = useCallback(() => {
        if (!passwordMatch) return;
        setSection(SectionState.REGISTER_CF_VALIDATE);
    }, [passwordMatch, setSection]);

    useEffect(() => {
        if (password === undefined) setPasswordConfirm(undefined);
    }, [password]);

    return <SectionBase
        showState={SectionState.REGISTER_PASSWORD - currentSection}
        buttonText="下一步"
        buttonOnClick={next}
        buttonDisabled={!passwordMatch}
        lastStepOnClick={() => setSection(SectionState.REGISTER_DISPLAY_NAME)}
        smallGap
    >
        <InputField
            icon="password"
            type="password"
            title="密碼"
            placeholder="Passw0rd."
            error={password !== undefined && !passwordCheck}
            value={password || ""}
            setValue={setPassword}
            footer={<span>至少 8 位大小寫英數及符號</span>}
            disabled={currentSection !== SectionState.REGISTER_PASSWORD}
            next={() => confirmInputRef.current?.focus()}
            focusOnEnable
        />
        <InputField
            ref={confirmInputRef}
            icon="done_all"
            type="password"
            title="確認密碼"
            placeholder="Passw0rd."
            error={passwordConfirm !== undefined && password !== passwordConfirm}
            value={passwordConfirm || ""}
            setValue={setPasswordConfirm}
            disabled={currentSection !== SectionState.REGISTER_PASSWORD}
            next={next}
        />
    </SectionBase>;
}