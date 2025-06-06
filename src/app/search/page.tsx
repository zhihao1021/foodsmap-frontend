"use client";
import { ReactNode, useEffect, useState } from "react";

import InputBox from "@/components/InputBox";

import styles from "./page.module.scss";
import { useSearchParams } from "next/navigation";

export default function SearchPage(): ReactNode {
    const searchParams = useSearchParams();

    const [searchText, setSearchText] = useState<string>(searchParams.get("q") || "");
    const [results, setResults] = useState<[]>([]);

    return <>
        <div className={styles.searchBar}>
            <div className={`ms ${styles.icon}`}>search</div>
            <InputBox
                className={styles.inputBox}
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
            />
        </div>
    </>
}