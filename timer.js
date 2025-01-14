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
