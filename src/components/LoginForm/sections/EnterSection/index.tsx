"use client";
import { AxiosError } from "axios";
import {
    ReactNode,
    useCallback,
    useState
} from "react";


import LoginMethod from "@/schemas/loginMethods";

import getLoginMethods from "@/api/auth/loginMethods";

import InputField from "@/components/InputField";

import SectionBase from "../SectionBase";
import SectionState from "../../sectionState";

type propsType = Readonly<{
    setSection: (section: SectionState) => void
    setMethods: (methods: Array<LoginMethod>) => void,
    account: string | undefined,
    setAccount: (account: string | undefined) => void,
    currentSection: SectionState
}>;

export default function EnterSection(props: propsType): ReactNode {
    const {
        setSection,
        setMethods,
        account,
        setAccount,
        currentSection,
    } = props;

    const [errorMessage, setErrorMessage] = useState<string>("");

    const next = useCallback(() => {
        if (!account || errorMessage !== "") return;
        setSection(SectionState.LOADING);

        getLoginMethods(account).then(methods => {
            setMethods(methods);
            setSection(methods.length > 1 ? SectionState.LOGIN_SELECT_METHOD : SectionState.LOGIN_CODE);
        }).catch((error: AxiosError) => {
            const status = error.response?.status;
            switch (status) {
                case 400:
                    setSection(SectionState.REGISTER_USERNAME);
                    return;
                case 404:
                    setErrorMessage("帳號不存在")
                    break;
                default:
                    setErrorMessage("未知的錯誤");
                    break;
            }
            setSection(SectionState.LOGIN);
        });
    }, [account, errorMessage, setSection, setMethods]);

    return <SectionBase
        errorMessage={errorMessage}
        showState={currentSection === SectionState.LOGIN ? 0 : -1}
        buttonText="註冊 / 登入"
        buttonOnClick={next}
        buttonDisabled={!account || errorMessage !== ""}
    >
        <InputField
            icon="account_circle"
            type="text"
            title="Email or Username"
            placeholder="email@example.com"
            error={account === ""}
            value={account || ""}
            setValue={value => {
                setAccount(value);
                setErrorMessage("");
            }}
            next={next}
        />
    </SectionBase>;
}