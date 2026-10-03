export function formatDateTime(timestamp: number): string {
    const now = new Date();
    const date = new Date(timestamp * 1000);

    const isToday =
        date.getDate() === now.getDate() &&
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear();

    const isThisYear = date.getFullYear() === now.getFullYear();

    if (isToday) {
        return date.toLocaleString("fr-FR", {
            hour: "2-digit",
            minute: "2-digit",
        });
    }

    if (isThisYear) {
        return date.toLocaleString("fr-FR", {
            day: "2-digit",
            month: "short",
        });
    }

    return date.toLocaleString("fr-FR", {
        day: "2-digit",
        month: "short",
        year: "2-digit",
    });
}
