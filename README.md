# MathQuest SMK — Game Matematika 2D Kelas 10–12

Game edukasi matematika berbasis HTML, CSS, dan JavaScript dengan integrasi Google Sheets.

## File
- `index.html` — struktur game
- `style.css` — tampilan 2D/game UI
- `script.js` — gameplay, bank soal, skor, timer, XP, dan pengiriman hasil
- `Code.gs` — backend Google Apps Script untuk menerima hasil ke Google Sheet

## Menjalankan lokal
Bisa dibuka dengan browser, tetapi untuk integrasi Google Apps Script lebih aman menjalankan melalui web server sederhana, misalnya VS Code Live Server.

## Integrasi Google Sheets
1. Buat Google Sheet baru.
2. Buka **Extensions > Apps Script**.
3. Buka file `Code.gs` dan tempel isi `Code.gs` dari paket ini.
4. Klik **Deploy > New deployment**.
5. Pilih **Web app**.
6. Execute as: **Me**.
7. Who has access: **Anyone**.
8. Deploy dan salin URL yang berakhiran `/exec`.
9. Buka `script.js`, ubah:
   `const GOOGLE_SCRIPT_URL = "";`
   menjadi:
   `const GOOGLE_SCRIPT_URL = "URL_WEB_APP_ANDA";`
10. Jalankan game dan selesaikan misi. Data hasil akan masuk ke sheet `Hasil Game`.

## Catatan
- Data yang dikirim: timestamp, nama, kelas, mode, skor, jumlah benar, total soal, akurasi, XP.
- Nama pemain disimpan di localStorage browser.
- Untuk produksi sekolah, sebaiknya tambahkan validasi server, autentikasi, dan pembatasan akses Apps Script.
- Bank soal dapat diperluas pada objek `questionBank` di `script.js`.
