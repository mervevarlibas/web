// js/event-form.js
import { events } from "./data.js"; // Adım 11 için data.js'den etkinlikleri aldık

const form = document.querySelector("#etkinlik-formu");
const mesajKutusu = document.querySelector("#form-mesaj");

// ADIM 11: Eğer bu form "Güncelleme" formuysa, id ile bul ve doldur
if (form && form.dataset.mode === "guncelle") {
    // 1. Adresten id'yi al (Örn: ?id=event-1)
    const id = new URLSearchParams(location.search).get("id");

    // 2. Bu id'ye ait etkinliği bul
    const etkinlik = events.find((e) => e.id === id);

    // 3. Etkinlik bulunduysa formu doldur
    if (etkinlik) {
        form.elements.ad.value = etkinlik.title;
        form.elements.kategori.value = etkinlik.category;
        form.elements.tarih.value = etkinlik.date;
        form.elements.saat.value = etkinlik.time;
        form.elements.yer.value = etkinlik.location;
        form.elements.aciklama.value = etkinlik.description;
        form.elements.kontenjan.value = etkinlik.capacity;
    }
    // 4. Etkinlik bulunamadıysa (veya id yoksa) formu sil ve uyarı göster
    else {
        form.outerHTML = `
            <div style="background-color: #ffcccc; padding: 20px; border: 1px solid red; border-radius: 8px;">
                <h3 style="color: red; margin-top: 0;">Uyarı</h3>
                <p>Geçersiz bir güncelleme bağlantısı kullandınız.</p>
                <a href="etkinlikler.html" style="font-weight: bold; color: #333;">Etkinliklere git &rarr;</a>
            </div>
        `;
    }
}

// ... dosyanın geri kalanı (if(form) { form.addEventListener... kısımları) aynen kalsın
// Eğer sayfada form varsa bu işlemleri yap
if (form) {
    form.addEventListener("submit", (e) => {
        // ADIM 9: Sayfanın yenilenmesini engelle (ÇOK ÖNEMLİ!)
        e.preventDefault();

        // 1. Önceki hataları ve mesajları temizle
        mesajKutusu.style.display = "none";
        mesajKutusu.innerHTML = "";

        // Tüm hata span'larının içini boşalt ve aria-invalid özelliklerini temizle
        document.querySelectorAll(".hata-metni").forEach(span => span.textContent = "");
        document.querySelectorAll("input, select").forEach(el => el.removeAttribute("aria-invalid"));
        // Kırmızı çerçeve yapma class'ını (CSS'deki .hata) kaldır
        document.querySelectorAll(".hata").forEach(el => el.classList.remove("hata"));

        // ADIM 9: Formdaki verileri FormData ile topla
        const fd = new FormData(form);

        // Form verilerinden temiz bir JavaScript nesnesi oluştur
        const data = {
            title: fd.get("ad") ? fd.get("ad").trim() : "",
            category: fd.get("kategori") ? fd.get("kategori").trim() : "",
            date: fd.get("tarih") ? fd.get("tarih").trim() : "",
            time: fd.get("saat") ? fd.get("saat").trim() : "",
            location: fd.get("yer") ? fd.get("yer").trim() : "",
            description: fd.get("aciklama") ? fd.get("aciklama").trim() : "",
            capacity: fd.get("kontenjan") ? Number(fd.get("kontenjan")) : null
        };

        // ADIM 10: Doğrulama Kuralları (Hata kontrolü)
        const errors = {};

        // Ad kuralı: 3 karakterden kısa olamaz
        if (data.title.length < 3) {
            errors.ad = "En az 3 karakter olmalı.";
        }

        // Kategori kuralı: Seçilmemiş olamaz
        if (!data.category || data.category === "Seçiniz" || data.category === "") {
            errors.kategori = "Lütfen bir kategori seçin.";
        }

        // Tarih ve saat kuralı: Boş olamaz
        if (data.date === "") {
            errors.tarih = "Tarih alanı boş bırakılamaz.";
        }
        if (data.time === "") {
            errors.saat = "Saat alanı boş bırakılamaz.";
        }

        // Yer kuralı: Boş olamaz
        if (data.location === "") {
            errors.yer = "Yer bilgisi boş bırakılamaz.";
        }

        // Kontenjan kuralı: Girildiyse 1-1000 arası olmalı
        if (data.capacity !== null && data.capacity !== 0) {
            if (data.capacity < 1 || data.capacity > 1000) {
                errors.kontenjan = "Kontenjan 1 ile 1000 arasında olmalıdır.";
            }
        }

        // Hata var mı kontrol et
        if (Object.keys(errors).length > 0) {
            // Hataları ekrana bas
            for (const key in errors) {
                const inputElement = document.querySelector(`#${key}`);
                const errorSpan = document.querySelector(`#${key}-hata`);

                if (inputElement && errorSpan) {
                    errorSpan.textContent = errors[key]; // Altına hata metnini yaz
                    inputElement.setAttribute("aria-invalid", "true"); // Kırmızı yap
                    inputElement.classList.add("hata"); // CSS'deki kırmızı border için class ekle
                }
            }

            console.log("Formda hatalar var:", errors);
            return; // Hata varsa işlemi burada durdur, başarı mesajına geçme
        }

        // Hata yoksa: Nesneyi konsola yazdır ve başarı mesajı göster
        console.log("Kaydedilecek Veri:", data);

        mesajKutusu.style.display = "block";
        // Nesneyi JSON formatında güzelce ekrana bas (Yardımcı koddaki gibi)
        mesajKutusu.innerHTML = `<strong>Başarıyla kaydedildi! (Gerçek kayıt backend sprintinde)</strong><br><pre>${JSON.stringify(data, null, 2)}</pre>`;
    });
}