// MATHORIA v3 — fixed game state, cost categories, richer card collection.
// Set this to your Google Apps Script Web App /exec URL.
const GOOGLE_SCRIPT_URL = "";

const CARDS = [
{id:"n-spark",name:"Number Spark",icon:"🔢",rarity:"COMMON",cost:1,atk:90,hp:150,topic:"Bilangan",skill:"Quick Start: bonus +30 damage jika dimainkan pada turn 1.",q:["Nilai 15 − 8 adalah ...",["5","6","7","8"],2,"15−8=7."]},
{id:"fraction-fox",name:"Fraction Fox",icon:"🦊",rarity:"COMMON",cost:1,atk:100,hp:140,topic:"Pecahan",skill:"Split Shot: serangan ringan tetapi cepat.",q:["1/2 + 1/4 = ...",["2/4","3/4","4/5","5/6"],1,"1/2=2/4, jadi 3/4."]},
{id:"algebra-knight",name:"Algebra Knight",icon:"⚔️",rarity:"COMMON",cost:1,atk:140,hp:240,topic:"Aljabar",skill:"Linear Strike: aljabar benar → +80 damage.",q:["Jika 3x+6=18, x = ...",["2","4","6","8"],1,"3x=12 → x=4."]},
{id:"angle-archer",name:"Angle Archer",icon:"🏹",rarity:"COMMON",cost:1,atk:110,hp:160,topic:"Geometri",skill:"Acute Arrow: +40 damage pada soal sudut.",q:["Jumlah sudut dalam segitiga adalah ...",["90°","180°","270°","360°"],1,"Jumlah sudut segitiga = 180°."]},
{id:"geometry-mage",name:"Geometry Mage",icon:"🔮",rarity:"RARE",cost:2,atk:210,hp:190,topic:"Geometri",skill:"Shape Burst: soal geometri benar → +70 damage.",q:["Luas persegi panjang 12×5 adalah ...",["17","34","60","120"],2,"12×5=60."]},
{id:"probability-rogue",name:"Probability Rogue",icon:"🎲",rarity:"RARE",cost:2,atk:180,hp:170,topic:"Peluang",skill:"Lucky Hit: damage bertambah sesuai streak.",q:["Peluang bilangan genap pada dadu adalah ...",["1/6","1/3","1/2","2/3"],2,"3 dari 6 hasil → 1/2."]},
{id:"exponent-monk",name:"Exponent Monk",icon:"☯️",rarity:"RARE",cost:2,atk:190,hp:200,topic:"Eksponen",skill:"Power Stack: bonus 20 damage tiap turn.",q:["2³ × 2² = ...",["16","24","32","64"],2,"2^(3+2)=32."]},
{id:"trig-scout",name:"Trigonometry Scout",icon:"🧭",rarity:"RARE",cost:2,atk:200,hp:175,topic:"Trigonometri",skill:"Angle Sense: +60 damage pada trigonometri.",q:["sin 30° = ...",["0","1/2","√2/2","1"],1,"sin 30°=1/2."]},
{id:"statistics-oracle",name:"Statistics Oracle",icon:"📊",rarity:"EPIC",cost:3,atk:260,hp:210,topic:"Statistika",skill:"Data Vision: benar → +50 shield untuk lane.",q:["Mean 6,8,10,12,14 adalah ...",["8","9","10","12"],2,"Jumlah 50 dibagi 5 = 10."]},
{id:"matrix-samurai",name:"Matrix Samurai",icon:"🗡️",rarity:"EPIC",cost:3,atk:290,hp:220,topic:"Matriks",skill:"Determinant Slash: +100 damage jika benar.",q:["det [[2,1],[3,4]] = ...",["5","8","11","14"],0,"2×4−1×3=5."]},
{id:"vector-ranger",name:"Vector Ranger",icon:"🏹",rarity:"EPIC",cost:3,atk:270,hp:240,topic:"Vektor",skill:"Resultant: +80 damage pada vektor.",q:["Panjang vektor (3,4) adalah ...",["3","4","5","7"],2,"√(3²+4²)=5."]},
{id:"log-witch",name:"Logarithm Witch",icon:"🧙‍♀️",rarity:"EPIC",cost:4,atk:320,hp:250,topic:"Logaritma",skill:"Log Storm: damage ×1.4.",q:["log₂16 = ...",["2","3","4","8"],2,"2⁴=16."]},
{id:"limit-seer",name:"Limit Seer",icon:"👁️",rarity:"EPIC",cost:4,atk:300,hp:280,topic:"Limit",skill:"Approach: +100 damage pada limit.",q:["lim x→0 (sin x)/x = ...",["0","1","∞","Tidak ada"],1,"Limit fundamental ini = 1."]},
{id:"integral-priest",name:"Integral Priest",icon:"📜",rarity:"EPIC",cost:4,atk:330,hp:260,topic:"Kalkulus",skill:"Area Heal: benar → +60 HP seluruh tim.",q:["∫₀² x dx = ...",["1","2","3","4"],1,"[x²/2]₀²=2."]},
{id:"sequence-alchemist",name:"Sequence Alchemist",icon:"🧪",rarity:"EPIC",cost:3,atk:250,hp:230,topic:"Barisan",skill:"Pattern Chain: +50 damage jika streak ≥2.",q:["Suku ke-10 dari 3,7,11,... adalah ...",["35","39","43","47"],1,"U10=3+9×4=39."]},
{id:"calculus-dragon",name:"Calculus Dragon",icon:"🐉",rarity:"LEGENDARY",cost:5,atk:390,hp:360,topic:"Kalkulus",skill:"Integral Apocalypse: +150 damage jika benar.",q:["Turunan 3x³−2x²+x adalah ...",["9x²−4x+1","9x²−2x+1","3x²−4x+1","9x³−4x"],0,"Turunannya 9x²−4x+1."]},
{id:"infinity-guardian",name:"Infinity Guardian",icon:"♾️",rarity:"LEGENDARY",cost:5,atk:370,hp:420,topic:"Limit",skill:"Endless Wall: HP tinggi dan +70 damage.",q:["lim x→∞ 1/x = ...",["0","1","∞","−1"],0,"Semakin besar x, 1/x mendekati 0."]},
{id:"prime-emperor",name:"Prime Emperor",icon:"👑",rarity:"LEGENDARY",cost:5,atk:430,hp:330,topic:"Bilangan",skill:"Prime Verdict: critical damage ×1.5.",q:["Bilangan prima berikut adalah ...",["21","27","29","33"],2,"29 hanya memiliki faktor 1 dan 29."]},
{id:"matrix-titan",name:"Matrix Titan",icon:"🗿",rarity:"LEGENDARY",cost:5,atk:410,hp:400,topic:"Matriks",skill:"Dimension Crush: +120 damage pada matriks.",q:["Determinan matriks identitas adalah ...",["0","1","2","−1"],1,"det(I)=1."]},
{id:"data-phoenix",name:"Data Phoenix",icon:"🔥",rarity:"LEGENDARY",cost:4,atk:350,hp:320,topic:"Statistika",skill:"Rebirth Data: jika benar, tambah 100 shield.",q:["Median 4,7,8,10,12 adalah ...",["7","8","10","12"],1,"Urutannya 4,7,8,10,12; data tengah adalah 8."]}
];

const DEFAULT_DECK=["n-spark","algebra-knight","geometry-mage","probability-rogue","statistics-oracle"];
const TOPICS=["Bilangan","Pecahan","Aljabar","Geometri","Peluang","Eksponen","Trigonometri","Statistika","Matriks","Vektor","Logaritma","Limit","Kalkulus","Barisan"];
const fresh=()=>({name:"Pemain",coins:100,level:1,xp:0,wins:0,correct:0,total:0,deck:[...DEFAULT_DECK],mastery:{},collection:CARDS.map(c=>c.id),lastSync:null});
let save=JSON.parse(localStorage.getItem("mathoria_v3")||"null")||fresh();
if(!Array.isArray(save.deck))save.deck=[...DEFAULT_DECK];
if(!Array.isArray(save.collection))save.collection=CARDS.map(c=>c.id);
TOPICS.forEach(t=>save.mastery[t] ||= {correct:0,total:0});

let battle=null, activeCost="all";

const $=id=>document.getElementById(id);
const card=id=>CARDS.find(c=>c.id===id);
function persist(){localStorage.setItem("mathoria_v3",JSON.stringify(save));renderAll();syncSheet();}
function renderAll(){renderHeader();renderHome();renderDeck();renderCollection();renderProfile();}
function renderHeader(){$("coins").textContent=save.coins;$("level").textContent=save.level;$("playerName").textContent=save.name}
function renderHome(){$("homeCards").textContent=save.deck.length;$("homeWins").textContent=save.wins;$("homeAccuracy").textContent=(save.total?Math.round(save.correct/save.total*100):0)+"%"}
function cardHTML(c,selected=false){
 return `<div class="math-card ${selected?"selected":""}" data-id="${c.id}"><span class="rarity">${c.rarity}</span><span class="cost">⚡${c.cost}</span><div class="card-art">${c.icon}</div><h3>${c.name}</h3><div class="tags">${c.topic}</div><div class="card-stats"><span>⚔️ ${c.atk}</span><span>❤️ ${c.hp}</span></div><div class="skill">${c.skill}</div></div>`;
}
function renderCollection(){
 const grid=$("collectionGrid"); if(!grid)return;
 const rarity=$("rarityFilter").value;
 const list=CARDS.filter(c=>(activeCost==="all"||c.cost===Number(activeCost))&&(rarity==="all"||c.rarity===rarity));
 grid.innerHTML=list.map(c=>cardHTML(c,save.deck.includes(c.id))).join("");
 grid.querySelectorAll(".math-card").forEach(el=>el.onclick=()=>toggleDeck(el.dataset.id));
}
function renderDeck(){
 const grid=$("deckGrid"); if(!grid)return;
 $("deckCount").textContent=`(${save.deck.length}/5)`;
 const totalCost=save.deck.reduce((s,id)=>s+card(id).cost,0);
 $("avgCost").textContent=(save.deck.length?totalCost/save.deck.length:0).toFixed(1);
 $("deckPower").textContent=save.deck.reduce((s,id)=>s+card(id).atk,0);
 $("deckHp").textContent=save.deck.reduce((s,id)=>s+card(id).hp,0);
 $("deckSlots").textContent=`${save.deck.length}/5`;
 grid.innerHTML=save.deck.map(id=>cardHTML(card(id),true)).join("")||`<p class="muted">Deck kosong. Pilih kartu dari Koleksi.</p>`;
 grid.querySelectorAll(".math-card").forEach(el=>el.onclick=()=>toggleDeck(el.dataset.id));
}
function toggleDeck(id){
 const exists=save.deck.includes(id);
 if(exists)save.deck=save.deck.filter(x=>x!==id);
 else if(save.deck.length<5)save.deck.push(id);
 else {toast("Deck maksimal 5 kartu.");return}
 persist();
}
function toast(msg){const d=document.createElement("div");d.className="modal";d.innerHTML=`<div class="modal-box"><h2>Info</h2><p class="muted">${msg}</p><button class="primary" id="closeToast">OK</button></div>`;document.body.appendChild(d);$("closeToast").onclick=()=>d.remove()}

function go(id){
 document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
 $(id).classList.add("active");
 if(id==="battle")startBattle(); if(id==="collection")renderCollection(); if(id==="deck")renderDeck(); if(id==="profile")renderProfile();
 window.scrollTo({top:0,behavior:"smooth"});
}
document.addEventListener("click",e=>{const b=e.target.closest("[data-go]");if(b)go(b.dataset.go)});
document.querySelectorAll(".filter").forEach(b=>b.onclick=()=>{document.querySelectorAll(".filter").forEach(x=>x.classList.remove("active"));b.classList.add("active");activeCost=b.dataset.cost;renderCollection()});
$("rarityFilter").onchange=renderCollection;

function startBattle(){
 if(save.deck.length<3){toast("Pilih minimal 3 kartu di Deck Builder sebelum battle.");go("deck");return}
 battle={energy:1,bossHp:900,turn:1,streak:0,used:new Set(),selected:null,score:0};
 $("battleLog").textContent="Turn 1 dimulai. Pilih kartu dengan cost sesuai energy.";
 renderArena();renderHand();
}
function renderArena(){
 $("energy").textContent=battle.energy;$("bossHp").textContent=battle.bossHp;$("bossHpBar").style.width=(battle.bossHp/900*100)+"%";
 const ids=save.deck.slice(0,3);
 $("lanes").innerHTML=ids.map((id,i)=>{const c=card(id);return `<div class="lane"><div class="lane-title">LANE ${i+1}</div><div class="unit"><div class="unit-icon">${c.icon}</div><b>${c.name}</b><small>⚡${c.cost} · ⚔️${c.atk} · ❤️${c.hp}</small></div></div>`}).join("");
}
function renderHand(){
 const hand=$("hand");const available=save.deck.filter(id=>!battle.used.has(id));
 hand.innerHTML=available.map(id=>cardHTML(card(id),false)).join("")||`<p class="muted">Semua kartu sudah dimainkan. Akhiri giliran.</p>`;
 hand.querySelectorAll(".math-card").forEach(el=>el.onclick=()=>openQuestion(el.dataset.id));
}
function openQuestion(id){
 const c=card(id);
 if(c.cost>battle.energy){$("battleLog").textContent=`⚡ ${c.name} membutuhkan ${c.cost} Energy, tetapi kamu hanya punya ${battle.energy}.`;return}
 const q=c.q;const m=document.createElement("div");m.className="modal";m.id="questionModal";
 m.innerHTML=`<div class="modal-box"><span class="chapter">${c.topic} · ${c.name} · ⚡${c.cost}</span><h2>${q[0]}</h2><div class="choices">${q[1].map((x,i)=>`<button class="answer" data-i="${i}">${String.fromCharCode(65+i)}. ${x}</button>`).join("")}</div><div id="qFeedback" class="feedback"></div></div>`;
 document.body.appendChild(m);m.querySelectorAll(".answer").forEach(b=>b.onclick=()=>resolveQuestion(Number(b.dataset.i),q,c,m));
}
function resolveQuestion(i,q,c,m){
 m.querySelectorAll(".answer").forEach(b=>b.disabled=true);m.querySelectorAll(".answer")[q[2]].classList.add("correct");
 save.total++;save.mastery[c.topic].total++;
 let dmg=0;
 if(i===q[2]){
   save.correct++;save.mastery[c.topic].correct++;battle.streak++;
   dmg=c.atk;
   if(c.cost===1&&battle.turn===1)dmg+=30;
   if(c.topic==="Geometri")dmg+=70;
   if(c.topic==="Trigonometri")dmg+=60;
   if(c.topic==="Vektor")dmg+=80;
   if(c.topic==="Matriks")dmg+=100;
   if(c.topic==="Kalkulus")dmg+=150;
   if(c.topic==="Limit")dmg+=100;
   if(c.topic==="Logaritma")dmg=Math.round(dmg*1.4);
   if(c.name==="Probability Rogue")dmg+=battle.streak*20;
   if(c.name==="Prime Emperor")dmg=Math.round(dmg*1.5);
   battle.bossHp=Math.max(0,battle.bossHp-dmg);battle.score+=dmg;
   m.querySelector("#qFeedback").textContent=`✅ Benar! ${q[3]} Damage ${dmg}.`;
   $("battleLog").textContent=`🔥 ${c.name} menyerang Gatekeeper dengan ${dmg} damage!`;
 }else{
   battle.streak=0;m.querySelectorAll(".answer")[i].classList.add("wrong");
   m.querySelector("#qFeedback").textContent=`❌ Belum tepat. ${q[3]}`;
   $("battleLog").textContent="💥 Serangan gagal. Pelajari pembahasannya dan coba strategi lain.";
 }
 battle.energy-=c.cost;battle.used.add(c.id);
 addXp(i===q[2]?50:10);
 persist();
 setTimeout(()=>{m.remove();if(battle.bossHp<=0)winBattle();else{renderArena();renderHand()}},850);
}
function endTurn(){
 if(!battle)return;
 battle.turn++;battle.energy=Math.min(7,battle.turn);battle.used.clear();battle.streak=0;
 $("battleLog").textContent=`⏭️ Turn ${battle.turn}. Energy kembali menjadi ${battle.energy}.`;
 renderArena();renderHand();
}
$("endTurn").onclick=endTurn;
function addXp(n){save.xp+=n;while(save.xp>=500){save.xp-=500;save.level++;save.coins+=100}}
function winBattle(){
 save.wins++;save.coins+=150;addXp(200);persist();
 const m=document.createElement("div");m.className="modal";m.innerHTML=`<div class="modal-box"><div style="font-size:65px">🏆</div><span class="chapter">QUEST COMPLETE</span><h2>Gatekeeper Dikalahkan!</h2><p class="muted">Sigil Aljabar berhasil didapat. +150 Coins dan +200 XP.</p><button class="primary" id="storyNext">Lanjutkan Story</button></div>`;document.body.appendChild(m);
 $("storyNext").onclick=()=>{m.remove();$("storyTitle").textContent="Gerbang Telah Terbuka";$("storyText").textContent="Gerbang terbuka. Sang penjaga mengangguk. “Tujuh wilayah menunggumu. Bangun deck-mu dan kuasai matematika satu konsep demi satu.”";go("story")};
}
function renderProfile(){
 if(!$("profileName"))return;$("profileName").textContent=save.name;$("pLevel").textContent=save.level;$("pWins").textContent=save.wins;$("pCorrect").textContent=save.correct;$("pAccuracy").textContent=(save.total?Math.round(save.correct/save.total*100):0)+"%";
 $("xpBar").style.width=(save.xp/500*100)+"%";$("xpText").textContent=`${save.xp} / 500 XP`;
 $("mastery").innerHTML=TOPICS.map(t=>{const m=save.mastery[t],p=m.total?Math.round(m.correct/m.total*100):0;return `<div class="master-row"><div class="master-top"><b>${t}</b><span>${p}% · ${m.correct}/${m.total}</span></div><div class="master-bar"><i style="width:${p}%"></i></div></div>`}).join("");
}
async function syncSheet(){
 if(!GOOGLE_SCRIPT_URL)return;
 const payload={timestamp:new Date().toISOString(),name:save.name,level:save.level,xp:save.xp,coins:save.coins,wins:save.wins,correct:save.correct,total:save.total,accuracy:save.total?Math.round(save.correct/save.total*100):0,deck:save.deck.join(",")};
 try{await fetch(GOOGLE_SCRIPT_URL,{method:"POST",mode:"no-cors",headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify(payload)});save.lastSync=new Date().toISOString();localStorage.setItem("mathoria_v3",JSON.stringify(save))}catch(e){console.warn("Google Sheet sync failed",e)}
}
(function init(){
 if(!localStorage.getItem("mathoria_v3")){const n=prompt("Nama petualang? (opsional)");if(n&&n.trim())save.name=n.trim();persist()}
 renderAll();
})();
