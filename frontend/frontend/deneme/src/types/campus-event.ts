// src/types/campus-event.ts

// Kategori sadece bu 4 değerden biri olmak zorunda (Union Type)
export type Category = "Seminer" | "Atölye" | "Söyleşi" | "Yarışma";

// Etkinliğin zorunlu alanlarını tanımlıyoruz
export interface CampusEvent {
    id: string;
    title: string;
    category: Category;
    capacity: number;
    date: string;
    time: string;
    location: string;
    description: string;
    image?: string; // Afiş isteğe bağlı olduğu için sonuna ? koyduk
}