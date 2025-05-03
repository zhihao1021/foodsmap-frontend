"use client"
import { ReactNode, useCallback } from "react";

import InputField from "@/components/InputField";
import SectionState from "@/components/LoginForm/sectionState";
import SectionBase from "@/components/LoginForm/sections/SectionBase";

type propsType = Readonly<{
    setSection: (section: SectionState) => void,
    displayName: string | undefined,
    setDisplayName: (displayName: string | undefined) => void,
    currentSection: SectionState,
}>

export default function DisplayNameSection(props: propsType): ReactNode {
    const {
        setSection,
        displayName,
        setDisplayName,
        currentSection,
    } = props

    const next = useCallback(() => {
        if (!displayName) return;
        setSection(SectionState.REGISTER_PASSWORD);
    }, [setSection, displayName]);

    return <SectionBase
        showState={SectionState.REGISTER_DISPLAY_NAME - currentSection}
        buttonText="下一步"
        buttonOnClick={next}
        buttonDisabled={!displayName}
        lastStepOnClick={() => setSection(SectionState.REGISTER_USERNAME)}
    >
        <InputField
            icon="account_circle"
            type="text"
            title="顯示名稱"
            placeholder="Display Name"
            error={displayName === ""}
            value={displayName || ""}
            setValue={setDisplayName}
            next={next}
            footer={<span>註冊後可再進行更改</span>}
            disabled={currentSection !== SectionState.REGISTER_DISPLAY_NAME}
            focusOnEnable
        />
    </SectionBase>;
}