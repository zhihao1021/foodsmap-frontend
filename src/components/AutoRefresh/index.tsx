"use client";
import { jwtDecode } from "jwt-decode";
import { ReactNode, useEffect } from "react";
import Cookies from "js-cookie";

import { JWTPayload } from "@/schemas/jwt";

import refreshToken from "@/api/auth/refreshToken";
import { AxiosError } from "axios";

export default function AutoRefresh(): ReactNode {
    useEffect(() => {
        const refresh = async () => {
            const token = localStorage.getItem("access_token");

            if (!token) return;

            try {
                const jwtData = jwtDecode(token) as JWTPayload;

                const now = Date.now() / 1000;
                if (process.env.NODE_ENV !== "development") {
                    if (!jwtData.exp || jwtData.exp - now > 24 * 60 * 60) {
                        return;
                    }
                }

                refreshToken().then(jwt => {
                    const {
                        access_token,
                        token_type,
                    } = jwt;

                    localStorage.setItem("access_token", access_token);
                    localStorage.setItem("token_type", token_type);

                    Cookies.set("access_token", access_token, {
                        path: process.env.NEXT_PUBLIC_BASE_PATH,
                        secure: true,
                        sameSite: "Strict",
                    });
                }).catch((error: AxiosError) => {
                    const statusCode = error.response?.status;

                    if (statusCode && statusCode < 500) {
                        console.log(statusCode);
                        localStorage.removeItem("access_token");
                        localStorage.removeItem("token_type");
                        Cookies.remove("access_token");
                    }
                });
            }
            catch { }
        }

        refresh();
        setInterval(() => refresh(), 60 * 1000 * 1000); // 1 hour
    }, []);

    return null;
}