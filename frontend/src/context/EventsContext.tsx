// src/context/EventsContext.tsx
import { createContext, useContext, useState } from "react";
// Category tipini de ekledik
import type { CampusEvent, EventFormData, Category } from "../types/campus-event";
import { events as initialEvents } from "../data/events";

interface EventsContextValue {
  events: CampusEvent[];
  addEvent: (data: EventFormData) => void;
  updateEvent: (id: string, data: EventFormData) => void;
  deleteEvent: (id: string) => void;
}

const EventsContext = createContext<EventsContextValue | null>(null);

export function EventsProvider({ children }: { children: React.ReactNode }) {
  const [events, setEvents] = useState<CampusEvent[]>(initialEvents);

  // Yardımcı fonksiyon: Formdan gelen veriyi CampusEvent formatına çevirir
  function toEvent(id: string, data: EventFormData): CampusEvent {
    return {
      id,
      title: data.title.trim(),
      category: data.category as Category,
      date: data.date,
      time: data.time,
      location: data.location.trim(),
      description: data.description.trim(),
      capacity: Number(data.capacity),
      image: "/afis.svg" // Şimdilik herkese aynı afişi veriyoruz
    };
  }

  // 1. EKLEME İŞLEMİ (Dizinin sonuna ekler)
  const addEvent = (data: EventFormData) => { 
    setEvents([...events, toEvent(`event-${Date.now()}`, data)]); 
  };

  // 2. GÜNCELLEME İŞLEMİ (Eşleşen ID'yi bulur ve değiştirir)
  const updateEvent = (id: string, data: EventFormData) => { 
    setEvents(events.map((e) => (e.id === id ? toEvent(id, data) : e))); 
  };

  // 3. SİLME İŞLEMİ (Eşleşmeyenleri filtreleyip bırakır, yani eşleşeni siler)
  const deleteEvent = (id: string) => { 
    setEvents(events.filter((e) => e.id !== id)); 
  };

  const value = { events, addEvent, updateEvent, deleteEvent };

  return (
    <EventsContext.Provider value={value}>
      {children}
    </EventsContext.Provider>
  );
}

export function useEvents() {
  const value = useContext(EventsContext);
  if (value === null) {
    throw new Error("useEvents mutlaka bir EventsProvider içinde kullanılmalıdır");
  }
  return value;
}