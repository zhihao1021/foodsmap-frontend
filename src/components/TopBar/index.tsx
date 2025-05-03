import getCurrentUserData from "@/api/user/getCurrentUserData";
import User from "@/schemas/user";
import { ReactNode } from "react";

export default async function TopBar(): Promise<ReactNode> {

    let data: User | null = null;
    try {
        data = await getCurrentUserData();
    } catch { }

    return <div>

    </div>;
}