// src/components/forms/EventForm.tsx
import type { Category } from "../../types/campus-event";

interface EventFormProps {
  categories: Category[];
  onSubmit: () => void; // Form gönderildiğinde yukarıya haber verecek
  buttonText: string;   // Ekle veya Güncelle yazısı
}

function EventForm({ categories, onSubmit, buttonText }: EventFormProps) {
  return (
    // Fragment (<> ... </>) kullanarak bilgi yazısını ve formu tek kökte birleştiriyoruz[cite: 24]
    <>
      <p style={{ fontSize: "0.9rem", color: "#555", marginBottom: "20px" }}>
        Yıldızlı (*) alanlar zorunludur. Bu sprintte form veri kaydetmez/güncellemez.
      </p>

      <form 
        id="etkinlik-formu" 
        className="form" 
        onSubmit={(e) => {
          e.preventDefault(); // Sayfa yenilenmesini engelle[cite: 24]
          onSubmit();         // Yukarıya (App.tsx'e) haber ver[cite: 24]
        }}
      >
        <label htmlFor="title">Etkinlik Adı *</label>
        <input type="text" id="title" maxLength={80} />
        <span id="ad-hata" className="hata-metni"></span>

        <label htmlFor="category">Kategori *</label>
        <select id="category">
          <option value="">Seçiniz</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <span id="kategori-hata" className="hata-metni"></span>

        <label htmlFor="date">Tarih *</label>
        <input type="text" id="date" placeholder="gg/aa/yyyy" />
        <span id="tarih-hata" className="hata-metni"></span>

        <label htmlFor="time">Saat *</label>
        <input type="text" id="time" placeholder="--:-- --" />
        <span id="saat-hata" className="hata-metni"></span>

        <label htmlFor="location">Yer *</label>
        <input type="text" id="location" placeholder="Örn. A Blok Konferans Salonu" />
        <span id="yer-hata" className="hata-metni"></span>

        <label htmlFor="capacity">Kontenjan</label>
        <input type="number" id="capacity" />
        <span id="kontenjan-hata" className="hata-metni"></span>

        <label htmlFor="description">Açıklama</label>
        <textarea id="description" rows={5}></textarea>

        <button type="submit" className="btn" style={{ marginTop: "25px" }}>
          {buttonText}
        </button>
      </form>
    </>
  );
}

export default EventForm;