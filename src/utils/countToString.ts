export default function countToString(count: number): string {
    if (count < 1000) {
        return count.toString();
    } else if (count < 1000000) {
        return `${(count / 1000).toFixed(1)}K`;
    } else if (count < 1000000000) {
        return `${(count / 1000000).toFixed(1)}M`;
    } else {
        return `${(count / 1000000000).toFixed(1)}B`;
    }
}