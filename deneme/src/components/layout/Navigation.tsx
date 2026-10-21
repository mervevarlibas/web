// src/components/layout/Navigation.tsx
import type { PageName } from "../../types/page";

// Dışarıdan alacağımız verilerin (props) tipleri
interface NavigationProps {
  current: PageName; // Hangi sayfa açık?
  onNavigate: (page: PageName) => void; // Linke tıklanınca App'e haber verecek fonksiyon
}

function Navigation({ current, onNavigate }: NavigationProps) {
  // Menü dizisini buraya taşıdık
  const menuItems: { name: PageName; label: string }[] = [
    { name: "home", label: "Ana Sayfa" },
    { name: "events", label: "Etkinlikler" },
    { name: "add", label: "Ekle" },
  ];

  return (
    <nav>
      {menuItems.map((item) => (
        <a
          key={item.name}
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onNavigate(item.name); // Tıklanınca yukarıya (App'e) haber ver
          }}
          className={current === item.name ? "aktif" : ""}
          aria-current={current === item.name ? "page" : undefined}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}

export default Navigation;