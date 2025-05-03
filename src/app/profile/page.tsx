"use server";
import { AxiosError } from "axios";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

import getCurrentUserData from "@/api/user/getCurrentUserData";

export default async function ProfilePage(): Promise<ReactNode> {
    try {
        const data = await getCurrentUserData();

        return <div>
            {data.displayName}
        </div>
    }
    catch (error) {
        if (error instanceof AxiosError) {
            const status = error.response?.status;
            switch (status) {
                case 401:
                    return redirect("/login");
            }
        }
        return null;
    }
}