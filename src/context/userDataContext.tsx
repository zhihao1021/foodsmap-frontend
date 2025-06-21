"use client";
import { createContext, ReactNode, useCallback, useEffect, useState } from "react";

import { User } from "@/schemas/user";
import ContextPair from "./type";
import getCurrentUserData from "@/api/user/getCurrentUserData";

const UserDataContext = createContext<ContextPair<User | null>>(undefined);

export { UserDataContext };
export default function UserDataContextProvider({
    userData,
    children
}: {
    userData: User | null,
    children?: ReactNode;
}): ReactNode {
    const [data, setData] = useState<User | null>(userData);

    const reloadUserData = useCallback(async () => {
        try {
            const user = await getCurrentUserData();
            setData(user);
        }
        catch {
            setData(null);
        }
    }, []);

    useEffect(() => {
        setData(userData);
    }, [userData]);

    return <UserDataContext.Provider value={{
        data: data,
        refresh: reloadUserData
    }}>
        {children}
    </UserDataContext.Provider>;
}
