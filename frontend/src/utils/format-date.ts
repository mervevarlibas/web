// src/utils/format-date.ts
export function formatDate(dateString: string) {
    const parts = dateString.split('-');
    return new Date(`${parts[2]}-${parts[1]}-${parts[0]}`).toLocaleDateString("tr-TR", { day: 'numeric', month: 'long', year: 'numeric' });
}