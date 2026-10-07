import { events } from "./data.js";

function formatDate(dateString) {
    const parts = dateString.split('-');
    return new Date(`${parts[2]}-${parts[1]}-${parts[0]}`).toLocaleDateString("tr-TR", { day: 'numeric', month: 'long', year: 'numeric' });
}

const container = document.querySelector("#detay-kutusu");
const id = new URLSearchParams(location.search).get("id");
const event = events.find((e) => e.id === id);

if (!event) {
    // Bulunamazsa Id'siz uyarı şablonu (Adım 14)
    container.innerHTML = `
        <div class="uyari-kutu">
            Geçersiz etkinlik bağlantısı. Lütfen listeden bir etkinlik seçin.
        </div>
        <a href="etkinlikler.html" class="btn" style="margin-top: 15px;">Etkinliklere git</a>
    `;
    document.title = "Etkinlik Bulunamadı";
} else {
    // Bulunursa Şablon Tasarımı (Adım 12)
    document.title = event.title;
    const duzgunTarih = formatDate(event.date);

    const headerTitle = document.querySelector("header h1");
    if (headerTitle) headerTitle.textContent = event.title;

    container.innerHTML = `
        <div class="detay-kutu">
            <!-- Sol: Afiş -->
            <div class="detay-sol">
                <div class="afis-tasarim">
                    <h2>${event.title}</h2>
                    <h2 style="color: var(--renk-zemin); font-size:1.5rem; opacity: 0.9;">2026</h2>
                    <p>${duzgunTarih} - ${event.location}</p>
                </div>
                <p style="font-size: 0.8rem; margin-top:5px; color: var(--renk-ana); font-style: italic;">${event.title} afişi</p>
            </div>

            <!-- Sağ: Künye -->
            <div class="detay-sag">
                <div class="kunye-kutu">
                    <h3>Etkinlik Künyesi</h3>
                    <dl>
                        <dt>Tarih</dt>
                        <dd>${duzgunTarih}, ${event.time}</dd>
                        
                        <dt>Yer</dt>
                        <dd>${event.location}</dd>

                        <dt>Kategori</dt>
                        <dd>${event.category}</dd>
                        
                        <dt>Kontenjan</dt>
                        <dd>${event.capacity} kişi</dd>
                    </dl>
                </div>
            </div>
        </div>

        <div style="margin-top: 30px;">
            <h3 style="color: var(--renk-ana); font-size: 1.2rem; margin-bottom: 10px;">Açıklama</h3>
            <p style="line-height: 1.8;">${event.description}</p>
            
            <div style="margin-top: 30px; display: flex; gap: 10px;">
                <a href="etkinlikler.html" class="btn">&larr; Listeye dön</a>
                <a href="etkinlik-guncelle.html?id=${event.id}" class="btn">Bu etkinliği güncelle</a>
            </div>
        </div>
    `;
}