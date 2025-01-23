document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const animeIsim = urlParams.get('anime');
    const animeDetailsContainer = document.getElementById("anime-details");
  
    // JSON dosyasını al
    fetch("data/animes.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("JSON dosyası yüklenemedi");
        }
        return response.json();
      })
      .then((episodes) => {
        const episode = episodes.find(e => e.isim === animeIsim);
        console.log(animeIsim)
  
        if (episode) {
          console.log(episode)
          animeDetailsContainer.innerHTML = `
            <h2>${episode.isim}</h2>
            <p>${episode.aciklama}</p>
            <a href="${episode.video_link}" target="_blank">Videoyu İzle</a>
          `;
        } else {
          animeDetailsContainer.innerHTML = "<p>Anime bulunamadı</p>";
        }
      })
      .catch((error) => console.error("Hata:", error));
  });
  