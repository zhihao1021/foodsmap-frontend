interface TokenContainer {
    token: string | null,
};

const tokenLocalStorage = new AsyncLocalStorage<TokenContainer>();

export const tokenContainer = {
    run<T>(container: TokenContainer, callback: () => T): T {
        return tokenLocalStorage.run(container, callback);
    },

    async getToken(): Promise<string | null> {
        const container = tokenLocalStorage.getStore();
        if (container === undefined) {
            try {
                const { cookies } = (await import("next/headers"));
                const cookiesList = await cookies();
                return cookiesList.get("access_token")?.value ?? null;
            }
            catch {
                return null;
            }
        }
        return container.token;
    },
};