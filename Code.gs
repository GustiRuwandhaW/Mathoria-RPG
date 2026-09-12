/**
 * Google Apps Script backend untuk MathQuest.
 *
 * 1. Buat Google Sheet baru.
 * 2. Extensions > Apps Script.
 * 3. Tempel kode ini ke Code.gs.
 * 4. Deploy > New deployment > Web app.
 * 5. Execute as: Me.
 * 6. Who has access: Anyone.
 * 7. Salin URL /exec ke GOOGLE_SCRIPT_URL di script.js.
 */
const SHEET_NAME = "Hasil Game";

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ok:true, message:"MathQuest API aktif"}))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);

    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow([
        "Timestamp","Nama","Kelas","Mode","Skor",
        "Benar","Total Soal","Akurasi (%)","XP"
      ]);
      sheet.setFrozenRows(1);
    }

    sheet.appendRow([
      new Date(data.timestamp || new Date()),
      data.nama || "Pemain",
      data.kelas || "",
      data.mode || "",
      Number(data.skor || 0),
      Number(data.benar || 0),
      Number(data.total || 0),
      Number(data.akurasi || 0),
      Number(data.xp || 0)
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ok:true}))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ok:false,error:String(err)}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
