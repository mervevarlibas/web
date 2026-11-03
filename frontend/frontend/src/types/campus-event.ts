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
// (Önceki kodlara dokunmayın, en alta ekleyin)

export interface EventFormData {
  title: string;
  category: Category | ""; // Formda ilk başta boş seçili olabilir
  date: string;
  time: string;
  location: string;
  description: string;
  capacity: string; // Formdan gelen input değeri metin olur
  image?: string;
}
// src/types/campus-event.ts dosyasının en altı
export type EventFormErrors = Partial<Record<keyof EventFormData, string>>;