"use client";
import { ReactNode, useEffect } from "react";

export default function SWRegister(): ReactNode {
    useEffect(() => {
        // localforage.config({
        //     storeName: "foodsmap"
        // });

        const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
        if ("serviceWorker" in navigator) {
            const BASE_URL = `${BASE_PATH}${BASE_PATH.endsWith("/") ? "" : "/"}`;
            window.navigator.serviceWorker.register(
                `${BASE_URL}sw.js`,
                { scope: BASE_URL }
            );
        }
    }, []);

    return null;
}