"use client";
import { AxiosError } from "axios";
import { ReactNode, useCallback, useMemo, useState } from "react";

import checkUsername from "@/api/auth/checkUsername";

import InputField from "@/components/InputField";

import SectionState from "../../../sectionState";
import SectionBase from "../../../sections/SectionBase";

type propsType = Readonly<{
    setSection: (section: SectionState) => void,
    username: string | undefined,
    setUsername: (username: string | undefined) => void,
    currentSection: SectionState
}>

export default function UsernameSection(props: propsType): ReactNode {
    const {
        setSection,
        username,
        setUsername,
        currentSection
    } = props

    const [errorMessage, setErrorMessage] = useState<string>("");

    const usernameVerify: boolean = useMemo(() => {
        if (!username || errorMessage) return false;
        const reg = new RegExp(/^[a-zA-Z0-9_]{5,30}$/);
        return reg.test(username);
    }, [username, errorMessage]);

    const next = useCallback(() => {
        if (!usernameVerify || !username) return;
        setSection(SectionState.LOADING);
        setErrorMessage("");

        checkUsername(username).then(
            () => setSection(SectionState.REGISTER_DISPLAY_NAME)
        ).catch((error: AxiosError) => {
            const status = error.response?.status;
            switch (status) {
                case 400:
                    setErrorMessage("使用者名稱格式錯誤");
                    break;
                case 409:
                    setErrorMessage("此使用者名稱已被使用");
                    break;
                default:
                    setErrorMessage("未知的錯誤");
                    break;
            }
            setSection(SectionState.REGISTER_USERNAME);

        });
    }, [username, usernameVerify, setSection]);

    return <SectionBase
        errorMessage={errorMessage}
        showState={SectionState.REGISTER_USERNAME - currentSection}
        buttonText="下一步"
        buttonOnClick={next}
        buttonDisabled={!usernameVerify || errorMessage !== ""}
        lastStepOnClick={() => setSection(SectionState.LOGIN)}
        smallGap
    >
        <InputField
            icon="account_circle"
            type="text"
            title="使用者名稱"
            placeholder="Username"
            error={username !== undefined && !usernameVerify}
            value={username || ""}
            setValue={v => { setUsername(v); setErrorMessage(""); }}
            next={next}
            footer={<span>以 A-z, 0-9, _ 組成, 5~30 字元</span>}
            disabled={currentSection !== SectionState.REGISTER_USERNAME}
            focusOnEnabled
        />
    </SectionBase>;
}