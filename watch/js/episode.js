
const urlParams = new URLSearchParams(window.location.search);
const animeIsim = urlParams.get('anime');
//const animeDetailsContainer = document.getElementById("anime-details");
const animeName = document.getElementById("top-name");
const animeDescription = document.getElementById("desc");

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
      animeName.innerHTML = `${(episode.isim).toUpperCase()}`;
      animeDescription.innerHTML = `${(episode.aciklama)}`;
      console.log(episode)
      // animeDetailsContainer.innerHTML = `
      //   <h2 class="episodeName">${(episode.isim).toUpperCase()}</h2>
      //   <p>${episode.aciklama}</p>
      //   <a href="${episode.video_link}" target="_blank">Videoyu İzle</a>
      // `;
    } else {
      // animeDetailsContainer.innerHTML = "<p>Anime bulunamadı</p>";
    }
  })
  .catch((error) => console.error("Hata:", error));
