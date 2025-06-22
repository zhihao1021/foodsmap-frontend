"use client";
import { AxiosError } from "axios";
import { Turnstile, TurnstileInstance } from "@marsidev/react-turnstile";
import { CSSProperties, ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";

import validateSelfEmail from "@/api/auth/validateSelfEmail";
import updateCurrentUserData from "@/api/user/updateCurrentUserData";
import validateEmail from "@/api/auth/validateEmail";
import preCheckEmail from "@/api/auth/preCheckEmail";
import checkEmail from "@/api/auth/checkEmail";

import InputBox from "@/components/InputBox";
import LoadingStrip from "@/components/LoadingStrip";

import updateCurrentUserDataAction from "@/actions/updateCurrentUserDataAction";

import shareStyles from "../share.module.scss";

import styles from "./index.module.scss";

enum State {
    LOADING = -1,
    INITIAL = 0,
    BEFORE_VALIDATE_ORIGIN_EMAIL = 1,
    VALIDATE_ORIGIN_EMAIL = 2,
    INPUT_NEW_EMAIL = 3,
    BEFORE_VALIDATE_NEW_EMAIL = 4,
    VALIDATE_NEW_EMAIL = 5,
    SUCCESS = 6
}

type propsType = Readonly<{
    email: string
}>;

export default function ChangeEmail(props: propsType): ReactNode {
    const { email } = props;

    const cfRef = useRef<TurnstileInstance>(null);

    const [cfCode, setCfCode] = useState<string>("");
    const [oldIdentifyCode, setOldIdentifyCode] = useState<string>("");
    const [identifyCode, setIdentifyCode] = useState<string>("");
    const [oldValidateCode, setOldValidateCode] = useState<string>("");
    const [validateCode, setValidateCode] = useState<string>("");
    const [newEmail, setNewEmail] = useState<string>("");
    const [infoMessage, setInfoMessage] = useState<string>("");
    const [realInfoMessage, setRealInfoMessage] = useState<string>("");
    const [showInfoMessage, setShowInfoMessage] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [realErrorMessage, setRealErrorMessage] = useState<string>("");
    const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);

    const [state, setState] = useState<State>(State.INITIAL);
    const [showState, setShowState] = useState<State>(State.INITIAL);
    const [windowWidth, setWindowWidth] = useState<number>(-1);
    const [onResize, setOnResize] = useState<(() => void) | undefined>(undefined);

    const cfWidth = useMemo(() => {
        if (windowWidth === -1) return 1;
        return Math.min(1, windowWidth * 0.95 / 300);
    }, [windowWidth]);

    const startValidate = useCallback(() => {
        setCfCode("");
        setOldIdentifyCode("");
        setOldValidateCode("");
        setIdentifyCode("");
        setValidateCode("");
        setNewEmail("");
        setShowErrorMessage(false);

        setState(State.LOADING);
        setShowState(State.BEFORE_VALIDATE_ORIGIN_EMAIL);
        cfRef.current?.reset();
        cfRef.current?.render();
        cfRef.current?.execute();
        setTimeout(() => setState(State.BEFORE_VALIDATE_ORIGIN_EMAIL), 1000);
    }, []);

    const preCheckOriginEmail = useCallback(() => {
        setState(State.LOADING);
        setShowState(State.INPUT_NEW_EMAIL);
        setShowErrorMessage(false);

        preCheckEmail({
            email: email,
            code: oldValidateCode,
            identifyCode: oldIdentifyCode,
        }).then(() => {
            setState(State.INPUT_NEW_EMAIL);
        }).catch((error: AxiosError) => {
            const status = error.response?.status;
            switch (status) {
                case 400:
                    setErrorMessage("驗證碼錯誤");
                    break;
                case 429:
                    setErrorMessage("驗證過於頻繁，請稍後再試");
                    break;
                default:
                    setErrorMessage("未知的錯誤")
                    break;
            }
            setShowState(State.VALIDATE_ORIGIN_EMAIL);
            setState(State.VALIDATE_ORIGIN_EMAIL);
        });
    }, [email, oldValidateCode, oldIdentifyCode]);

    const checkNewEmail = useCallback(() => {
        setState(State.LOADING);
        setShowState(State.BEFORE_VALIDATE_NEW_EMAIL);
        setShowErrorMessage(false);

        checkEmail(newEmail).then(() => {
            cfRef.current?.reset();
            cfRef.current?.render();
            cfRef.current?.execute();
            setTimeout(() => setState(State.BEFORE_VALIDATE_NEW_EMAIL), 1000);
        }).catch((error: AxiosError) => {
            const status = error.response?.status;
            switch (status) {
                case 400:
                    setErrorMessage("電子郵件格式錯誤");
                    break;
                case 409:
                    setErrorMessage("電子郵件已被使用");
                    break;
                default:
                    setErrorMessage("未知的錯誤")
                    break;
            }
            setShowState(State.INPUT_NEW_EMAIL);
            setState(State.INPUT_NEW_EMAIL);
        });
    }, [newEmail]);

    const validate = useCallback(() => {
        setState(State.LOADING);
        setShowErrorMessage(false);

        updateCurrentUserData({
            email: newEmail,
            oldEmailValidCode: oldValidateCode,
            oldIdentifyCode: oldIdentifyCode,
            emailValidCode: validateCode,
            identifyCode: identifyCode,
        }).then(
            () => updateCurrentUserDataAction()
        ).then(() => {
            setState(State.SUCCESS);
            setShowState(State.SUCCESS);
            setTimeout(() => {
                setState(State.INITIAL);
                setShowState(State.INITIAL);
            }, 3000);
        }).catch((error: AxiosError) => {
            const status = error.response?.status;
            switch (status) {
                case 400:
                    setErrorMessage("驗證碼錯誤");
                    break;
                case 429:
                    setErrorMessage("驗證過於頻繁，請稍後再試");
                    break;
                default:
                    setErrorMessage("未知的錯誤")
                    break;
            }
            setShowState(State.VALIDATE_NEW_EMAIL);
            setState(State.VALIDATE_NEW_EMAIL);
        });
    }, [newEmail, oldValidateCode, oldIdentifyCode, validateCode, identifyCode]);

    useEffect(() => {
        if (state !== State.BEFORE_VALIDATE_ORIGIN_EMAIL && state !== State.BEFORE_VALIDATE_NEW_EMAIL) return;
        if (cfCode === "") return;

        const isOrigin = state === State.BEFORE_VALIDATE_ORIGIN_EMAIL;
        const lastState = isOrigin ? State.INITIAL : State.INPUT_NEW_EMAIL;
        const nextState = isOrigin ? State.VALIDATE_ORIGIN_EMAIL : State.VALIDATE_NEW_EMAIL;

        setState(State.LOADING);
        setShowState(nextState);
        setShowErrorMessage(false);

        (isOrigin ? validateSelfEmail : validateEmail)({
            email: isOrigin ? email : newEmail,
            code: cfCode,
        }).then(identifyCode => {
            (isOrigin ? setOldIdentifyCode : setIdentifyCode)(identifyCode);
            setState(nextState);
            setInfoMessage(`已寄送驗證碼至 ${isOrigin ? email : newEmail}`);
            setShowInfoMessage(true);
            setTimeout(() => setShowInfoMessage(false), 5000);
        }).catch((error: AxiosError) => {
            const status = error.response?.status;
            switch (status) {
                case 400:
                    setErrorMessage("驗證未通過");
                    break;
                case 429:
                    setErrorMessage("傳送驗證過於頻繁，請稍後再試");
                    break;
                default:
                    setErrorMessage("未知的錯誤")
                    break;
            }
            setState(lastState);
            setShowState(lastState);
        });

        setCfCode("");
    }, [cfCode, state, email, newEmail]);

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

    useEffect(() => {
        setShowInfoMessage(infoMessage !== "");
        if (infoMessage) setRealInfoMessage(infoMessage);
    }, [infoMessage]);

    useEffect(() => {
        if (!showInfoMessage) setInfoMessage("");
    }, [showInfoMessage]);

    useEffect(() => {
        setShowErrorMessage(errorMessage !== "");
        if (errorMessage) setRealErrorMessage(errorMessage);
    }, [errorMessage]);

    useEffect(() => {
        if (!showErrorMessage) setErrorMessage("");
    }, [showErrorMessage]);

    return <>
        <h2>更改電子郵件</h2>
        <div className={shareStyles.field}>
            <span>Email</span>
            <span title={email}>{email}</span>
        </div>
        <div
            className={styles.mask}
            style={{ "--ratio": cfWidth } as CSSProperties}
            data-show-state={showState}
        >
            <div
                className={styles.buttonBar}
                data-show={state === State.INITIAL}
            >
                <button
                    className={styles.changeEmail}
                    onClick={startValidate}
                >變更電子郵件</button>
            </div>
            <Turnstile
                ref={cfRef}
                className={styles.cf}
                siteKey={process.env.NEXT_PUBLIC_CF_TURNSTILE_SITE_KEY || ""}
                onSuccess={code => setTimeout(() => setCfCode(code), 1000)}
                options={{
                    theme: "light",
                    size: "normal",
                    execution: "execute",
                    appearance: "execute",
                }}
                data-show={state === State.BEFORE_VALIDATE_ORIGIN_EMAIL || state === State.BEFORE_VALIDATE_NEW_EMAIL}
            />
            <div
                className={styles.validateBox}
                data-show={state === State.VALIDATE_ORIGIN_EMAIL || state === State.VALIDATE_NEW_EMAIL}
            >
                <span>請輸入驗證碼</span>
                <InputBox
                    className={styles.inputBox}
                    type="number"
                    placeholder="0000"
                    value={state === State.VALIDATE_ORIGIN_EMAIL ? oldValidateCode : validateCode}
                    disabled={state !== State.VALIDATE_ORIGIN_EMAIL && state !== State.VALIDATE_NEW_EMAIL}
                    focusOnEnabled
                    onChange={e => {
                        if (state === State.VALIDATE_ORIGIN_EMAIL) setOldValidateCode(e.target.value);
                        else setValidateCode(e.target.value);
                        setShowErrorMessage(false);
                    }}
                    next={() => {
                        if (state === State.VALIDATE_ORIGIN_EMAIL) {
                            if (oldValidateCode.length !== 4) return;
                            preCheckOriginEmail();
                        }
                        else {
                            if (validateCode.length !== 4) return;
                            validate();
                        }
                    }}
                />
                <div className={styles.identifyCodeBox}>
                    {`郵件識別碼：${state === State.VALIDATE_ORIGIN_EMAIL ? oldIdentifyCode : identifyCode}`}
                </div>
            </div>
            <div className={styles.emailBox} data-show={state === State.INPUT_NEW_EMAIL}>
                <span>新電子郵件</span>
                <InputBox
                    className={styles.inputBox}
                    type="text"
                    placeholder="user@example.com"
                    value={newEmail}
                    disabled={state !== State.INPUT_NEW_EMAIL}
                    focusOnEnabled
                    onChange={e => {
                        setNewEmail(e.target.value);
                        setShowErrorMessage(false);
                    }}
                    next={() => {
                        if (newEmail === "") return;
                        checkNewEmail();
                    }}
                />
            </div>
            <div className={styles.success} data-show={state === State.SUCCESS}>
                <span className="ms">done_all</span>
                <span>變更成功</span>
            </div>
            <LoadingStrip
                className={styles.loadingStrip}
                show={state === State.LOADING}
            />
        </div>
        <div className={styles.infoMessage} data-open={showInfoMessage}>
            <div>{realInfoMessage}</div>
        </div >
        <div className={styles.errorMessage} data-open={showErrorMessage}>
            <div>{realErrorMessage}</div>
        </div >
    </>
}