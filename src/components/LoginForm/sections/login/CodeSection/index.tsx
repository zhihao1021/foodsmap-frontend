"use client";
import {
    ReactNode,
    useCallback,
    useEffect,
    useState
} from "react";

import JWT from "@/schemas/jwt";
import LoginMethod from "@/schemas/loginMethods";

import login from "@/api/auth/login";

import InputField from "@/components/InputField";
import SectionState from "@/components/LoginForm/sectionState";
import SectionBase from "@/components/LoginForm/sections/SectionBase";

import styles from "./index.module.scss";
import { AxiosError } from "axios";

const infoMap = {
    [LoginMethod.PASSWORD]: {
        icon: "password",
        title: "Password",
        placeholder: "Passw0rd.",
        type: "password",
        name: "密碼"
    },
    [LoginMethod.TOTP]: {
        icon: "lock_clock",
        title: "TOTP Code",
        placeholder: "000000",
        type: "number",
        name: "驗證碼"
    }
}

type propsType = Readonly<{
    setSection: (section: SectionState) => void
    account: string | undefined,
    currentMethod: LoginMethod,
    methodsCount: number,
    loginCallback: (jwt: JWT, message: string) => void,
    currentSection: SectionState,
}>;

export default function CodeSection(props: propsType): ReactNode {
    const {
        setSection,
        account,
        currentMethod,
        methodsCount,
        loginCallback,
        currentSection,
    } = props;

    const [code, setCode] = useState<string | undefined>(undefined);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const next = useCallback(() => {
        if (!code || !account) return;
        setErrorMessage("");

        login({
            emailOrUsername: account,
            code: code,
            method: currentMethod
        }).then(
            jwt => loginCallback(jwt, "登入成功!")
        ).catch((error: AxiosError) => {
            const status = error.response?.status;
            setCode(undefined);

            switch (status) {
                case 400:
                    setErrorMessage(`${infoMap[currentMethod].name}錯誤`);
                    break;
                default:
                    setErrorMessage("未知的錯誤");
                    break;
            }
            setSection(SectionState.LOGIN_CODE);
        })
    }, [account, code, currentMethod, loginCallback]);

    return <SectionBase
        errorMessage={errorMessage}
        showState={SectionState.LOGIN_CODE - currentSection}
        buttonText="登入"
        buttonOnClick={next}
        buttonDisabled={!code || errorMessage !== ""}
        smallGap={methodsCount > 1}
    >
        <InputField
            icon={infoMap[currentMethod].icon}
            type={infoMap[currentMethod].type}
            title={infoMap[currentMethod].title}
            placeholder={infoMap[currentMethod].placeholder}
            tabIndex={0}
            error={code === ""}
            value={code || ""}
            setValue={v => { setCode(v); setErrorMessage(""); }}
            next={next}
            disabled={currentSection !== SectionState.LOGIN_CODE}
            footer={methodsCount > 1 ? <button
                className={styles.otherMethod}
                onClick={() => {
                    setSection(SectionState.LOGIN_SELECT_METHOD);
                    setErrorMessage("");
                    setCode(undefined);
                }}
            >試試其他方法</button> : undefined}
            focusOnEnable
        />
    </SectionBase>;
}