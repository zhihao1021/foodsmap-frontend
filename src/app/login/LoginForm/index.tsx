"use client";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import {
    ReactNode,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState
} from "react";

import LoginMethod from "@/schemas/loginMethods";
import { JWT } from "@/schemas/jwt";

import register from "@/api/auth/register";

import LoadingStrip from "@/components/LoadingStrip";

import SectionState from "./sectionState";
import LoginSection from "./sections/EnterSection";
import SelectSection from "./sections/login/SelectSection";
import CodeSection from "./sections/login/CodeSection";
import DisplayNameSection from "./sections/register/DisplayNameSection";
import UsernameSection from "./sections/register/UsernameSection";
import PasswordSection from "./sections/register/PasswordSection";
import ResultSection from "./sections/ResultSection";
import CFValidateSection from "./sections/register/CFValidateSection";
import EmailValidateSection from "./sections/register/EmailValidateSection";


import styles from "./index.module.scss";

export default function LoginForm(): ReactNode {
    const blockRef = useRef<HTMLDivElement>(null);

    const [lastSection, setLastSection] = useState<SectionState>(SectionState.LOGIN);
    const [rawSection, setSectionRaw] = useState<SectionState>(SectionState.LOGIN);
    const [loginMethods, setLoginMethods] = useState<Array<LoginMethod>>([LoginMethod.PASSWORD]);
    const [selectedMethod, setSelectedMethod] = useState<LoginMethod>(LoginMethod.PASSWORD);

    const [resultSuccess, setResultSuccess] = useState<boolean>(false);
    const [resultMessage, setResultMessage] = useState<string>("");

    const [account, setAccount] = useState<string | undefined>(undefined);
    const [username, setUsername] = useState<string | undefined>(undefined);
    const [displayName, setDisplayName] = useState<string | undefined>(undefined);
    const [password, setPassword] = useState<string | undefined>(undefined);
    const [identifyCode, setIdentifyCode] = useState<string | undefined>(undefined);
    const [emailValidateCode, setEmailValidateCode] = useState<string | undefined>(undefined);

    const router = useRouter();

    const section = useMemo(() => {
        if (rawSection === SectionState.LOADING)
            return lastSection + 0.1;
        return rawSection;
    }, [rawSection, lastSection]);

    const reset = useCallback(() => {
        setLastSection(SectionState.LOGIN);
        setSectionRaw(SectionState.LOGIN);
        setLoginMethods([LoginMethod.PASSWORD]);
        setSelectedMethod(LoginMethod.PASSWORD);

        setResultSuccess(false);
        setResultMessage("");
        setAccount(undefined);
        setUsername(undefined);
        setDisplayName(undefined);
        setPassword(undefined);
        setIdentifyCode(undefined);
        setEmailValidateCode(undefined);
    }, []);

    const setSection = useCallback((section: SectionState) => {
        setSectionRaw(v => {
            if (v !== SectionState.LOADING)
                setLastSection(v);
            return section;
        });
    }, []);

    const loginCallback = useCallback((jwt: JWT, message: string) => {
        const {
            token_type,
            access_token,
        } = jwt;

        localStorage.setItem("access_token", access_token);
        localStorage.setItem("token_type", token_type);

        Cookies.set("access_token", access_token, {
            path: process.env.NEXT_PUBLIC_BASE_PATH,
            secure: true,
            sameSite: "Strict",
        });

        setResultSuccess(true);
        setResultMessage(message);
        setSection(SectionState.RESULT);

        setTimeout(() => {
            router.push("/");
        }, 2600)
    }, [setSection, router]);

    const registerFunc = useCallback(() => {
        if (!account || !username || !displayName || !password || !emailValidateCode || !identifyCode) return;

        setSection(SectionState.LOADING);

        register({
            email: account,
            username: username,
            displayName: displayName,
            password: password,
            noExpiration: false,
            emailValidCode: emailValidateCode,
            identifyCode: identifyCode
        }).then(
            jwt => loginCallback(jwt, "註冊成功!")
        ).catch(() => {
            setResultSuccess(false);
            setResultMessage("註冊失敗");
            setSection(SectionState.RESULT);
        })
    }, [account, username, displayName, password, emailValidateCode, identifyCode, loginCallback, setSection]);

    useEffect(() => {
        setSelectedMethod(loginMethods[0]);
    }, [loginMethods]);

    useEffect(() => {
        blockRef.current?.scrollTo({ left: 0, behavior: "instant" });
    }, [section]);

    return <div ref={blockRef} className={styles.formBlock}>
        <LoadingStrip
            className={styles.loading}
            show={rawSection === SectionState.LOADING ? 0 : lastSection === rawSection ? 1 : -1}
        />
        <LoginSection
            setSection={setSection}
            setMethods={setLoginMethods}
            account={account}
            setAccount={setAccount}
            currentSection={section}
        />
        <SelectSection
            methods={loginMethods}
            setMethod={method => {
                setSelectedMethod(method);
                setSection(SectionState.LOGIN_CODE);
            }}
            currentSection={section}
        />
        <CodeSection
            currentMethod={selectedMethod || LoginMethod.PASSWORD}
            account={account}
            setSection={setSection}
            methodsCount={loginMethods.length}
            loginCallback={loginCallback}
            currentSection={section}
        />
        <UsernameSection
            setSection={setSection}
            username={username}
            setUsername={setUsername}
            currentSection={section}
        />
        <DisplayNameSection
            setSection={setSection}
            displayName={displayName}
            setDisplayName={setDisplayName}
            currentSection={section}
        />
        <PasswordSection
            setSection={setSection}
            password={password}
            setPassword={setPassword}
            currentSection={section}
        />
        <CFValidateSection
            setSection={setSection}
            setIdentifyCode={setIdentifyCode}
            email={account}
            currentSection={section}
        />
        <EmailValidateSection
            setSection={setSection}
            email={account}
            identifyCode={identifyCode}
            emailValidateCode={emailValidateCode}
            setEmailValidateCode={setEmailValidateCode}
            register={registerFunc}
            currentSection={section}
        />
        <ResultSection
            success={resultSuccess}
            message={resultMessage}
            restart={reset}
            currentSection={section}
        />
    </div>;
}