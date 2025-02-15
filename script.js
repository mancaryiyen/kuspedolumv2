let startButton = document.getElementById("start-button");
let stopButton = document.getElementById("stop-button");
let timeDisplay = document.getElementById("time-display");
let siloList = document.getElementById("silo-list");
let reportList = document.getElementById("report-list");

let timer;
let startTime;
let elapsedTime = 0;
let isRunning = false;

// Başlat butonuna tıklanmasıyla dolum başlar
startButton.addEventListener("click", () => {
    startTime = Date.now() - elapsedTime;
    timer = setInterval(updateTime, 1000);
    startButton.disabled = true;
    stopButton.disabled = false;
    isRunning = true;
    addSiloStatus("Dolum Başlatıldı");
});

// Durdur butonuna tıklanmasıyla dolum durur
stopButton.addEventListener("click", () => {
    clearInterval(timer);
    addReportEntry(elapsedTime);
    resetTimer();
    startButton.disabled = false;
    stopButton.disabled = true;
    addSiloStatus("Dolum Tamamlandı");
});

// Zamanı günceller
function updateTime() {
    elapsedTime = Date.now() - startTime;
    let seconds = Math.floor(elapsedTime / 1000);
    let minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;
    timeDisplay.textContent = `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}

// Silolara durum ekler
function addSiloStatus(status) {
    let li = document.createElement("li");
    li.textContent = status;
    siloList.appendChild(li);
}

// Dolum raporlarını ekler
function addReportEntry(time) {
    let minutes = Math.floor(time / 60000);
    let seconds = Math.floor((time % 60000) / 1000);
    let li = document.createElement("li");
    li.textContent = `Dolum Süresi: ${minutes} dakika ${seconds} saniye`;
    reportList.appendChild(li);
}

// Zamanlayıcıyı sıfırlar
function resetTimer() {
    elapsedTime = 0;
    timeDisplay.textContent = "00:00";
    isRunning = false;
}