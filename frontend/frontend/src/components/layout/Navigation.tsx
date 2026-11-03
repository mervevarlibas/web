// src/components/layout/Navigation.tsx
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <nav className="navigasyon">
      <ul style={{ display: "flex", gap: "1.5rem", listStyle: "none", padding: 0, margin: 0 }}>
        <li>
          <Link to="/">Ana Sayfa</Link>
        </li>
        <li>
          <Link to="/events">Etkinlikler</Link>
        </li>
        <li>
          <Link to="/admin">Yönetim</Link>
        </li>
        <li>
          <Link to="/login">Giriş</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;