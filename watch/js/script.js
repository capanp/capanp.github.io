document.addEventListener("DOMContentLoaded", () => {
    const latestEpisodesList = document.getElementById("latest-episodes");
    const episodesList = document.getElementById("episodes");
  
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
  
