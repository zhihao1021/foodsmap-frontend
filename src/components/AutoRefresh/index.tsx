"use client";
import { jwtDecode } from "jwt-decode";
import localforage from "localforage";
import { ReactNode, useEffect } from "react";

import JWTPayload from "@/schemas/jwtPayload";
import refreshToken from "@/api/auth/refreshToken";

export default function AutoRefresh(): ReactNode {
    useEffect(() => {
        const refresh = async () => {
            const token = localStorage.getItem("access_token");

            if (!token) return;

            try {
                const jwtData = jwtDecode(token) as JWTPayload;

                const now = Date.now() / 1000;
                // if (!jwtData.exp || jwtData.exp - now > 24 * 60 * 60) {
                //     return;
                // }

                refreshToken().then(jwt => {
                    const {
                        access_token,
                        token_type,
                    } = jwt;

                    localforage.setItem("access_token", access_token);

                    localStorage.setItem("access_token", access_token);
                    localStorage.setItem("token_type", token_type);
                });
            }
            catch { }
        };

        setInterval(() => refresh(), 60 * 1000 * 1000); // 1 hour
    }, []);

    return null;
}