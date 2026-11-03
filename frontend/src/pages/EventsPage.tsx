// src/pages/EventsPage.tsx
import { useState } from "react";
import { useEvents } from "../context/EventsContext";
import EventFilter from "../components/events/EventFilter";
import EventList from "../components/events/EventList";
import { searchEvents, filterByCategory } from "../utils/filter-events";
import type { Category, CampusEvent } from "../types/campus-event";

function EventsPage() {
  const { events } = useEvents(); 
  
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");

  const categories = [...new Set(events.map((e: CampusEvent) => e.category))] as Category[];

  const filtered = filterByCategory(
    searchEvents(events, searchText), 
    category
  );

  return (
    <>
      <h2 className="bolum-baslik">Tüm Etkinlikler</h2>
      
      {/* İşte burayı EventFilter'ın beklediği isme (selectedCategory) göre güncelledik */}
      <EventFilter 
        searchText={searchText}
        onSearchChange={setSearchText}
        selectedCategory={category}
        onCategoryChange={setCategory}
        categories={categories}
      />
      
      <EventList 
        events={filtered} 
        onShowDetail={() => {}} 
        emptyText="Arama kriterlerinize uygun etkinlik bulunamadı."
      />
    </>
  );
}

export default EventsPage;