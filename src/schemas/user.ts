export default interface User {
    id: string;
    username: string;
    displayName: string;
    email: string;
}

export interface UserCreate {
    email: string,
    username: string,
    displayName: string,
    password: string,
    noExpiration: boolean,
    emailValidCode: string,
    identifyCode: string
}
