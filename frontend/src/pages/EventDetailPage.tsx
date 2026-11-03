import { useParams, Link } from "react-router-dom";
import { useEvents } from "../context/EventsContext";
import { findEventById } from "../utils/filter-events";
import NotFoundPage from "./NotFoundPage";
import EventDetail from "../components/events/EventDetail"; 

function EventDetailPage() {
  const { id } = useParams(); 
  const { events } = useEvents(); 
  
  const event = findEventById(events, id ?? "");
  if (!event) return <NotFoundPage />;

  return (
    <>
      <h2 className="bolum-baslik">{event.title}</h2>
      <p className="kategori-satiri">{event.category} · {event.location}</p>

      <EventDetail event={event} />

      <div className="buton-grubu" style={{ marginTop: "30px", display: "flex", gap: "10px" }}>
        <Link to="/events" className="buton">← Listeye dön</Link>
        <Link to={`/admin/${event.id}/edit`} className="buton">Bu etkinliği güncelle</Link>
      </div>
    </>
  );
}

export default EventDetailPage;