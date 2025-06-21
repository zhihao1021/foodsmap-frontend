"use client";
import { createContext, ReactNode } from "react";

import { User } from "@/schemas/user";

const UserDataContext = createContext<User | null | undefined>(undefined);

export { UserDataContext };
export default function UserDataContextProvider({
    userData,
    children
}: {
    userData: User | null,
    children?: ReactNode;
}): ReactNode {

    return <UserDataContext.Provider value={userData}>
        {children}
    </UserDataContext.Provider>;
}
