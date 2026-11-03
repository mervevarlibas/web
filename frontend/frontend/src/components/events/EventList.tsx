// src/components/events/EventList.tsx
import type { CampusEvent } from "../../types/campus-event";
import EventCard from "./EventCard";

interface EventListProps {
  events: CampusEvent[];
  onShowDetail: (id: string) => void;
  emptyText?: string; // İsteğe bağlı boş liste mesajı
}

function EventList({ events, onShowDetail, emptyText = "Etkinlik bulunamadı." }: EventListProps) {
  // Eğer dizi boşsa sadece mesaj göster
  if (events.length === 0) {
    return <p style={{ fontWeight: "bold", color: "var(--renk-ana)", marginBottom: "20px" }}>{emptyText}</p>;
  }

  return (
    <section className={events.length === 2 ? "kart-alani ikili-kart" : "kart-alani uclu-kart"}>
      {events.map((event) => (
        // Key özelliği listeyi çizen yerde (burada) olmak zorunda
        <EventCard key={event.id} event={event} onShowDetail={onShowDetail} />
      ))}
    </section>
  );
}

export default EventList;