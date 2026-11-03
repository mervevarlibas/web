// src/main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { EventsProvider } from "./context/EventsContext"; // YENİ EKLENDİ
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      {/* App'i EventsProvider ile sardık */}
      <EventsProvider>
        <App />
      </EventsProvider>
    </BrowserRouter>
  </StrictMode>
);