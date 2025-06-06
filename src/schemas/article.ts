export interface Article {
    id: string,
    title: string,
    context: string,
    like: number,
    tags: string[],
    author: string,
    date: number,
    mediaURL: string[],
    googleMapURL: string
} 