export default function timestampToDelta(timestamp: number): string {
    const date = new Date(timestamp);
    const now = new Date();

    const years = now.getFullYear() - date.getFullYear();
    const months = now.getMonth() - date.getMonth();
    const days = now.getDate() - date.getDate();
    const hours = now.getHours() - date.getHours();
    const minutes = now.getMinutes() - date.getMinutes();
    const seconds = Math.max(now.getSeconds() - date.getSeconds(), 1);

    if (years > 0) {
        return `${years} 年`;
    }

    if (months > 0) {
        return `${months} 月`;
    }

    if (days > 0) {
        return `${days} 天`;
    }

    if (hours > 0) {
        return `${hours} 小時`;
    }

    if (minutes > 0) {
        return `${minutes} 分鐘`;
    }

    return `${seconds} 秒`;
}