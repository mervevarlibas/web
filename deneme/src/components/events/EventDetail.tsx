// src/components/events/EventDetail.tsx
import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventDetailProps {
  event: CampusEvent;
  onBack: () => void; // Geri butonuna basılınca
  onEdit: (id: string) => void; // Güncelle butonuna basılınca
}

function EventDetail({ event, onBack, onEdit }: EventDetailProps) {
  return (
    <div>
      <div className="detay-kutu">
        {event.image && (
          <div className="detay-sol">
            <div className="afis-tasarim">
              <h2>{event.title}</h2>
              <h2 style={{ color: "var(--renk-zemin)", fontSize: "1.5rem", opacity: 0.9 }}>2026</h2>
              <p>{formatDate(event.date)} - {event.location}</p>
            </div>
            <p style={{ fontSize: "0.8rem", marginTop: "5px", color: "var(--renk-ana)", fontStyle: "italic" }}>
              {event.title} afişi
            </p>
          </div>
        )}

        <div className="detay-sag">
          <div className="kunye-kutu">
            <h3>Etkinlik Künyesi</h3>
            <dl>
              <dt>Tarih</dt>
              <dd>{formatDate(event.date)}, {event.time}</dd>
              <dt>Yer</dt>
              <dd>{event.location}</dd>
              <dt>Kategori</dt>
              <dd>{event.category}</dd>
              <dt>Kontenjan</dt>
              <dd>{event.capacity} kişi</dd>
            </dl>
          </div>
        </div>
      </div>

      <div style={{ marginTop: "30px" }}>
        <h3 style={{ color: "var(--renk-ana)", fontSize: "1.2rem", marginBottom: "10px" }}>Açıklama</h3>
        <p style={{ lineHeight: 1.8 }}>{event.description}</p>
        
        <div style={{ marginTop: "30px", display: "flex", gap: "10px" }}>
          <button className="btn" onClick={onBack}>&larr; Listeye dön</button>
          <button className="btn" onClick={() => onEdit(event.id)}>Bu etkinliği güncelle</button>
        </div>
      </div>
    </div>
  );
}

export default EventDetail;