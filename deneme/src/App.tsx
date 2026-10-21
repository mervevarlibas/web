// src/App.tsx
import { useState, useEffect } from "react";
import "./App.css";

import { events } from "./data/events";
import type { Category } from "./types/campus-event";
import { searchEvents, filterByCategory, findEventById } from "./utils/filter-events";
import type { PageName } from "./types/page";

import Header from "./components/layout/header";
import Navigation from "./components/layout/Navigation";
import Footer from "./components/layout/footer";
import EventList from "./components/events/EventList";
import EventFilter from "./components/events/EventFilter";
import EventDetail from "./components/events/EventDetail";
import EventForm from "./components/forms/EventForm"; // YENİ EKLENDİ

function App() {
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | "">("");

  function go(next: PageName, id: string | null = null) {
    setPage(next);
    setSelectedId(id);
  }

  const selected = selectedId ? findEventById(events, selectedId) : undefined;
  const categories = [...new Set(events.map(e => e.category))] as Category[];

  let headerTitle = "Kampüs Etkinlikleri";
  let headerText = "";
  let tabTitle = "Ana Sayfa";

  if (page === "home") {
    headerText = "Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin.";
  } else if (page === "events") {
    headerTitle = "Tüm Etkinlikler";
    headerText = "Ekim ayında kampüste düzenlenen etkinlikler.";
    tabTitle = "Etkinlikler";
  } else if (page === "add") {
    headerTitle = "Etkinlik Ekle";
    headerText = "Yeni bir etkinlik oluşturun.";
    tabTitle = "Etkinlik Ekle";
  } else if (page === "edit") {
    headerTitle = "Etkinlik Güncelle";
    tabTitle = "Etkinlik Güncelle";
  } else if (page === "detail" && selected) {
    headerTitle = selected.title; 
    tabTitle = selected.title;
  }

  useEffect(() => {
    document.title = `Kampüs Etkinlikleri — ${tabTitle}`;
  }, [tabTitle]);

  const upcoming = [...events]
    .sort((a, b) => {
      const dateA = new Date(a.date.split('-').reverse().join('-'));
      const dateB = new Date(b.date.split('-').reverse().join('-'));
      return dateA.getTime() - dateB.getTime();
    })
    .slice(0, 2);

  const filtered = filterByCategory(searchEvents(events, searchText), selectedCategory);

  return (
    <>
      <Header title={headerTitle} text={headerText}>
        <Navigation current={page} onNavigate={go} />
      </Header>

      <main>
        {page === "home" && (
          <div>
            <h3>Yaklaşan 2 Etkinlik</h3>
            <EventList events={upcoming} onShowDetail={(id) => go("detail", id)} />
          </div>
        )}

        {page === "events" && (
          <div>
            <EventFilter 
              categories={categories} searchText={searchText} selectedCategory={selectedCategory}
              onSearchChange={setSearchText} onCategoryChange={setSelectedCategory}
            />
            <p style={{ fontWeight: "bold", color: "var(--renk-ana)", marginBottom: "20px" }}>
              {filtered.length > 0 && `${filtered.length} etkinlik listeleniyor.`}
            </p>
            <EventList events={filtered} onShowDetail={(id) => go("detail", id)} emptyText="Aramanıza uygun etkinlik bulunamadı." />
          </div>
        )}

        {page === "detail" && (
          <div>
            {!selected ? (
              <div className="uyari-kutu">
                Geçersiz etkinlik bağlantısı. Lütfen listeden bir etkinlik seçin.
                <br /><br />
                <button className="btn" onClick={() => go("events")}>Listeye dön</button>
              </div>
            ) : (
              <EventDetail event={selected} onBack={() => go("events")} onEdit={(id) => go("edit", id)} />
            )}
          </div>
        )}

        {(page === "add" || page === "edit") && (
          <div>
            <h3>{page === "add" ? "Etkinlik Ekle" : "Etkinlik Güncelle"}</h3>
            <EventForm 
              categories={categories}
              buttonText={page === "add" ? "Kaydet" : "Güncelle"}
              onSubmit={() => window.scrollTo(0, 0)} // Form gönderilince en üste kaydırır[cite: 24]
            />
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}

export default App;