// ===============================
// MathQuest SMK - Game Engine
// ===============================

// GANTI dengan URL Web App Google Apps Script Anda.
// Contoh: https://script.google.com/macros/s/AKfycb.../exec
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyORfzLEV-OoAhc4CldMORwGFMZoDtjvsFYW8ZCl9IM4M1cEgOVae8gdSNLRz5mS7TdHw/exec";

const questionBank = {
  10: [
    {topic:"Aljabar", difficulty:"Mudah", q:"Jika 3x + 7 = 22, maka nilai x adalah ...", choices:["3","5","7","9"], answer:1, xp:100, explain:"3x = 15 sehingga x = 5."},
    {topic:"Persamaan", difficulty:"Mudah", q:"Hasil dari 2(3x − 4) = 16 adalah ...", choices:["2","3","4","6"], answer:2, xp:100, explain:"6x − 8 = 16 → 6x = 24 → x = 4."},
    {topic:"Eksponen", difficulty:"Sedang", q:"Nilai 2³ × 2² adalah ...", choices:["16","24","32","64"], answer:2, xp:120, explain:"Pangkat dijumlahkan: 2^(3+2) = 2⁵ = 32."},
    {topic:"Aritmetika", difficulty:"Mudah", q:"Sebuah barang Rp200.000 mendapat diskon 15%. Harga setelah diskon adalah ...", choices:["Rp160.000","Rp170.000","Rp175.000","Rp185.000"], answer:1, xp:100, explain:"15% × 200.000 = 30.000, jadi Rp170.000."},
    {topic:"Fungsi", difficulty:"Sedang", q:"Jika f(x)=2x+3, maka f(4)= ...", choices:["7","9","11","12"], answer:2, xp:120, explain:"f(4)=2(4)+3=11. Perhatikan pilihan: jawaban benar adalah 11.",},
    {topic:"Geometri", difficulty:"Mudah", q:"Luas persegi panjang dengan panjang 12 cm dan lebar 5 cm adalah ...", choices:["17 cm²","34 cm²","60 cm²","120 cm²"], answer:2, xp:100, explain:"L = p × l = 12 × 5 = 60 cm²."},
    {topic:"Statistika", difficulty:"Sedang", q:"Mean dari 6, 8, 10, 12, 14 adalah ...", choices:["8","9","10","12"], answer:2, xp:120, explain:"Jumlah 50 dibagi 5 = 10."},
    {topic:"Peluang", difficulty:"Sedang", q:"Sebuah dadu dilempar sekali. Peluang muncul bilangan genap adalah ...", choices:["1/6","1/3","1/2","2/3"], answer:2, xp:120, explain:"Ada 3 hasil genap dari 6 kemungkinan, jadi 3/6=1/2."},
    {topic:"Trigonometri", difficulty:"Sedang", q:"Nilai sin 30° adalah ...", choices:["0","1/2","√2/2","1"], answer:1, xp:120, explain:"sin 30° = 1/2."},
    {topic:"Barisan", difficulty:"Sedang", q:"Barisan 3, 7, 11, 15, ... memiliki suku ke-10 sebesar ...", choices:["35","39","43","47"], answer:1, xp:130, explain:"Un = 3 + (n−1)4. U10 = 3+36 = 39."}
  ],
  11: [
    {topic:"Matriks", difficulty:"Sedang", q:"Jika A = [[2,1],[3,4]], maka determinan A adalah ...", choices:["5","8","11","14"], answer:0, xp:130, explain:"det(A)=2×4−1×3=5."},
    {topic:"Fungsi Komposisi", difficulty:"Sedang", q:"f(x)=2x dan g(x)=x+3. Nilai (f∘g)(2) adalah ...", choices:["7","8","10","12"], answer:2, xp:140, explain:"g(2)=5, lalu f(5)=10."},
    {topic:"Turunan", difficulty:"Sedang", q:"Turunan dari f(x)=x²+4x−1 adalah ...", choices:["x+4","2x+4","2x−1","x²+4"], answer:1, xp:140, explain:"d(x²)/dx=2x dan d(4x)/dx=4."},
    {topic:"Limit", difficulty:"Sulit", q:"lim x→2 (x²−4)/(x−2) adalah ...", choices:["2","3","4","6"], answer:2, xp:160, explain:"Faktorkan menjadi (x−2)(x+2)/(x−2), hasilnya 4."},
    {topic:"Statistika", difficulty:"Sedang", q:"Median data 4, 7, 8, 10, 12, 15, 18 adalah ...", choices:["7","8","10","12"], answer:2, xp:130, explain:"Ada 7 data, nilai tengah adalah data ke-4 = 10."},
    {topic:"Peluang", difficulty:"Sulit", q:"Peluang mengambil kartu As dari 52 kartu adalah ...", choices:["1/13","1/26","4/13","1/4"], answer:0, xp:150, explain:"Ada 4 As dari 52 kartu: 4/52 = 1/13."},
    {topic:"Trigonometri", difficulty:"Sedang", q:"Jika tan θ = 3/4 dan θ lancip, maka sin θ = ...", choices:["3/5","4/5","3/4","5/4"], answer:0, xp:140, explain:"Segitiga 3-4-5, sehingga sin θ = 3/5."},
    {topic:"Program Linear", difficulty:"Sedang", q:"Titik yang memenuhi x≥0, y≥0, x+y≤5 adalah ...", choices:["(2,2)","(3,3)","(−1,2)","(4,2)"], answer:0, xp:130, explain:"(2,2) memenuhi x≥0, y≥0, dan x+y=4≤5.",},
    {topic:"Eksponensial", difficulty:"Sedang", q:"Jika 2^x = 32, maka x = ...", choices:["4","5","6","8"], answer:1, xp:120, explain:"32 = 2⁵, jadi x=5."},
    {topic:"Logaritma", difficulty:"Sedang", q:"Nilai log₂ 16 adalah ...", choices:["2","3","4","8"], answer:2, xp:130, explain:"2⁴=16, jadi log₂16=4."}
  ],
  12: [
    {topic:"Turunan", difficulty:"Sedang", q:"Jika f(x)=3x³−2x²+x, maka f'(x)= ...", choices:["9x²−4x+1","9x²−2x+1","3x²−4x+1","9x³−4x"], answer:0, xp:160, explain:"Turunan: 9x²−4x+1."},
    {topic:"Integral", difficulty:"Sedang", q:"∫ 2x dx = ...", choices:["x²+C","2x²+C","x²/2+C","2+C"], answer:0, xp:150, explain:"Integral 2x adalah x²+C."},
    {topic:"Integral", difficulty:"Sulit", q:"∫₀² x dx = ...", choices:["1","2","3","4"], answer:1, xp:170, explain:"[x²/2]₀² = 2."},
    {topic:"Limit", difficulty:"Sulit", q:"lim x→0 (sin x)/x = ...", choices:["0","1","∞","Tidak ada"], answer:1, xp:180, explain:"Limit fundamental trigonometri ini bernilai 1."},
    {topic:"Matriks", difficulty:"Sulit", q:"Jika matriks identitas berordo 2 adalah I, maka det(I)= ...", choices:["0","1","2","−1"], answer:1, xp:150, explain:"Determinan matriks identitas selalu 1."},
    {topic:"Vektor", difficulty:"Sedang", q:"Panjang vektor (3,4) adalah ...", choices:["3","4","5","7"], answer:2, xp:140, explain:"√(3²+4²)=5."},
    {topic:"Peluang", difficulty:"Sulit", q:"Dua dadu dilempar. Banyak kemungkinan hasil yang mungkin adalah ...", choices:["12","24","36","42"], answer:2, xp:150, explain:"6 × 6 = 36 pasangan berurutan."},
    {topic:"Barisan", difficulty:"Sedang", q:"Jumlah 10 suku pertama barisan aritmetika 2,5,8,... adalah ...", choices:["145","150","155","160"], answer:2, xp:160, explain:"S10=10/2(2×2+9×3)=5×31=155."},
    {topic:"Logaritma", difficulty:"Sedang", q:"Jika log₁₀ x = 3, maka x = ...", choices:["30","100","300","1000"], answer:3, xp:140, explain:"x = 10³ = 1000."},
    {topic:"Geometri", difficulty:"Sedang", q:"Volume tabung dengan r=7 cm dan t=10 cm, gunakan π=22/7, adalah ...", choices:["770 cm³","1.100 cm³","1.540 cm³","2.200 cm³"], answer:2, xp:150, explain:"V=πr²t=(22/7)×49×10=1540 cm³."}
  ]
};

let state = {
  grade: 10, mode:"campuran", questions:[], index:0, score:0, xp:0,
  correct:0, streak:0, timer:30, timerId:null, startedAt:null
};

const $ = id => document.getElementById(id);
const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);

function showScreen(id){
  document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
  $(id).classList.add("active");
}

function makeQuestions(){
  let bank = shuffle(questionBank[state.grade]);
  let count = state.mode === "cepat" ? 10 : 10;
  state.questions = bank.slice(0,count);
}

function startGame(){
  state.grade = Number($("gradeSelect").value);
  state.mode = $("modeSelect").value;
  state.index=0; state.score=0; state.xp=0; state.correct=0; state.streak=0;
  $("score").textContent=0; $("streak").textContent="0🔥";
  makeQuestions();
  state.startedAt = new Date();
  showScreen("gameScreen");
  renderQuestion();
}

function renderQuestion(){
  clearInterval(state.timerId);
  const q = state.questions[state.index];
  $("questionNo").textContent = state.index+1;
  $("totalQuestions").textContent = state.questions.length;
  $("progressBar").style.width = `${(state.index/state.questions.length)*100}%`;
  $("topicPill").textContent = q.topic;
  $("difficulty").textContent = q.difficulty;
  $("xp").textContent = `+${q.xp} XP`;
  $("questionText").textContent = q.q;
  $("feedback").className = "feedback";
  $("feedback").textContent = "";
  $("nextBtn").classList.add("hidden");
  $("choices").innerHTML = "";

  q.choices.forEach((choice,i)=>{
    const btn=document.createElement("button");
    btn.className="choice";
    btn.textContent=`${String.fromCharCode(65+i)}. ${choice}`;
    btn.onclick=()=>answerQuestion(i);
    $("choices").appendChild(btn);
  });

  state.timer = state.mode==="cepat" ? 15 : state.mode==="latihan" ? 60 : 30;
  $("timer").textContent=state.timer;
  state.timerId=setInterval(()=>{
    state.timer--;
    $("timer").textContent=state.timer;
    if(state.timer<=0){
      clearInterval(state.timerId);
      answerQuestion(-1);
    }
  },1000);
}

function answerQuestion(selected){
  clearInterval(state.timerId);
  const q=state.questions[state.index];
  const buttons=[...document.querySelectorAll(".choice")];
  buttons.forEach(b=>b.disabled=true);
  buttons[q.answer]?.classList.add("correct");

  if(selected===q.answer){
    state.correct++;
    state.streak++;
    const bonus=Math.max(0,state.streak-1)*10;
    state.xp += q.xp + bonus;
    state.score += 100 + bonus + state.timer*3;
    $("feedback").className="feedback good";
    $("feedback").textContent=`✅ Benar! ${q.explain} +${q.xp+bonus} XP`;
  }else{
    state.streak=0;
    if(selected>=0) buttons[selected].classList.add("wrong");
    $("feedback").className="feedback bad";
    $("feedback").textContent=`❌ Belum tepat. ${q.explain}`;
  }
  $("score").textContent=state.score;
  $("streak").textContent=`${state.streak}🔥`;
  $("nextBtn").classList.remove("hidden");
}

function nextQuestion(){
  state.index++;
  if(state.index>=state.questions.length) finishGame();
  else renderQuestion();
}

function finishGame(){
  clearInterval(state.timerId);
  const accuracy=Math.round((state.correct/state.questions.length)*100);
  $("progressBar").style.width="100%";
  $("finalScore").textContent=state.score;
  $("finalCorrect").textContent=`${state.correct}/${state.questions.length}`;
  $("finalAccuracy").textContent=`${accuracy}%`;
  $("finalXP").textContent=state.xp;
  $("resultMessage").textContent=accuracy>=80 ? "Luar biasa! Kamu siap naik level. 🚀" :
    accuracy>=60 ? "Bagus! Sedikit lagi menuju level berikutnya. 💪" :
    "Tetap semangat. Ulangi misi dan kuasai konsepnya! 📚";
  showScreen("resultScreen");
  saveResult(accuracy);
}

async function saveResult(accuracy){
  if(!GOOGLE_SCRIPT_URL){
    $("saveStatus").textContent="ℹ️ Google Sheet belum dikonfigurasi. Isi GOOGLE_SCRIPT_URL di script.js.";
    return;
  }
  $("saveStatus").textContent="⏳ Menyimpan hasil ke Google Sheet...";
  const payload={
    timestamp:new Date().toISOString(),
    nama: localStorage.getItem("mathquest_nama") || "Pemain",
    kelas: state.grade,
    mode: state.mode,
    skor: state.score,
    benar: state.correct,
    total: state.questions.length,
    akurasi: accuracy,
    xp: state.xp
  };
  try{
    await fetch(GOOGLE_SCRIPT_URL,{
      method:"POST",
      mode:"no-cors",
      headers:{"Content-Type":"text/plain;charset=utf-8"},
      body:JSON.stringify(payload)
    });
    $("saveStatus").textContent="✅ Hasil dikirim ke Google Sheet.";
  }catch(err){
    console.error(err);
    $("saveStatus").textContent="⚠️ Gagal mengirim hasil. Periksa URL Apps Script.";
  }
}

$("startBtn").onclick=startGame;
$("nextBtn").onclick=nextQuestion;
$("retryBtn").onclick=startGame;
$("menuBtn").onclick=()=>showScreen("menuScreen");

// Nama pemain opsional, tersimpan di browser.
if(!localStorage.getItem("mathquest_nama")){
  const nama=prompt("Masukkan nama pemain (opsional):");
  if(nama && nama.trim()) localStorage.setItem("mathquest_nama",nama.trim());
}
