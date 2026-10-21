// src/components/events/EventCard.tsx
import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventCardProps {
  event: CampusEvent;
  onShowDetail: (id: string) => void;
}

function EventCard({ event, onShowDetail }: EventCardProps) {
  const duzgunTarih = formatDate(event.date);
  
  return (
    <article className="kart">
      <b>{event.title}</b>
      <span className="kategori">{event.category}</span>
      <p>Tarih: {duzgunTarih}, {event.time}</p>
      <p>Yer: {event.location}</p>
      <p>Kontenjan: {event.capacity} kişi</p>
      <p style={{ marginTop: "15px", marginBottom: "15px" }}>{event.description}</p>
      
      <a 
        href="#" 
        className="detay-link" 
        onClick={(e) => {
          e.preventDefault();
          onShowDetail(event.id);
        }}
      >
        Detayları gör
      </a>
    </article>
  );
}

export default EventCard;