// src/pages/EditEventPage.tsx
import { useParams, useNavigate } from "react-router-dom";
import { useEvents } from "../context/EventsContext";
import { findEventById } from "../utils/filter-events";
// İçe aktarma yolu forms klasörü olarak güncellendi:
import EventForm from "../components/forms/EventForm";
import NotFoundPage from "./NotFoundPage";

function EditEventPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { events, updateEvent } = useEvents();
  
  const event = findEventById(events, id ?? "");
  if (!event) return <NotFoundPage />;

  return (
    <>
      <h2 className="bolum-baslik">Etkinliği Güncelle</h2>
      <EventForm 
        initialData={{ ...event, capacity: String(event.capacity) }}
        submitText="Güncelle"
        onSubmit={(data) => {
          updateEvent(event.id, data);
          navigate("/admin");
        }}
      />
    </>
  );
}

export default EditEventPage;