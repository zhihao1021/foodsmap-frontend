import LoginMethod from "@/schemas/loginMethods";

import request from "@/config/axios";

export default async function getLoginMethods(emailOrUsername: string): Promise<Array<LoginMethod>> {
    const response = await request.post<{
        methods: Array<LoginMethod>;
    }>("/auth/login-methods", {
        data: emailOrUsername
    });

    return response.data.methods;
}
