import { AxiosError } from "axios";

import getUserDataById from "@/api/user/getUserDataById";
import Profile from "@/components/Profile";

import styles from "./page.module.scss";
import BackButton from "@/components/BackButton";

export default async function UserPage({
    params
}: { params: Promise<{ userId: string }> }) {
    const { userId } = await params;
    try {
        const userData = await getUserDataById(userId);

        return <Profile userData={userData} />
    }
    catch (error) {
        if (error instanceof AxiosError) {
            const status = error.response?.status;

            switch (status) {
                case 404:
                    return <div className={styles.notFound}>
                        <h1>找不到使用者 QQ</h1>
                        <div>使用者 <span className={styles.userId}>{userId}</span> 不存在</div>
                        <BackButton />
                    </div>
                default:
                    return <div className={styles.notFound}>
                        <h1>發生未知錯誤 QQ</h1>
                        <div>錯誤碼： <span className={styles.status}>{status}</span></div>
                        <BackButton />
                    </div>
            }
        }
        else {
            return <div className={styles.notFound}>
                <h1>發生未知錯誤 QQ</h1>
                <BackButton />
            </div>
        }
    }


}