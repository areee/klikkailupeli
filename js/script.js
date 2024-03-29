var score;
var duration = 10;
var startTime;
var ended = true;
var bestScore = 0;

var timerTxt = document.getElementById("timer");
var scoreTxt = document.getElementById("score");
var clicksTxt = document.getElementById("clicks");
var startBtn = document.getElementById("start");
var clickArea = document.getElementById("clickarea");
var yourBestScoreTxt = document.getElementById("your_best_score");

if (!localStorage.getItem('bestScore')) {
    populateStorage();
} else {
    setBestScore();
}

var show = function (elem) {
    elem.style.display = 'inline';
};

var hide = function (elem) {
    elem.style.display = 'none';
}

function startGame() {
    hide(startBtn);
    score = -1;
    ended = false;
    startTime = new Date().getTime();

    var timerId = setInterval(function () {
        var total = (new Date().getTime() - startTime) / 1000;

        if (total < duration) {
            timerTxt.textContent = replaceDotWithComma(total.toFixed(3));
            clicksTxt.textContent = replaceDotWithComma((score / total).toFixed(2));
        } else {
            ended = true;
            clearInterval(timerId);
            endGame();
        }
    }, 1);
}

function endGame() {
    var clicksBySec = (score / duration).toFixed(2);
    timerTxt.textContent = replaceDotWithComma(duration.toFixed(3));
    clicksTxt.textContent = replaceDotWithComma(clicksBySec);
    if (bestScore < score) {
        bestScore = score;
        populateStorage();
        yourBestScoreTxt.textContent = bestScore;
    }
    show(startBtn);
    window.navigator.vibrate(400);
    setTimeout(function () {
        alert('Onnistuit klikkaamaan ' + score + ' kertaa ' + duration + ' sekunnissa. Tämä tekee ' +
            replaceDotWithComma(clicksBySec) + ' klikkausta sekunnissa. Yritä uudelleen!');
    }, 10);
}

function replaceDotWithComma(number) {
    var string = '' + number;
    return string.replace('.', ',');
}

function populateStorage() {
    localStorage.setItem('bestScore', bestScore);
    setBestScore();
}

function setBestScore() {
    var currentBestScore = localStorage.getItem('bestScore');
    yourBestScoreTxt.textContent = currentBestScore;
}

startBtn.addEventListener("click", function () {
    startGame();
});

clickArea.addEventListener("click", function () {
    if (!ended) {
        score++;
        scoreTxt.textContent = score;
    }
});