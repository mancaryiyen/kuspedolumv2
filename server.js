const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

// Veritabanı bağlantısı
let db = new sqlite3.Database('./silo_dolum.db', (err) => {
  if (err) {
    console.error('Veritabanı bağlantı hatası:', err.message);
  } else {
    console.log('Veritabanına bağlandı.');
  }
});

// Veritabanı tablosu oluşturma
db.run('CREATE TABLE IF NOT EXISTS dolumlar (id INTEGER PRIMARY KEY AUTOINCREMENT, silo_id INTEGER, baslangic_saati TEXT, bitis_saati TEXT, sure TEXT, durum TEXT)');

// Ana sayfa
app.get('/', (req, res) => {
  res.send('Silo Dolum Sistemi');
});

// Dolum başlatma
app.post('/baslat/:silo_id', (req, res) => {
  const silo_id = req.params.silo_id;
  const baslangic_saati = new Date().toLocaleString();
  db.run('INSERT INTO dolumlar (silo_id, baslangic_saati, durum) VALUES (?, ?, ?)', [silo_id, baslangic_saati, 'Dolumda'], (err) => {
    if (err) {
      res.status(500).send('Bir hata oluştu.');
    } else {
      res.send('Dolum başlatıldı!');
    }
  });
});

// Dolum bitirme
app.post('/bitir/:silo_id', (req, res) => {
  const silo_id = req.params.silo_id;
  const bitis_saati = new Date().toLocaleString();
  db.get('SELECT baslangic_saati FROM dolumlar WHERE silo_id = ? ORDER BY id DESC LIMIT 1', [silo_id], (err, row) => {
    if (err) {
      res.status(500).send('Bir hata oluştu.');
    } else {
      const baslangic_saati = new Date(row.baslangic_saati);
      const bitis_zamani = new Date(bitis_saati);
      const fark = Math.floor((bitis_zamani - baslangic_saati) / 60000); // Dakika cinsinden fark

      const saat = Math.floor(fark / 60);
      const dakika = fark % 60;

      db.run('UPDATE dolumlar SET bitis_saati = ?, sure = ?, durum = ? WHERE silo_id = ? ORDER BY id DESC LIMIT 1', [bitis_saati, `${saat} saat ${dakika} dakika`, 'Boş', silo_id], (err) => {
        if (err) {
          res.status(500).send('Bir hata oluştu.');
        } else {
          res.send(`Dolum tamamlandı. Süre: ${saat} saat ${dakika} dakika`);
        }
      });
    }
  });
});

// Dinleyici
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda çalışıyor.`);
});