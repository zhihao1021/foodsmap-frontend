type User = {
    id: string;
    username: string;
    displayName: string;
    email: string;
}

type GlobalUser = {
    id: string,
    username: string,
    displayName: string,
};

type UserCreate = {
    email: string,
    username: string,
    displayName: string,
    password: string,
    noExpiration: boolean,
    emailValidCode: string,
    identifyCode: string
}

type UserUpdate = {
    email?: string,
    displayName?: string,
    password?: string,
    newPassword?: string,
    oldEmailValidCode?: string,
    oldIdentifyCode?: string,
    emailValidCode?: string,
    identifyCode?: string,
}

export type { User, GlobalUser, UserCreate, UserUpdate };
