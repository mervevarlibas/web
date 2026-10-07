// js/event-form.js
import { events } from "./data.js";

const form = document.querySelector("#etkinlik-formu");
const mesajKutusu = document.querySelector("#form-mesaj");

// -------------------------------------------------------------
// 1. KISIM: GÜNCELLEME SAYFASI MANTIĞI (Adım 11 ve 14)
// -------------------------------------------------------------
// Eğer bu sayfa GÜNCELLEME sayfasıysa (data-mode="guncelle")
if (form && form.dataset.mode === "guncelle") {
    // Adresten id'yi al (Örn: ?id=event-1)
    const id = new URLSearchParams(location.search).get("id");
    const etkinlik = events.find((e) => e.id === id);
    const container = document.querySelector("#form-container");

    if (etkinlik) {
        // İD bulunduysa formu etkinliğin mevcut bilgileriyle doldur
        form.elements.ad.value = etkinlik.title;
        form.elements.kategori.value = etkinlik.category;
        form.elements.tarih.value = etkinlik.date;
        form.elements.saat.value = etkinlik.time;
        form.elements.yer.value = etkinlik.location;
        form.elements.aciklama.value = etkinlik.description;
        form.elements.kontenjan.value = etkinlik.capacity;
    } else {
        // İD YOKSA veya BULUNAMADIYSA formu HTML'den sil, yerine uyarı bas
        if (container) {
            container.innerHTML = `
                <div class="uyari-kutu">
                    Güncellenecek etkinlik seçilmedi. Önce listeden bir etkinlik seçin, detay sayfasındaki 
                    "Bu etkinliği güncelle" butonunu kullanın.
                </div>
                <a href="etkinlikler.html" class="btn">Etkinliklere git</a>
            `;
        }
    }
}

// -------------------------------------------------------------
// 2. KISIM: FORM DOĞRULAMA VE KAYDETME MANTIĞI (Adım 9, 10, 13)
// -------------------------------------------------------------
if (form) {
    form.addEventListener("submit", (e) => {
        // Sayfanın yenilenmesini engelle (Çok önemli!)
        e.preventDefault();

        // Önceki hataları ve mesajları temizle
        mesajKutusu.style.display = "none";
        mesajKutusu.innerHTML = "";

        document.querySelectorAll(".hata-metni").forEach(span => span.textContent = "");
        document.querySelectorAll("input, select").forEach(el => el.removeAttribute("aria-invalid"));

        // Form verilerini FormData ile topla
        const fd = new FormData(form);

        // Veriyi bir JS nesnesine (object) çevir
        const data = {
            title: fd.get("ad") ? fd.get("ad").trim() : "",
            category: fd.get("kategori") ? fd.get("kategori").trim() : "",
            date: fd.get("tarih") ? fd.get("tarih").trim() : "",
            time: fd.get("saat") ? fd.get("saat").trim() : "",
            location: fd.get("yer") ? fd.get("yer").trim() : "",
            description: fd.get("aciklama") ? fd.get("aciklama").trim() : "",
            capacity: fd.get("kontenjan") ? Number(fd.get("kontenjan")) : null
        };

        const errors = {};

        // Hata Kuralları:
        if (data.title.length < 3) {
            errors.ad = "Etkinlik adı en az 3 karakter olmalı.";
        }
        if (!data.category || data.category === "Seçiniz" || data.category === "") {
            errors.kategori = "Bir kategori seçin.";
        }
        if (data.date === "") {
            errors.tarih = "Tarih seçin.";
        }
        if (data.time === "") {
            errors.saat = "Saat seçin.";
        }
        if (data.location === "") {
            errors.yer = "Yer bilgisini yazın.";
        }
        if (data.capacity !== null && data.capacity !== 0) {
            if (data.capacity < 1 || data.capacity > 1000) {
                errors.kontenjan = "Kontenjan 1-1000 arası olmalı.";
            }
        }

        // Eğer hata varsa:
        if (Object.keys(errors).length > 0) {
            // Hatalı inputları bul ve kırmızı yapıp altına mesajı yaz
            for (const key in errors) {
                const inputElement = document.querySelector(`#${key}`);
                const errorSpan = document.querySelector(`#${key}-hata`);

                if (inputElement && errorSpan) {
                    errorSpan.textContent = errors[key];
                    inputElement.setAttribute("aria-invalid", "true"); // CSS bu sayede kırmızı çerçeve çizer
                }
            }
            return; // Hata varsa işlemi burada durdur
        }

        // Hata yoksa: Yeşil kutuyu göster ve JSON verisini ekrana bas
        mesajKutusu.style.display = "block";
        mesajKutusu.innerHTML = `<span style="color: var(--renk-ana); font-weight:bold;">Etkinlik oluşturuldu (bu sprintte kaydedilmez):</span><br><pre>${JSON.stringify(data, null, 2)}</pre>`;
    });
}