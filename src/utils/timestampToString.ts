export default function timestampToString(timestamp: number): string {
    const date = new Date(timestamp);
    const years = date.getFullYear();
    const months = (date.getMonth() + 1).toString().padStart(2, "0");
    const days = (date.getDate()).toString().padStart(2, "0");
    const hours = (date.getHours()).toString().padStart(2, "0");
    const minutes = (date.getMinutes()).toString().padStart(2, "0");
    const seconds = (date.getSeconds()).toString().padStart(2, "0");

    return `${years}-${months}-${days} ${hours}:${minutes}:${seconds}`;
}