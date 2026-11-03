// src/components/events/EventDetail.tsx
import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventDetailProps {
  event: CampusEvent;
}

function EventDetail({ event }: EventDetailProps) {
  // Linkin bozulmaması için güvenli metin oluşturma
  const gorselMetni = encodeURIComponent(event.title);
  const otomatikAfis = `https://placehold.co/800x500/1a2b4c/f97316.png?text=${gorselMetni}`;

  return (
    <article className="detay">
      {/* Yan yana durmaları için garanti Flex yapısı */}
      <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap", alignItems: "flex-start", marginBottom: "2rem" }}>
        
        {/* SOL: Otomatik Üretilen Afiş */}
        <div style={{ flex: "1.5", minWidth: "300px" }}>
          <img 
            src={event.image || otomatikAfis} 
            alt={`${event.title} afişi`} 
            style={{ width: "100%", height: "auto", display: "block" }} 
          />
          <p style={{ fontStyle: "italic", color: "#666", marginTop: "10px" }}>
            {event.title} afişi
          </p>
        </div>

        {/* SAĞ: Etkinlik Künyesi (Görseldeki gibi kenarlıklı beyaz kutu) */}
        <div style={{ flex: "1", minWidth: "280px", background: "#fff", padding: "1.5rem", borderRadius: "8px", border: "1px solid #e5e5e5" }}>
          <h3 style={{ marginTop: 0, marginBottom: "1.2rem", fontSize: "1.25rem" }}>Etkinlik Künyesi</h3>
          <dl style={{ display: "grid", gridTemplateColumns: "100px 1fr", gap: "1rem", margin: 0 }}>
            <dt style={{ fontWeight: "bold" }}>Tarih</dt>
            <dd style={{ margin: 0 }}>{formatDate(event.date)}, {event.time}</dd>
            
            <dt style={{ fontWeight: "bold" }}>Yer</dt>
            <dd style={{ margin: 0 }}>{event.location}</dd>
            
            <dt style={{ fontWeight: "bold" }}>Kategori</dt>
            <dd style={{ margin: 0 }}>{event.category}</dd>
            
            <dt style={{ fontWeight: "bold" }}>Kontenjan</dt>
            <dd style={{ margin: 0 }}>{event.capacity} kişi</dd>
          </dl>
        </div>

      </div>

      {/* ALT: Açıklama */}
      <div className="aciklama">
        <h3>Açıklama</h3>
        <p style={{ lineHeight: "1.6" }}>{event.description}</p>
      </div>
    </article>
  );
}

export default EventDetail;