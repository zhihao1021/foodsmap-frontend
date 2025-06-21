export default function getArticleMediaSrc(articleId: string, mediaId: string): string {
    let baseUrl = process.env.NEXT_PUBLIC_API_ENDPOINT ?? "";
    if (!baseUrl.endsWith("/")) baseUrl += "/";

    return `${baseUrl}media/article/${articleId}/${mediaId}`;
}
