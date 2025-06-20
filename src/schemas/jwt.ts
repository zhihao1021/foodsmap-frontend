type JWT = {
    access_token: string,
    token_type: string
}

type JWTPayload = {
    sub: string,
    iat: number,
    exp: number,
}

export type { JWT, JWTPayload };
