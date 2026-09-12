const SHEET_NAME="Mathoria_Data";
function doGet(){return ContentService.createTextOutput(JSON.stringify({ok:true,service:"Mathoria"})).setMimeType(ContentService.MimeType.JSON)}
function doPost(e){
 try{
  const d=JSON.parse(e.postData.contents), ss=SpreadsheetApp.getActiveSpreadsheet();
  let sh=ss.getSheetByName(SHEET_NAME);
  if(!sh){sh=ss.insertSheet(SHEET_NAME);sh.appendRow(["Timestamp","Nama","Level","XP","Coins","Wins","Benar","Total Soal","Akurasi","Deck"]);sh.setFrozenRows(1)}
  sh.appendRow([new Date(),d.name||"Pemain",+d.level||1,+d.xp||0,+d.coins||0,+d.wins||0,+d.correct||0,+d.total||0,+d.accuracy||0,d.deck||""]);
  return ContentService.createTextOutput(JSON.stringify({ok:true})).setMimeType(ContentService.MimeType.JSON);
 }catch(err){return ContentService.createTextOutput(JSON.stringify({ok:false,error:String(err)})).setMimeType(ContentService.MimeType.JSON)}
}
