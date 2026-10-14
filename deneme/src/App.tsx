// src/App.tsx
import { useState, useEffect } from "react";
import "./App.css";

import { events } from "./data/events";
import type { CampusEvent, Category } from "./types/campus-event";
import { searchEvents, filterByCategory, findEventById } from "./utils/filter-events";

export type PageName = "home" | "events" | "add" | "detail" | "edit";

function formatDate(dateString: string) {
  const parts = dateString.split('-');
  return new Date(`${parts[2]}-${parts[1]}-${parts[0]}`).toLocaleDateString("tr-TR", { day: 'numeric', month: 'long', year: 'numeric' });
}

function App() {
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | "">("");

  function go(next: PageName, id: string | null = null) {
    setPage(next);
    setSelectedId(id);
  }

  const menuItems: { id: PageName; label: string }[] = [
    { id: "home", label: "Ana Sayfa" },
    { id: "events", label: "Etkinlikler" },
    { id: "add", label: "Ekle" },
  ];

  const selected = selectedId ? findEventById(events, selectedId) : undefined;

  useEffect(() => {
    let title = "Kampüs Etkinlikleri";
    
    if (page === "home") title = "Ana Sayfa";
    else if (page === "events") title = "Etkinlikler";
    else if (page === "add") title = "Etkinlik Ekle";
    else if ((page === "detail" || page === "edit") && selected) {
      title = selected.title;
    }
    
    document.title = `Kampüs Etkinlikleri — ${title}`;
  }, [page, selected]);

  const upcoming = [...events]
    .sort((a, b) => {
      const dateA = new Date(a.date.split('-').reverse().join('-'));
      const dateB = new Date(b.date.split('-').reverse().join('-'));
      return dateA.getTime() - dateB.getTime();
    })
    .slice(0, 2);

  const categories = [...new Set(events.map(e => e.category))];
  const filtered = filterByCategory(searchEvents(events, searchText), selectedCategory);

  function renderCard(event: CampusEvent) {
    const duzgunTarih = formatDate(event.date);
    return (
      <article className="kart" key={event.id}>
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
            go("detail", event.id);
          }}
        >
          Detayları gör
        </a>
      </article>
    );
  }

  return (
    <>
      <header>
        <h1>Kampüs Etkinlikleri</h1>
        {page === "home" && <p>Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin.</p>}
        {page === "events" && <p>Ekim ayında kampüste düzenlenen etkinlikler.</p>}
        {page === "add" && <p>Yeni bir etkinlik oluşturun.</p>}

        <nav>
          {menuItems.map((item) => (
            <a
              key={item.id}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                go(item.id);
              }}
              className={page === item.id ? "aktif" : ""}
              aria-current={page === item.id ? "page" : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <main>
        {page === "home" && (
          <div>
            <h3>Yaklaşan 2 Etkinlik</h3>
            <section className="kart-alani ikili-kart">
              {upcoming.map(renderCard)}
            </section>
          </div>
        )}

        {page === "events" && (
          <div>
            <form className="filtre" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label htmlFor="arama">Etkinlik ara</label>
                <input 
                  type="search" 
                  id="arama" 
                  placeholder="Örn. atölye, kariyer..." 
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="kategori-filtre">Kategori</label>
                <select 
                  id="kategori-filtre"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value as Category | "")}
                >
                  <option value="">Tümü</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </form>

            <p style={{ fontWeight: "bold", color: "var(--renk-ana)", marginBottom: "20px" }}>
              {filtered.length === 0 
                ? "Aramanıza uygun etkinlik bulunamadı." 
                : `${filtered.length} etkinlik listeleniyor.`}
            </p>

            <section className="kart-alani uclu-kart">
              {filtered.map(renderCard)}
            </section>
          </div>
        )}

        {page === "detail" && (
          <div>
            {!selected && (
              <div className="uyari-kutu">
                Geçersiz etkinlik bağlantısı. Lütfen listeden bir etkinlik seçin.
                <br /><br />
                <button className="btn" onClick={() => go("events")}>Listeye dön</button>
              </div>
            )}

            {selected && (
              <div>
                <div className="detay-kutu">
                  {selected.image && (
                    <div className="detay-sol">
                      <div className="afis-tasarim">
                        <h2>{selected.title}</h2>
                        <h2 style={{ color: "var(--renk-zemin)", fontSize: "1.5rem", opacity: 0.9 }}>2026</h2>
                        <p>{formatDate(selected.date)} - {selected.location}</p>
                      </div>
                      <p style={{ fontSize: "0.8rem", marginTop: "5px", color: "var(--renk-ana)", fontStyle: "italic" }}>
                        {selected.title} afişi
                      </p>
                    </div>
                  )}

                  <div className="detay-sag">
                    <div className="kunye-kutu">
                      <h3>Etkinlik Künyesi</h3>
                      <dl>
                        <dt>Tarih</dt>
                        <dd>{formatDate(selected.date)}, {selected.time}</dd>
                        
                        <dt>Yer</dt>
                        <dd>{selected.location}</dd>

                        <dt>Kategori</dt>
                        <dd>{selected.category}</dd>
                        
                        <dt>Kontenjan</dt>
                        <dd>{selected.capacity} kişi</dd>
                      </dl>
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: "30px" }}>
                  <h3 style={{ color: "var(--renk-ana)", fontSize: "1.2rem", marginBottom: "10px" }}>Açıklama</h3>
                  <p style={{ lineHeight: 1.8 }}>{selected.description}</p>
                  
                  <div style={{ marginTop: "30px", display: "flex", gap: "10px" }}>
                    <button className="btn" onClick={() => go("events")}>&larr; Listeye dön</button>
                    <button className="btn" onClick={() => go("edit", selected.id)}>Bu etkinliği güncelle</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Ekle ve Güncelle Formu Ortak Bloğu */}
        {(page === "add" || page === "edit") && (
          <div>
            <h3>{page === "add" ? "Etkinlik Ekle" : "Etkinlik Güncelle"}</h3>
            <p style={{ fontSize: "0.9rem", color: "#555", marginBottom: "20px" }}>
              Yıldızlı (*) alanlar zorunludur. Bu sprintte form veri kaydetmez/güncellemez.
            </p>

            <form id="etkinlik-formu" onSubmit={(e) => e.preventDefault()}>
              
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
                {page === "add" ? "Kaydet" : "Güncelle"}
              </button>

              <div id="form-mesaj"></div>
            </form>
          </div>
        )}
      </main>

      <footer style={{ textAlign: "center", marginTop: "40px", fontSize: "0.8rem", color: "#666" }}>
        <p>Merve Varlıbaş - 2311012025 - 2026</p>
      </footer>
    </>
  );
}

export default App;