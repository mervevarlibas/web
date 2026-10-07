// js/event-list.js

import { events } from "./data.js";

// Tarihi düzgün formata çeviren yardımcı fonksiyon
function formatDate(dateString) {
    const parts = dateString.split('-');
    const formattedDate = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
    return formattedDate.toLocaleDateString("tr-TR", { day: 'numeric', month: 'long', year: 'numeric' });
}

// HTML kart şablonunu oluşturan fonksiyon
// HTML kart şablonunu oluşturan fonksiyon
function createCard(event) {
    const duzgunTarih = formatDate(event.date);
    return `
        <article class="kart">
            <b>${event.title}</b>
            <span class="kategori">${event.category}</span>
            <p>Tarih: ${duzgunTarih}, ${event.time}</p>
            <p>Yer: ${event.location}</p>
            <p>Kontenjan: ${event.capacity} kişi</p>
            <p style="margin-top: 15px; margin-bottom: 15px;">${event.description}</p>
            <a href="etkinlik-detay.html?id=${event.id}" class="detay-link">Detayları gör</a>
        </article>
    `;
}

// HTML elemanlarını bul
const listContainer = document.querySelector("#etkinlik-listesi");
const aramaKutusu = document.querySelector("#arama");
const kategoriFiltre = document.querySelector("#kategori-filtre");
const sonucSatiri = document.querySelector("#sonuc"); // Adım 7: sonuc id'si

// Ana render fonksiyonu
function render(dizi) {
    if (!listContainer) return;

    if (listContainer.dataset.limit) {
        // Ana sayfa için (data-limit="2")
        const yaklasan = [...events]
            .sort((a, b) => a.date.localeCompare(b.date))
            .slice(0, Number(listContainer.dataset.limit));
        listContainer.innerHTML = yaklasan.map(createCard).join("");
    } else {
        // Liste sayfası için tüm diziyi bas
        listContainer.innerHTML = dizi.map(createCard).join("");
    }
}

// Filtreleme fonksiyonu (Adım 7)
function filtrele(e) {
    // Enter tuşuna basıldığında sayfanın yenilenmesini engelle (form gönderilmesin)
    if (e && e.preventDefault) e.preventDefault();

    const aranan = aramaKutusu.value.toLocaleLowerCase("tr-TR");
    const secilenKategori = kategoriFiltre.value;

    const sonuc = events.filter((e) => {
        // Metin eşleşmesi
        const metinUyuyor = e.title.toLocaleLowerCase("tr-TR").includes(aranan) ||
            e.description.toLocaleLowerCase("tr-TR").includes(aranan) ||
            e.location.toLocaleLowerCase("tr-TR").includes(aranan);

        // Kategori eşleşmesi
        const kategoriUyuyor = secilenKategori === "" || e.category === secilenKategori;

        // İki koşulu birden sağlayanlar kalsın
        return metinUyuyor && kategoriUyuyor;
    });

    render(sonuc);

    // Sonuç sayısını veya hata mesajını yazdır
    if (sonuc.length > 0) {
        sonucSatiri.textContent = `${sonuc.length} etkinlik`;
    } else {
        sonucSatiri.textContent = "bulunamadı";
    }
}

// Sadece etkinlikler sayfasında filtre ve kategori işlemleri yap
if (aramaKutusu && kategoriFiltre) {
    // 1. Kategorileri veriden üret ve select kutusuna ekle
    const kategoriler = [...new Set(events.map(e => e.category))]; // new Set ile tekrarları çıkar
    kategoriler.forEach(kat => {
        const option = document.createElement("option");
        option.value = kat;
        option.textContent = kat;
        kategoriFiltre.appendChild(option);
    });

    // 2. Arama kutusu ve kategori seçimi değiştikçe filtrele'yi çalıştır
    aramaKutusu.addEventListener("input", filtrele);
    kategoriFiltre.addEventListener("change", filtrele);

    // Formun default gönderimini engellemek için submit olayını dinle
    document.querySelector("#filtre-formu").addEventListener("submit", filtrele);

    // Sayfa ilk açıldığında da sonuç sayısını yazsın diye
    sonucSatiri.textContent = `${events.length} etkinlik`;
}

// İlk render işlemi
render(events);