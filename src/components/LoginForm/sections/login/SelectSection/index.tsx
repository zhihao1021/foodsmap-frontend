import {
    ReactNode,
} from "react";


import LoginMethod from "@/schemas/loginMethods";
import SectionState from "@/components/LoginForm/sectionState";
import SectionBase from "@/components/LoginForm/sections/SectionBase";

import styles from "./index.module.scss";

const infoMap = {
    [LoginMethod.PASSWORD]: {
        icon: "password",
        description: "使用密碼登入",
    },
    [LoginMethod.TOTP]: {
        icon: "lock_clock",
        description: "使用 TOTP 登入",
    },
}

type propsType = Readonly<{
    methods: Array<LoginMethod>,
    setMethod: (method: LoginMethod) => void
    currentSection: SectionState
}>;

export default function SelectSection(props: propsType): ReactNode {
    const {
        methods,
        setMethod,
        currentSection,
    } = props;

    return <SectionBase
        showState={SectionState.LOGIN_SELECT_METHOD - currentSection}
    >
        {
            methods.map(method => <button key={method} className={styles.option} onClick={() => setMethod(method)} >
                <span className="ms">{infoMap[method].icon}</span>
                <span className={styles.description}>{infoMap[method].description}</span>
                <span className="ms">keyboard_arrow_right</span>
            </button>)
        }
    </SectionBase>;
}