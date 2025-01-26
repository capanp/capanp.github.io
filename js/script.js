// JSON Verisini Çekme ve Sayfaya Yazdırma
fetch('./data/data.json?v=' + new Date().getTime())
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP Hatası: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        // Resim URL'lerini <img> elementlerine ekle
        document.getElementById('profile-img').src = data.pp_url;
        document.getElementById('server-img').src = data.sv_url;

        // Metinleri <p> elementlerine yazdır
        document.getElementById('name').textContent = `${data.isim}`;
        document.getElementById('username').textContent = `${data.kullanici_adi}`;
        document.getElementById('server-name').textContent = `${data.sunucu_adi}`;
        document.getElementById('online-members').textContent = `${data.online} Çevrim içi`;
        document.getElementById('total-members').textContent = `${data.members} Üye`;
    })
    .catch(error => {
        console.error('Veri çekme hatası:', error);
    });

    const title = document.getElementById('title');
    const paragraph = document.getElementById('dc-fade');

    const homeButton = document.getElementById('home');
    const timerButton = document.getElementById('timer');

    const home = document.getElementById('home-div');
    const discord = document.getElementById('dc-fade');

    const timer = document.getElementById('timer-div');
    const steam = document.getElementById('steam');

    const delay = t => new Promise(resolve => {
        setTimeout(() => {
            paragraph.classList.add('fadeIn');
            resolve(); // Promise'i tamamlıyoruz
        }, t);
    });

    delay(400).then(() => {
        paragraph.classList.remove('fadeIn', 'animatedFadeInUp')
    });

    // About tuşuna tıklandığında
    timerButton.addEventListener('click', () => {

        timerButton.style.color = "white";
        homeButton.style.color = "#a1a0ab";

        home.classList.add('hidden')
        discord.classList.add('hidden')

        setTimeout(function() {
            home.classList.remove('show')
            home.classList.add('hide')
            discord.classList.remove('show')
            discord.classList.add('hide')

            timer.classList.remove('hide')
            timer.classList.add('show')
            steam.classList.remove('hide')
            steam.classList.add('show')

            timer.classList.remove('hidden')
            steam.classList.remove('hidden')
        }, 400);
    });

    homeButton.addEventListener('click', () => {

        homeButton.style.color = "white";
        timerButton.style.color = "#a1a0ab";

        timer.classList.add('hidden')
        steam.classList.add('hidden')

        setTimeout(function() {
            timer.classList.remove('show')
            timer.classList.add('hide')
            steam.classList.remove('show')
            steam.classList.add('hide')

            home.classList.remove('hide')
            home.classList.add('show')
            discord.classList.remove('hide')
            discord.classList.add('show')

            home.classList.remove('hidden')
            discord.classList.remove('hidden')
        }, 400);
    });

        document.getElementById("about").addEventListener("click", function() {
        // Yeni sayfaya yönlendirme
        window.location.href = "test.html";
    });