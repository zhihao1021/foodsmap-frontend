"use client"
import { AxiosError } from "axios";
import { Dispatch, ReactNode, SetStateAction, useCallback, useState } from "react";

import preCheckEmail from "@/api/auth/preCheckEmail";

import InputField from "@/components/InputField";

import SectionState from "../../../sectionState";
import SectionBase from "../../../sections/SectionBase";

type propsType = Readonly<{
    setSection: (section: SectionState) => void,
    email: string | undefined,
    identifyCode: string | undefined,
    emailValidateCode: string | undefined,
    setEmailValidateCode: Dispatch<SetStateAction<string | undefined>>,
    register: () => void,
    currentSection: SectionState,
}>

export default function EmailValidateSection(props: propsType): ReactNode {
    const {
        setSection,
        email,
        identifyCode,
        emailValidateCode,
        setEmailValidateCode,
        register,
        currentSection,
    } = props

    const [errorMessage, setErrorMessage] = useState<string>("");

    const next = useCallback(() => {
        if (!email || !emailValidateCode || !identifyCode) return;
        setSection(SectionState.LOADING);
        setErrorMessage("");

        preCheckEmail({
            email: email,
            code: emailValidateCode,
            identifyCode: identifyCode
        }).then(() => {
            register();
        }).catch((error: AxiosError) => {
            const status = error.response?.status;
            switch (status) {
                case 400:
                    setErrorMessage("驗證碼錯誤");
                    break;
                case 429:
                    setErrorMessage("驗證碼過於頻繁，請稍後再試");
                    break;
                default:
                    setErrorMessage("未知的錯誤")
                    break;
            }
            setSection(SectionState.REGISTER_VALIDATE_EMAIL);
        });
    }, [email, emailValidateCode, identifyCode, register, setSection]);

    return <SectionBase
        errorMessage={errorMessage}
        showState={SectionState.REGISTER_VALIDATE_EMAIL - currentSection}
        buttonText="下一步"
        buttonOnClick={next}
        buttonDisabled={!emailValidateCode || errorMessage !== ""}
    >
        <InputField
            icon="verified"
            type="number"
            title="驗證碼"
            placeholder="0000"
            tabIndex={0}
            error={emailValidateCode === ""}
            value={emailValidateCode || ""}
            setValue={v => { setEmailValidateCode(v); setErrorMessage(""); }}
            onChange={e => {
                setEmailValidateCode(e.target.value);
                setErrorMessage("");
            }}
            disabled={currentSection !== SectionState.REGISTER_VALIDATE_EMAIL}
            next={next}
            focusOnEnabled
            footer={<span>{`已透過 Email 發送 識別碼: ${identifyCode}`}</span>}
        />
    </SectionBase>;
}