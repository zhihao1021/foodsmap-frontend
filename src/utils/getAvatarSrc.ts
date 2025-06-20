export default function getAvatarSrc(userId: string): string {
    let baseUrl = process.env.NEXT_PUBLIC_API_ENDPOINT;
    if (!baseUrl?.endsWith("/")) baseUrl += "/";

    return `${baseUrl}avatar/by-id/${userId}`;
}