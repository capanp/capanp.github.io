console.log("uie")

let botScore = 0; // Botun skoru

function startGame() {
    console.log("Oyun Başlatıldı.");
    $("#start-game-button").css("display", "none");
    $('#main-table').children('div').removeClass().addClass('empty card');
    $('#opponent-table').children('div').removeClass().addClass('empty card');
    $('#character-table').children('div').removeClass().addClass('empty card');

    let cardList = ["red", "green", "blue", "black"];

    $('#main-card1').removeClass().addClass(cardList[Math.floor(Math.random() * 3)] + ' card');
    $('#main-card2').removeClass().addClass(cardList[Math.floor(Math.random() * 3)] + ' card');
    $('#main-card3').removeClass().addClass(cardList[Math.floor(Math.random() * 3)] + ' card');
    $('#main-card4').removeClass().addClass(cardList[Math.floor(Math.random() * 3)] + ' card');

    // Butonu tekrar görünür yap
    $("#score-button").css("display", "block");
}

function selectCard(element) {
    let cards = $('#character-table').children('div');
    let first = $(cards[0]).attr("class").split(" ");
    let second = $(cards[1]).attr("class").split(" ");
    let third = $(cards[2]).attr("class").split(" ");
    let classes = $(element).attr("class").split(" ");

    if (classes[2] == "selected" || classes[0] == "empty" || (first[0] !== "empty" && second[0] !== "empty" && third[0] !== "empty")) {
        console.log("uie");
        return;
    } else {
        $(element).addClass("selected");
    }

    if (["red", "green", "blue", "black"].includes(classes[0])) {
        console.log("Seçilen Kart: ", element);

        if (first[0] == "empty") {
            $(cards[0]).removeClass().addClass(classes[0] + ' card');
        } else if (second[0] == "empty") {
            $(cards[1]).removeClass().addClass(classes[0] + ' card');
        } else if (third[0] == "empty") {
            $(cards[2]).removeClass().addClass(classes[0] + ' card');
        }
    }
}

function scoreCards() {
    let selectedCards = $("#main-table .selected");

    if (selectedCards.length === 3) {
        let colors = [];

        selectedCards.each(function () {
            let classes = $(this).attr("class").split(" ");
            colors.push(classes[0]);
        });

        let score = calculateScore(colors);
        app.score += score;

        alert("Toplam Puan: " + score);
        
        // "Kartları Tut" butonunu gizle
        $("#score-button").css("display", "none");

        // Botun sırasını başlat
        resetMainTable();
        startBotTurn();
    } else {
        alert("Lütfen 3 kart seçin!");
    }
}

function removeCard(element) {
    let classes = $(element).attr("class").split(" ");
    
    // Eğer zaten boş bir karta tıklandıysa işlem yapma
    if (classes[0] === "empty") return;

    // Kaldırılan kartın rengini sakla (red, green, blue, black)
    let removedColor = classes[0];

    // Kartı boş hale getir
    $(element).removeClass().addClass("empty card");

    // Aynı renkteki **ilk** seçili kartı main-table içinden temizle
    $("#main-table .selected").each(function () {
        if ($(this).hasClass(removedColor)) {
            $(this).removeClass("selected");
            return false; // İlk bulunanı temizleyip döngüden çık
        }
    });

    console.log("Kart kaldırıldı:", element.id);
}

function resetMainTable() {
    // Ana masa üzerindeki seçili kartları temizle
    let selectedCards = $("#main-table .card");
    selectedCards.removeClass("selected").removeClass().addClass("empty card");

    // Karakter kartlarını da sıfırla (yani sil)
    let characterCards = $("#character-table .card");
    characterCards.removeClass().addClass("empty card");

    // main-table'deki kartları sıfırla ve yenileriyle değiştir
    let colors = ["red", "green", "blue", "black"];
    
    // main-table'deki boş kartlara rastgele kart ekle
    $("#main-table .empty.card").each(function () {
        let randomColor = colors[Math.floor(Math.random() * colors.length)];
        $(this).removeClass("empty card").addClass(randomColor + " card");
    });
}


function startBotTurn() {
    // Ekranı yarı saydam yap ve "Rakibin sırası" yazısını göster
    $("body").append('<div id="bot-turn-overlay">Rakibin Sırası...</div>');
    $("#bot-turn-overlay").css({
        "position": "fixed",
        "top": "0",
        "left": "0",
        "width": "100%",
        "height": "100%",
        "background": "rgba(0, 0, 0, 0.7)",
        "color": "white",
        "font-size": "30px",
        "display": "flex",
        "align-items": "center",
        "justify-content": "center",
        "z-index": "9999"
    });

    setTimeout(() => {
        botPlay();
        $("#bot-turn-overlay").remove();
    }, 1000);
}

function botPlay() {
    let mainTableCards = $('#main-table').children('div');
    let availableCards = [];

    // Masadaki tüm kartları diziye ekle
    mainTableCards.each(function () {
        availableCards.push($(this).attr("class").split(" ")[0]);
    });

    let selectedCards = [];

    // 1. Öncelik: 3 siyah varsa gönder
    if (availableCards.filter(c => c === "black").length >= 3) {
        selectedCards = ["black", "black", "black"];
    }
    // 2. Öncelik: Kırmızı + 2 mavi varsa
    else if (availableCards.includes("red") && availableCards.filter(c => c === "blue").length >= 2) {
        selectedCards = ["red", "blue", "blue"];
    }
    // 3. Öncelik: Kırmızı + 2 yeşil varsa
    else if (availableCards.includes("red") && availableCards.filter(c => c === "green").length >= 2) {
        selectedCards = ["red", "green", "green"];
    }
    // 4. Öncelik: 3 kırmızı varsa
    else if (availableCards.filter(c => c === "red").length >= 3) {
        selectedCards = ["red", "red", "red"];
    }
    // 5. Öncelik: 2 kırmızı varsa
    else if (availableCards.filter(c => c === "red").length >= 2) {
        selectedCards = ["red", "red", availableCards.find(c => c !== "red") || "red"];
    }
    // 6. Öncelik: Kırmızı varsa, rastgele 2 kart ekle
    else if (availableCards.includes("red")) {
        selectedCards.push("red");
        let remainingCards = availableCards.filter(c => c !== "red").slice(0, 2);
        selectedCards = selectedCards.concat(remainingCards);
    }
    // 7. Öncelik: Hiçbir özel kombinasyon yoksa ilk üç kartı al
    else {
        selectedCards = availableCards.slice(0, 3);
    }

    console.log("Bot seçimi:", selectedCards);

    let botScoreGain = calculateScore(selectedCards);
    botScore += botScoreGain;
    app.score -= botScoreGain; // Bot kazanırsa oyuncunun skorundan düş

    resetMainTable();

    alert("Bot toplam " + botScoreGain + " puan kazandı!");
    $("#score-button").css("display", "flex");
}





































function calculateScore(colors) {
    // Renkleri sıralıyoruz
    colors.sort();

    // Kombolar
    if (colors[0] === "black" && colors[1] === "black" && colors[2] === "black") {
        return 500;
    }
    if (
        (colors.includes("red") && colors.filter(c => c === "blue").length === 2) ||
        (colors.includes("red") && colors.filter(c => c === "green").length === 2)
    ) {
        return 250;
    }

    // Bireysel puanlar
    let score = 0;
    for (let color of colors) {
        if (color === "red") score += 50;
    }

    return score;
}
