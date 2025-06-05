export interface Article {
    id: string,
    title: string,
    context: string,
    like: number,
    tags: string[],
    author: string,
    mediaURL: string[],
} 