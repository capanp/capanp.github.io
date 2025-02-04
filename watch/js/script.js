console.log("uie");

const episodesList = document.getElementById("episodes");
//merahba denme
let x = 310;
console.log(x);

function getDominantColor(imageUrl, callback) {
  const img = new Image();
  img.crossOrigin = "Anonymous"; // CORS hatalarını önlemek için
  img.src = imageUrl;

  img.onload = function () {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Resmi canvas'a çiz
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0, img.width, img.height);

    // Piksel verilerini al
    const imageData = ctx.getImageData(0, 0, img.width, img.height);
    const data = imageData.data;

    let colorMap = {};
    let maxCount = 0;
    let dominantColor = '';

    for (let i = 0; i < data.length; i += 4) {
      let r = data[i];
      let g = data[i + 1];
      let b = data[i + 2];

      let rgb = `${r},${g},${b}`;
      colorMap[rgb] = (colorMap[rgb] || 0) + 1;

      if (colorMap[rgb] > maxCount) {
        maxCount = colorMap[rgb];
        dominantColor = rgb;
      }
    }

    // Dominant renkleri al ve şeffaflık ekleyerek RGBA formatına çevir
    const [r, g, b] = dominantColor.split(',');
    const rgbaColor = `rgba(${r},${g},${b},0.1)`;

    // Sonucu callback fonksiyonuyla döndür
    callback(rgbaColor);
  };

  img.onerror = function () {
    callback(null, "Resim yüklenemedi!");
  };
}

// JSON dosyasını al 
fetch('./data/animes.json?v=' + new Date().getTime())
  .then((response) => {
    if (!response.ok) {
      throw new Error("JSON dosyası yüklenemedi");
    }
    return response.json();
  })
  .then((episodes) => {
    // ID'ye göre sıralayıp, en büyük 6 id'ye sahip animeleri al
    const sortedEpisodes = episodes.sort((a, b) => b.id - a.id); // Büyükten küçüğe sıralama
    const latestEpisodes = sortedEpisodes.slice(0, 6); // İlk 6 animeyi al
    const populerAnimes = sortedEpisodes.slice(0, 8); // İlk 8 animeyi al

    const lastAdded = sortedEpisodes.slice(0, 8); // İlk 6 animeyi al
    const populerAdded = sortedEpisodes.slice(0, 8); // İlk 6 animeyi al
    const pendingAdded = sortedEpisodes.slice(0, 8); // İlk 6 animeyi al

    const name = document.getElementById("populerHeader");
    const des = document.getElementById("populerDes");
    const image = document.getElementById("populerImg");

    const lineLastList = document.getElementById("last-added");
    const linePopulerList = document.getElementById("populer-added");
    const linePendingList = document.getElementById("pending-added");

    const populerListDivs = document.querySelectorAll('.populerListItems');

    // Her div'e ilgili içeriği ekle
    populerListDivs.forEach((div, index) => {
      const episode = latestEpisodes[index];

      // <img> etiketi oluştur
      const img = document.createElement('img');
      img.src = episode.image;
      img.alt = episode.isim;
      img.className = "populerImage";

      // <a> etiketi oluştur
      const link = document.createElement('p');
      link.id = (index).toString();  // 1'den 6'ya kadar ID atama
      link.innerHTML = episode.isim;
      link.className = 'populerListText';

      // Oluşturulan öğeleri div'in içine ekle
      div.appendChild(img);
      div.appendChild(link);
    });

    name.innerText = latestEpisodes[0].isim;
    des.innerText = latestEpisodes[0].aciklama;
    image.src = latestEpisodes[0].image;

    console.log(latestEpisodes[0]);

    const lastContainer = document.getElementById('lastContainer');
    const populerContainer = document.getElementById('populerContainer');
    const actionContainer = document.getElementById('actionContainer');
    const topTenContainer = document.getElementById('topTen');
    const totalContainer = document.getElementById('totalAnimes');

    episodes.forEach(film => {
      const card = document.createElement('div');
      card.classList.add('card');

      card.onclick = function () {
        window.location.href = `episode.html?anime=${film.isim}`;
      }

      card.innerHTML = `
            <img class="topImage" width="160" height="180" src="${film.image}" alt="${film.isim}">
            <img class="botImage" width="160" height="230" src="${film.image}" alt="${film.isim}">
            <div class="carddiv">
                <p class="cardtext text">${film.isim}</p>
                <div class="desbot">
                    <div class="puan text">9.5
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                          </svg>
                    </div>
                    <div class="episodebox">24 Bölüm</div>
                </div>
            </div>
        `;

      lastContainer.appendChild(card);
    });











    populerAnimes.forEach(film => {
      const card = document.createElement('div');
      card.classList.add('card');

      card.onclick = function () {
        window.location.href = `episode.html?anime=${film.isim}`;
      }

      card.innerHTML = `
            <img class="topImage" width="160" height="180" src="${film.image}" alt="${film.isim}">
            <img class="botImage" width="160" height="220" src="${film.image}" alt="${film.isim}">
            <div class="carddiv">
                <p class="cardtext text">${film.isim}</p>
                <div class="desbot">
                    <div class="puan text">9.5
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                        </svg>
                    </div>
                    <div class="episodebox">24 Bölüm</div>
                </div>
            </div>
        `;

      populerContainer.appendChild(card);
    });

    populerAnimes.forEach(film => {
      const card = document.createElement('div');
      card.classList.add('card');

      card.onclick = function () {
        window.location.href = `episode.html?anime=${film.isim}`;
      }

      card.innerHTML = `
            <img class="topImage" width="160" height="180" src="${film.image}" alt="${film.isim}">
            <img class="botImage" width="160" height="220" src="${film.image}" alt="${film.isim}">
            <div class="carddiv">
                <p class="cardtext text">${film.isim}</p>
                <div class="desbot">
                    <div class="puan text">9.5
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                          </svg>
                    </div>
                    <div class="episodebox">24 Bölüm</div>
                </div>
            </div>
        `;

      actionContainer.appendChild(card);
    });

















    episodes.forEach((episode) => {
      const li = document.createElement("li");
      li.innerHTML = `<img class="lineImage" src="${episode.image}" alt="${episode.isim}"><a class="lineText" href="episode.html?anime=${episode.isim}">${episode.isim}</a>`;
      li.classList.add('linedItems');
      lineLastList.appendChild(li);
    });

    populerAdded.forEach((episode) => {
      const li = document.createElement("li");
      li.innerHTML = `<img class="lineImage" src="${episode.image}" alt="${episode.isim}"><a class="lineText" href="episode.html?anime=${episode.isim}">${episode.isim}</a>`;
      li.classList.add('linedItems');
      linePopulerList.appendChild(li);
    });

    pendingAdded.forEach((episode) => {
      const li = document.createElement("li");
      li.innerHTML = `<img class="lineImage" src="${episode.image}" alt="${episode.isim}"><a class="lineText" href="episode.html?anime=${episode.isim}">${episode.isim}</a>`;
      li.classList.add('linedItems');
      linePendingList.appendChild(li);
    });

    episodes.forEach((film, index) => {
      const card = document.createElement('div');
      card.classList.add('top-card');

      card.onclick = function () {
        window.location.href = `episode.html?anime=${film.isim}`;
      }

      card.innerHTML = `
            <h2 style="position:absolute; z-index: 0; top: 50%; left: 10%; font-size: 150px; margin: 0; text-shadow: 0px 0px 40px rgba(255, 255, 255, 0.25); user-select: none;">${index + 1}</h2>
            <img style="position:absolute;" src="${film.image}" alt="${film.isim}">
            <h3 style="position:absolute; top: 0; left: 0;">${film.isim}</h3>
        `;

      topTenContainer.appendChild(card);
    });
    
    const populerWrapper = document.getElementById('populerContainer');
    const topTenWrapper = document.getElementById('topTen');

    const populerPrevBtn = document.getElementById('populer-left-button');
    const populerNextBtn = document.getElementById('populer-right-button');
    const topTenPrevBtn = document.getElementById('topTen-left-button');
    const topTenNextBtn = document.getElementById('topTen-right-button');

    // Sağa kaydır
    populerNextBtn.addEventListener('click', () => {
      populerWrapper.scrollLeft += 180;
    });

    // Sola kaydır
    populerPrevBtn.addEventListener('click', () => {
      populerWrapper.scrollLeft -= 180;
    });

    topTenNextBtn.addEventListener('click', () => {
      topTenWrapper.scrollLeft += 400;
    });

    // Sola kaydır
    topTenPrevBtn.addEventListener('click', () => {
      topTenWrapper.scrollLeft -= 400;
    });


    episodes.forEach(film => {
      const card = document.createElement('div');
      card.classList.add('card');

      card.onclick = function () {
        window.location.href = `episode.html?anime=${film.isim}`;
      }

      card.innerHTML = `
            <img class="topImage" width="160" height="180" src="${film.image}" alt="${film.isim}">
            <img class="botImage" width="160" height="230" src="${film.image}" alt="${film.isim}">
            <div class="carddiv">
                <p class="cardtext text">${film.isim}</p>
                <div class="desbot">
                    <div class="puan text">9.5
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                          </svg>
                    </div>
                    <div class="episodebox">24 Bölüm</div>
                </div>
            </div>
        `;

      totalContainer.appendChild(card);
    });

    //const response = await fetch('films.json');  // JSON dosyasını yükle
    //const data = await response.json();         // JSON'u JavaScript objesine çevir
    const contentDiv = document.getElementById('content');

    episodes.forEach(item => {
      const div = document.createElement('div');
      div.classList.add('item');
      div.innerHTML = `<img class="populerImage" src="${item.image}"><div style = "display: block;"><p>12. bölüm</p><a class="populerListText" href="${item.video_link}">${item.isim}</a></div>`;
      contentDiv.appendChild(div);
    });

    const divs = document.querySelectorAll('.populerListItems');
    const progressBar = document.querySelectorAll('.progress-bar');
    const topPopulerImage = document.querySelectorAll('.populerImage');

    let currentIndex = 1; // currentIndex'i fonksiyon dışında tanımla
    let intervalId; // Interval ID'sini saklamak için değişken

    divs.forEach((item, index) => {
      item.addEventListener('click', () => {
        console.log("clicked");
    
        // item üzerinden class kontrolü yap
        if (item.classList.contains("populerSelected")) {
          const link_text = document.getElementById(index).textContent;
          window.location.href = `episode.html?anime=${link_text}`;
        }
    
        currentIndex = index; // Butona tıklandığında başlangıç indeksini güncelle
        changeColor(); // changeColor fonksiyonunu hemen çağır
        startInterval(); // Interval'i yeniden başlat (süre sıfırlanır)
      });
    });
    
    function changeColor() {
      console.log(currentIndex);

      progressBar.forEach((item, index) => {
        console.log(index == currentIndex);
        if (index == currentIndex) {
          item.classList.add('progress-bar-visible'); // Class ekle
          item.style.animation = 'none';
          item.offsetHeight; // Trigger reflow
          item.style.animation = null; // Restart animation

          topPopulerImage[currentIndex].style.animation = 'none';
          topPopulerImage[currentIndex].offsetHeight; // Trigger reflow
          topPopulerImage[currentIndex].style.animation = null; // Restart animation
        } else {
          item.classList.remove('progress-bar-visible'); // Class kaldır
        }
      });
    
      // Tüm div'leri transparent yap
      divs.forEach(div => div.classList.remove('populerSelected'));
    
      // Sıradaki div'in rengini değiştir
      divs[currentIndex].classList.add('populerSelected');
    
      // Diğer işlemler (örneğin, metin ve resim güncelleme)
      name.innerText = latestEpisodes[currentIndex].isim;
      des.innerText = latestEpisodes[currentIndex].aciklama;
      image.src = latestEpisodes[currentIndex].image;
    
      // Arkaplan rengini ayarla
      getDominantColor(latestEpisodes[currentIndex].image, function (color, error) {
        const bgContent = document.getElementById('wrap');
    
        if (error) {
          console.error(error);
          bgContent.style.backgroundImage = `linear-gradient(0deg, rgba(32, 32, 36, 0.3) 0%, rgba(32, 32, 36, 0.3) 70%, rgba(32, 32, 36, 0.3) 100%)`;
        } else {
          bgContent.style.backgroundImage = `linear-gradient(0deg, rgba(32, 32, 36, 0.3) 0%, rgba(32, 32, 36, 0.3) 70%, ${color} 100%)`;
        }
      });
    
      // Bir sonraki index'e geç (döngü sağlamak için mod al)
      currentIndex = (currentIndex + 1) % divs.length;
    }

    // Her 3 saniyede bir changeColor fonksiyonunu çağır
    function startInterval() {
      clearInterval(intervalId); // Önce mevcut interval'i temizle
      intervalId = setInterval(changeColor, 5000); // Yeni interval başlat
    }
    
    // Sayfa yüklendiğinde interval'i başlat
    startInterval();


    // Son eklenen animeleri listele
    //latestEpisodes.forEach((episode) => {
    //const li = document.createElement("li");
    //li.innerHTML = `<a href="episode.html?anime=${episode.isim}">${episode.isim}</a>`;
    //latestEpisodesList.appendChild(li);
    //});

    // Tüm animeleri listele
    //episodes.forEach((episode) => {
    //const li = document.createElement("li");
    //li.innerHTML = `<a href="episode.html?anime=${episode.isim}">${episode.isim}</a>`;
    //episodesList.appendChild(li);
    //});
  })
  .catch((error) => console.error("Hata:", error));

