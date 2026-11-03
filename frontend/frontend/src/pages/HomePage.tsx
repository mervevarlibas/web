// src/pages/HomePage.tsx
import { Link } from "react-router-dom";
import { useEvents } from "../context/EventsContext";
import EventList from "../components/events/EventList";

function HomePage() {
  const { events } = useEvents(); // Verileri Context'ten çektik

  // Yaklaşan 2 etkinliği tarihe göre sıralayıp alıyoruz
  const upcoming = [...events]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 2);

  return (
    <>
     <h2 className="bolum-baslik">Yaklaşan 2 Etkinlik</h2>
      {/* Detaya gitme fonksiyonunu artık sayfada boş bırakıyoruz, çünkü Router hallediyor */}
      <EventList events={upcoming} onShowDetail={() => {}} />
      
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Link className="buton" to="/events">Tüm Etkinlikleri Gör</Link>
      </div>
    </>
  );
}

export default HomePage;