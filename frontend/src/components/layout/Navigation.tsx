// src/components/layout/Navigation.tsx
import { NavLink } from "react-router-dom";

function Navigation() {
  const menuItems = [
    { to: "/", label: "Ana Sayfa" },
    { to: "/events", label: "Etkinlikler" },
    { to: "/admin", label: "Yönetim" },
    { to: "/login", label: "Giriş" },
  ];

  return (
    <nav>
      {menuItems.map((item) => (
        <NavLink 
          key={item.to} 
          to={item.to} 
          // Bulunduğun sayfaya "aktif" class'ını ekler, hocanın css'i ile beyaz kutu olur
          className={({ isActive }) => (isActive ? "aktif" : "")}
          end={item.to === "/"} 
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}

export default Navigation;