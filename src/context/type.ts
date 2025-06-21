type ContextPair<T> = {
    data: T,
    refresh: () => Promise<void>
} | undefined;

export default ContextPair;
