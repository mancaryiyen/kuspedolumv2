function setStartTime(depoId) {
    let startTime = prompt("Başlangıç saati girin (format: HH:MM):");
    if (startTime) {
        document.getElementById("start" + depoId.charAt(depoId.length - 1)).innerText = startTime;
        startTimer(depoId, startTime);
    }
}

function startTimer(depoId, startTime) {
    let [startHour, startMinute] = startTime.split(":").map(Number);
    let startTimeInMinutes = startHour * 60 + startMinute;

    setInterval(function() {
        let currentTime = new Date();
        let currentHour = currentTime.getHours();
        let currentMinute = currentTime.getMinutes();

        let currentTimeInMinutes = currentHour * 60 + currentMinute;
        let durationInMinutes = currentTimeInMinutes - startTimeInMinutes;
        let hours = Math.floor(durationInMinutes / 60);
        let minutes = durationInMinutes % 60;

        document.getElementById("süre" + depoId.charAt(depoId.length - 1)).innerText = `${hours} saat ${minutes} dakika`;
    }, 60000); // 1 dakikada bir süreyi güncelle
}
