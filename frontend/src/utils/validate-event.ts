// src/utils/validate-event.ts
import type { EventFormData, EventFormErrors } from "../types/campus-event";

export function validateEvent(data: EventFormData): EventFormErrors {
  const errors: EventFormErrors = {};

  // 1. Etkinlik adı en az 3 karakter
  if (data.title.trim().length < 3) {
    errors.title = "En az 3 karakter olmalı.";
  }

  // 2. Kategori seçilmiş olmalı
  if (data.category === "") {
    errors.category = "Bir kategori seçin.";
  }

  // 3. Tarih, saat, yer boş olamaz
  if (!data.date.trim()) errors.date = "Tarih boş olamaz.";
  if (!data.time.trim()) errors.time = "Saat boş olamaz.";
  if (!data.location.trim()) errors.location = "Yer boş olamaz.";

  // 4. Kontenjan 1-1000 arası tam sayı
  const capacity = Number(data.capacity);
  if (!Number.isInteger(capacity) || capacity < 1 || capacity > 1000) {
    errors.capacity = "1 ile 1000 arası tam sayı girin.";
  }

  // 5. Açıklama en az 10 karakter
  if (data.description.trim().length < 10) {
    errors.description = "En az 10 karakter olmalı.";
  }

  return errors;
}