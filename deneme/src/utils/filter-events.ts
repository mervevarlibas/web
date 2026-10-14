// src/utils/filter-events.ts

import type { CampusEvent, Category } from "../types/campus-event";

// 1. Arama Fonksiyonu: Başlık, konum veya açıklamada metin arar
export function searchEvents(list: CampusEvent[], text: string): CampusEvent[] {
    const query = text.trim().toLocaleLowerCase("tr-TR");
    
    // Metin boşsa dizinin tamamını geri döndür
    if (!query) return list;

    return list.filter((event) => 
        event.title.toLocaleLowerCase("tr-TR").includes(query) ||
        event.location.toLocaleLowerCase("tr-TR").includes(query) ||
        event.description.toLocaleLowerCase("tr-TR").includes(query)
    );
}

// 2. Kategori Filtreleme Fonksiyonu
export function filterByCategory(list: CampusEvent[], category: Category | ""): CampusEvent[] {
    // Kategori seçilmemişse ("") dizinin tamamını döndür
    if (category === "") return list;

    return list.filter((event) => event.category === category);
}

// 3. ID'ye Göre Tek Etkinlik Bulma Fonksiyonu (Detay ve Güncelleme sayfası için)
export function findEventById(list: CampusEvent[], id: string): CampusEvent | undefined {
    return list.find((event) => event.id === id);
}