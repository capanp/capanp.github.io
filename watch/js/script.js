document.addEventListener("DOMContentLoaded", () => {
  const latestEpisodesList = document.getElementById("latest-episodes");
  const episodesList = document.getElementById("episodes");

  function getDominantColor(imageUrl, callback) {
    const img = new Image();
    img.crossOrigin = "Anonymous"; // CORS hatalarını önlemek için
    img.src = imageUrl;

    img.onload = function() {
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
        const rgbaColor = `rgba(${r},${g},${b},0.2)`;

        // Sonucu callback fonksiyonuyla döndür
        callback(rgbaColor);
    };

    img.onerror = function() {
        callback(null, "Resim yüklenemedi!");
    };
}

  // JSON dosyasını al
  fetch("data/animes.json")
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

      const name = document.getElementById("populerHeader");
      const des = document.getElementById("populerDes");
      const image = document.getElementById("populerImg");

      (document.getElementById("1")).innerText = latestEpisodes[0].isim;
      (document.getElementById("2")).innerText = latestEpisodes[1].isim;
      (document.getElementById("3")).innerText = latestEpisodes[2].isim;
      (document.getElementById("4")).innerText = latestEpisodes[3].isim;
      (document.getElementById("5")).innerText = latestEpisodes[4].isim;
      (document.getElementById("6")).innerText = latestEpisodes[5].isim;

      name.innerText = latestEpisodes[0].isim;
      des.innerText = latestEpisodes[0].aciklama;
      image.src = latestEpisodes[0].image;

      console.log(latestEpisodes[0]);

      const populerContainer = document.getElementById('populerContainer');
      const totalContainer = document.getElementById('totalAnimes');

      populerAnimes.forEach(film => {
        const card = document.createElement('div');
        card.classList.add('film-card');

        card.onclick = function() {
          window.location.href = `episode.html?anime=${film.isim}`;
        }

        card.innerHTML = `
            <img src="${film.image}" alt="${film.isim}">
            <h3>${film.isim}</h3>
        `;

        populerContainer.appendChild(card);
      });

      episodes.forEach(film => {
        const card = document.createElement('div');
        card.classList.add('film-card');

        card.onclick = function() {
          window.location.href = `episode.html?anime=${film.isim}`;
        }

        card.innerHTML = `
            <img src="${film.image}" alt="${film.isim}">
            <h3>${film.isim}</h3>
        `;

        totalContainer.appendChild(card);
      });

      //const response = await fetch('films.json');  // JSON dosyasını yükle
      //const data = await response.json();         // JSON'u JavaScript objesine çevir
      const contentDiv = document.getElementById('content');

      episodes.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('item');
        div.innerHTML = `<strong>${item.isim}</strong><br>${item.image}`;
        contentDiv.appendChild(div);
      });


      const divs = document.querySelectorAll('.populerListFirst');
      let currentIndex = 1;

      function changeColor() {
          // Tüm div'leri transparent yap

          getDominantColor(latestEpisodes[currentIndex].image, function(color, error) {
            const divColors = document.querySelectorAll('.populerSeries');
        
            if (error) {
                console.error(error);
                divColors.forEach(element => {
                    element.style.boxShadow = "0px 0px 150px 0px rgba(255,255,255,0.05)";
                    element.style.webkitBoxShadow = "0px 0px 150px 0px rgba(255,255,255,0.05)";
                    element.style.mozBoxShadow = "0px 0px 150px 0px rgba(255,255,255,0.05)";
                });
            } else {
                divColors.forEach(element => {
                    element.style.backgroundColor = color;
                    element.style.boxShadow = `0px 0px 150px 0px ${color}`;
                    element.style.webkitBoxShadow = `0px 0px 150px 0px ${color}`;
                    element.style.mozBoxShadow = `0px 0px 150px 0px ${color}`;
                });
            }
        });

          divs.forEach(div => div.style.backgroundColor = 'transparent');
          
          // Sıradaki div'i #28282c yap
          divs[currentIndex].style.backgroundColor = '#28282c';
          name.innerText = latestEpisodes[currentIndex].isim;
          des.innerText = latestEpisodes[currentIndex].aciklama;
          image.src = latestEpisodes[currentIndex].image;

          // Bir sonraki index'e geç (döngü sağlamak için mod al)
          currentIndex = (currentIndex + 1) % divs.length;
      }

      // Her 3 saniyede bir changeColor fonksiyonunu çağır
      setInterval(changeColor, 5000);


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
});
