import request from "@/config/axios";
import User from "@/schemas/user";

export default async function getCurrentUserData(): Promise<User> {
    console.log("getCurrentUserData");
    const response = await request.get<User>("/user");

    return response.data
}