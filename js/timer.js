function updateClock() {
  const now = new Date();

  // Saat dilimini GMT+3'e ayarla
  const offset = 3; // GMT+3
  const localTime = new Date(now.getTime() + offset * 60 * 60 * 1000);

  // Tarih bilgisi
  const days = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
  const months = [
      'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
      'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
  ];

  const dayName = days[localTime.getUTCDay()];
  const date = localTime.getUTCDate();
  const month = months[localTime.getUTCMonth()];
  const year = localTime.getUTCFullYear();

  // Saat bilgisi
  const hours = localTime.getUTCHours();
  const minutes = localTime.getUTCMinutes().toString().padStart(2, '0');
  const seconds = localTime.getUTCSeconds().toString().padStart(2, '0');

  // Zaman dilimi belirleme
  let timePeriod = '';
  if (hours >= 6 && hours < 14) {
      timePeriod = 'Sabah';
  } else if (hours >= 14 && hours < 19) {
      timePeriod = 'Akşam';
  } else {
      timePeriod = 'Gece';
  }

  // Formatlanmış tarih ve saat
  const formattedDate = `${dayName}, ${date} ${month} ${year}`;
  const formattedTime = `${hours}:${minutes}:${seconds}`;
  const displayText = `${formattedDate} · ${timePeriod}, ${formattedTime}`;

  // HTML'e yazdır
  document.getElementById('clock').textContent = displayText;
}

// Saat güncelleme fonksiyonunu her saniye çağır
setInterval(updateClock, 1000);
updateClock();






let timerId = null;
let currentSecond = 0;

function updateCurrentSecond() {
    const display = document.getElementById("currentSecond");
    const timeInput = document.getElementById("timeInput").value;

    // Saniye döngüsü
    currentSecond = (currentSecond % 60) + 1;
    display.innerText = `${currentSecond}`;
    console.log(timeInput, currentSecond, currentSecond == timeInput);

    // Yazı rengini ayarla
    if (timeInput && (currentSecond == timeInput)) {
        document.getElementById("currentSecond").style.color = "#ffc0cb";
    } else {
        document.getElementById("currentSecond").style.color = "#a1a0ab";
    }
}

document.getElementById("startButton").addEventListener("click", () => {
    const timeInput = document.getElementById("timeInput").value;
    const mode = document.getElementById("modeSelect").value;
    const alarmSound = document.getElementById("alarmSound");

    // Geçerli bir süre kontrolü (1-60 saniye)
    if (!timeInput || timeInput < 1 || timeInput > 60) {
        alert("Lütfen 1-60 arasında bir sayı giriniz.");
        return;
    }

    const delay = timeInput * 1000; // Milisaniye cinsinden

    // Timer başlat
    if (timerId) {
        clearInterval(timerId);
    }

    // Tek seferlik modda
    if (mode === "once") {
        timerId = setInterval(updateCurrentSecond, 1000);
        setTimeout(() => {
            if (currentSecond == timeInput) {
                alarmSound.play().catch(error => console.error("Ses çalınamadı:", error));
                // Süre tamamlandığında sıfırlama ve intervali kapatma
                clearInterval(timerId);
                currentSecond = 0; // Sıfırlama
                document.getElementById("currentSecond").innerText = `${currentSecond}`;
            }
        }, delay);
    }
    // Sonsuz tekrar modunda
    else if (mode === "repeat") {
        currentSecond = 0; // Başlangıçta sıfırla
        timerId = setInterval(() => {
            updateCurrentSecond();
            if (currentSecond == timeInput) {
                alarmSound.play().catch(error => console.error("Ses çalınamadı:", error));
            }
        }, 1000);
    }

    document.getElementById("startButton").disabled = true;
    document.getElementById("stopButton").disabled = false;
});

document.getElementById("stopButton").addEventListener("click", () => {
    if (timerId) {
        clearInterval(timerId);
        timerId = null;
    }

    document.getElementById("startButton").disabled = false;
    document.getElementById("stopButton").disabled = true;
});
