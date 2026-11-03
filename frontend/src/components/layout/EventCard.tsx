// src/components/events/EventCard.tsx
import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date"; // Tarih formatlayıcıyı import ettik

interface EventCardProps {
  event: CampusEvent; // Gösterilecek etkinlik verisi
  onShowDetail: (id: string) => void; // Detay butonuna basılınca çalışacak fonksiyon
}

function EventCard({ event, onShowDetail }: EventCardProps) {
  const duzgunTarih = formatDate(event.date);
  
  return (
    // DİKKAT: key={event.id} kısmını buradan sildik! Key, listeyi map'leyen yerde (App.tsx'te) olmalı.
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
          onShowDetail(event.id); // Tıklanınca etkinlik ID'si ile yukarıya haber ver
        }}
      >
        Detayları gör
      </a>
    </article>
  );
}

export default EventCard;