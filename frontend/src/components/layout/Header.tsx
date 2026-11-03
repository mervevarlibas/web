// src/components/layout/Header.tsx
import Navigation from "./Navigation"; // Navigation'ı buraya dahil ediyoruz

function Header() {
  return (
    <header className="ust-bilgi">
      <h1>Kampüs Etkinlik Sistemi</h1> {/* Görselde Kampüs Etkinlikleri yazıyordu, hocanın şablonuna göre değiştir */}
      <p>Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin.</p>
      
      {/* Menüyü mor alanın içine ekliyoruz */}
      <Navigation /> 
    </header>
  );
}

export default Header;