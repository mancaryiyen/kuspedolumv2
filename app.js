function dolumBaslat(silo_id) {
  fetch(`/baslat/${silo_id}`, { method: 'POST' })
    .then(response => response.text())
    .then(data => {
      alert(data);
      getKayitlar(); // Kayıtları güncelle
    });
}

function dolumBitir(silo_id) {
  fetch(`/bitir/${silo_id}`, { method: 'POST' })
    .then(response => response.text())
    .then(data => {
      alert(data);
      getKayitlar(); // Kayıtları güncelle
    });
}

function getKayitlar() {
  fetch('/kayitlar')
    .then(response => response.json())
    .then(data => {
      const kayitlarListesi = document.getElementById('kayitlar');
      kayitlarListesi.innerHTML = '';
      data.forEach(kayit => {
        const li = document.createElement('li');
        li.textContent = `Silo ${kayit.silo_id} - ${kayit.sure} - ${kayit.durum}`;
        kayitlarListesi.appendChild(li);
      });
    });
}

// Sayfa yüklendiğinde kayıtları al
document.addEventListener('DOMContentLoaded', getKayitlar);