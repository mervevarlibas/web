import { Link } from "react-router-dom";
import { useEvents } from "../context/EventsContext";
import { formatDate } from "../utils/format-date"; 
import type { CampusEvent } from "../types/campus-event";

function AdminPage() {
  const { events, deleteEvent } = useEvents();

  function handleDelete(id: string, title: string) {
    if (window.confirm(`"${title}" silinsin mi?`)) {
      deleteEvent(id);
    }
  }

  return (
    <>
      <h2 className="bolum-baslik">Etkinlik Yönetimi</h2>
      
      <div style={{ marginBottom: "20px" }}>
        <Link to="/admin/new" className="buton">+ Yeni etkinlik</Link>
      </div>

      {events.length === 0 ? (
        <p>Henüz etkinlik yok.</p>
      ) : (
        <table className="tablo">
          <thead>
            <tr>
              <th>Etkinlik</th>
              <th>Tarih</th>
              <th>Kategori</th>
              <th>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event: CampusEvent) => (
              <tr key={event.id}>
                <td data-baslik="Etkinlik">{event.title}</td>
                <td data-baslik="Tarih">{formatDate(event.date)}</td>
                <td data-baslik="Kategori">{event.category}</td>
                {/* İşlemler sütunu ve butonlar */}
                <td data-baslik="İşlemler" className="islemler">
                  <Link to={`/admin/${event.id}/edit`} className="buton">Düzenle</Link>
                  <button onClick={() => handleDelete(event.id, event.title)} className="buton buton-sil">Sil</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export default AdminPage;