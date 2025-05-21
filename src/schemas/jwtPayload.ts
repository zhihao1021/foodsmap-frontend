export default interface JWTPayload {
    sub: string,
    iat: number,
    exp: number,
}