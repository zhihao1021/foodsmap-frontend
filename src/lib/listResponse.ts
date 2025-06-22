type ListResponse<T> = Readonly<{
    data: T[],
    token: string | null,
}>;

export default ListResponse;
