// js/event-detail.js

import { events } from "./data.js";

// Tarihi formata çeviren yardımcı fonksiyon
function formatDate(dateString) {
    const parts = dateString.split('-');
    const formattedDate = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
    return formattedDate.toLocaleDateString("tr-TR", { day: 'numeric', month: 'long', year: 'numeric' });
}

// 1. HTML'deki boş container'ı bul
const container = document.querySelector("#detay-kutusu");

// 2. Adres çubuğundan (URL'den) id'yi al (örneğin: ?id=event-3)
const id = new URLSearchParams(location.search).get("id");

// 3. Bu id'ye sahip etkinliği events dizisinde bul (Yoksa undefined döner)
const event = events.find((e) => e.id === id);

// 4. Etkinlik bulunamadıysa (örneğin url'ye elle ?id=event-99 yazılırsa) hata göster
if (!event) {
    container.innerHTML = `
        <div style="background-color: #ffcccc; padding: 20px; border: 1px solid red; border-radius: 8px; width: 100%;">
            <h3 style="color: red; margin-top: 0;">Etkinlik Bulunamadı</h3>
            <p>Aradığınız etkinlik silinmiş olabilir veya yanlış bir bağlantıya tıkladınız.</p>
            <a href="etkinlikler.html" style="font-weight: bold; text-decoration: none; color: #333;">&larr; Listeye dön</a>
        </div>
    `;
    document.title = "Etkinlik Bulunamadı"; // Sekme adını değiştir
}
// 5. Etkinlik bulunduysa künyeyi ve başlığı doldur
else {
    document.title = event.title; // Sekme adını etkinliğin adı yap

    const duzgunTarih = formatDate(event.date);

    // HTML yapısını şablon metin (template literal) ile oluşturup container'a bas
    container.innerHTML = `
        <div class="detay-sol">
            <div class="detay-afis">
                <!-- Afiş resmini buraya koyabilirsiniz, şimdilik metin veya var olan görseliniz -->
                <img src="images.png" alt="Etkinlik Afişi">
            </div>
            <p style="font-size: 0.8rem; margin-top:5px;"><i>Şekil 1: etkinlik afişi</i></p>
        </div>

        <div class="detay-sag detay-kunye">
            <dl>
                <dt>Tarih</dt>
                <dd>${duzgunTarih}, ${event.time}</dd>
                
                <dt>Yer</dt>
                <dd>${event.location}</dd>

                <dt>Kategori</dt>
                <dd>${event.category}</dd>
                
                <dt>Kontenjan</dt>
                <dd>${event.capacity}</dd>
            </dl>
            
            <p style="margin-top: 20px;">${event.description}</p>
            <a href="etkinlikler.html" class="detay-link">&larr; Listeye dön</a>
            <a href="etkinlik-guncelle.html?id=${event.id}" class="detay-link" style="margin-left:15px; color: #d35400;">Bu etkinliği güncelle &rarr;</a>
        </div>
    `;

    // Eğer başlık kısmını da (h1) değiştirmek isterseniz:
    const headerTitle = document.querySelector("header h1");
    if (headerTitle) {
        headerTitle.textContent = event.title;
    }
}