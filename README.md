# Mathoria v3 — Story RPG + Card Battle

## Perbaikan utama
- State battle diperbaiki agar tidak reset secara tidak sengaja saat navigasi.
- Deck memakai sistem Energy Cost 1–5.
- Koleksi diperluas menjadi 20 kartu dengan variasi Common/Rare/Epic/Legendary.
- Filter koleksi berdasarkan Energy Cost dan Rarity.
- Deck Builder menampilkan average cost, power, HP, dan slot.
- Battle membatasi kartu berdasarkan Energy.
- Sistem turn: Energy bertambah hingga 7 dan kartu dapat digunakan lagi pada turn berikutnya.
- Soal matematika menjadi pemicu damage/skill kartu.
- Mastery materi lebih luas.
- Progress tersimpan di LocalStorage.
- Google Sheets sync disiapkan melalui Apps Script.
- UI responsive.

## Cara pasang Google Sheets
1. Buat Google Sheet.
2. Extensions > Apps Script.
3. Tempel `Code.gs`.
4. Deploy > New deployment > Web app.
5. Execute as: Me.
6. Who has access: Anyone.
7. Copy URL `/exec`.
8. Isi `GOOGLE_SCRIPT_URL` di `script.js`.

## Catatan desain
Untuk tahap berikutnya, sistem dapat dikembangkan menjadi:
- 7 chapter story
- 50–100 kartu
- faction/element
- efek status
- lane objective
- boss dengan beberapa fase
- daily quest
- leaderboard kelas
- dashboard guru
- bank soal dari Google Sheet
