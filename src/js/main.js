// Array d'objets qui représentent les boutons
const colorBtns = [
    {
        color: "green",
        musicNote: "C4",
    },
    {
        color: "red",
        musicNote: "D4",
    },
    {
        color: "yellow",
        musicNote: "F4",
    },
    {
        color: "blue",
        musicNote: "E4",
    }
]

let colorSeries = [];

const soundTime = 300;
const intervalDefine = 400
let interval = intervalDefine;

const btnInGame = document.querySelectorAll(".color-btn");
const startBtn = document.querySelector('.start-game-btn');
const restartBtn = document.querySelectorAll('.restart-game');

const gameStatus = document.getElementById('game-status');

const clicksOk = document.getElementById('game-score-btn-ok');
const levelOk = document.getElementById('game-score-level-ok');
const totalClickOk = document.getElementById('game-total-score-btn-ok');

const startDiv = document.querySelector('.start-div');

startBtn.addEventListener('click', () => {
    startBtn.style.display = 'none';
    startDiv.style.display = 'block';
    gameStatus.innerHTML = 'Status: Écoutes et regardes';
    addColorBtnToArrayOfColorSeries()
    playColorSeries(1000)
    clicksOk.innerHTML = 'Clics validés: 0 / ' + colorSeries.length;
    disabledColorBtn(false)
})

let nbTotalClickOk = 0;
let nbBtnClickedOk = 0;
let level = 0;

// A chaque clique sur un bouton de couleur, une note est joué 
const gameOverModal = document.getElementById('game-over-modal');
const closeGameOverModal = document.getElementById('close-game-over');
const gameOverScore = document.getElementById('game-over-score');
const h2TotalLevel = document.createElement("h2");
const h2TotalClics = document.createElement("h2");

btnInGame.forEach(element => {
    element.addEventListener('click', (e) => {
        // On joue la note en fonction de la data attributes du bouton
        playSound(e.target.dataset.musicnote);
        playClick(e.target.dataset.color);
        const btnColor = e.target.dataset.color;

        if (btnColor === colorSeries[nbBtnClickedOk].color) {
            nbBtnClickedOk++;
            nbTotalClickOk++;
            clicksOk.innerHTML = 'Clics validés: ' + nbBtnClickedOk + ' / ' + colorSeries.length;
            totalClickOk.innerHTML = 'Total clics validés: ' + nbTotalClickOk;

            if (colorSeries.length === nbBtnClickedOk) {
                level++;
                nbBtnClickedOk = 0;
                setTimeout(() => {
                    clicksOk.innerHTML = 'Clics validés: ' + nbBtnClickedOk + ' / ' + (colorSeries.length + 1);
                    totalClickOk.innerHTML = 'Total clics validés: ' + nbTotalClickOk;
                    gameBot();
                }, 1000)

                levelOk.innerHTML = 'Tours validés: ' + level;

            }
        }
        else {
            disabledColorBtn(true);
            gameOverModal.style.display = 'block';

            closeGameOverModal.onclick = () => {
                gameOverModal.style.display = 'none';
            };

            h2TotalClics.innerHTML = `Vous avez fait un total de ${nbTotalClickOk} de clic(s) valide(s)`
            h2TotalLevel.innerHTML = `Vous avez fait un total de ${level} tour(s) valide(s)`;
            gameOverScore.appendChild(h2TotalLevel)
            gameOverScore.appendChild(h2TotalClics);

        }
    })
});

restartBtn.forEach((element) => {
    element.addEventListener('click', (e) => {
        restartGame();
        gameOverModal.style.display = 'none';
    });
});


function restartGame() {
    nbTotalClickOk = 0;
    nbBtnClickedOk = 0;
    level = 0;
    colorSeries = [];
    interval = intervalDefine;
    h2TotalClics.remove();
    h2TotalLevel.remove();

    totalClickOk.innerHTML = 'Total clics validés: ' + nbTotalClickOk;
    levelOk.innerHTML = 'Tours validés: ' + level;

    gameStatus.innerHTML = 'Status: Attend 2 secondes...';
    addColorBtnToArrayOfColorSeries()

    setTimeout(() => {

        playColorSeries()
    }, 2000)

    clicksOk.innerHTML = 'Clics validés: 0 / ' + colorSeries.length;
    disabledColorBtn(false);
}

function disabledColorBtn(bool) {
    btnInGame.forEach((element) => {
        element.disabled = bool;
    });
};

function gameBot() {

    if (interval >= 100) {
        interval -= 50
    }
    addColorBtnToArrayOfColorSeries();
    playColorSeries();
}

function addColorBtnToArrayOfColorSeries() {
    colorSeries.push(colorBtns[getRandomIndex()]);
}

function getRandomIndex() {
    const randomIndex = parseInt(Math.random() * btnInGame.length);

    return randomIndex;
}

function playSound(musicNote) {
    // Déclaration de du synthé pour le note de musique
    const synth = new Tone.Synth().toDestination();

    synth.triggerAttackRelease(`${musicNote}`, 0.1);
}

function playClick(color) {
    const colorBtn = document.querySelector(`.${color}-btn`);
    colorBtn.classList.add(`${color}-btn-animated`);
    setTimeout(() => {
        colorBtn.classList.remove(`${color}-btn-animated`);
    }, soundTime)
}

function playColorSeries(delay = 500) {
    gameStatus.innerHTML = 'Status: Écoutes et regardes';
    disabledColorBtn(true);
    setTimeout(() => {
        colorSeries.forEach((obj, index) => {
            const delayP = index * (soundTime + interval);
            playSoundInColorSeries(obj.musicNote, obj.color, delayP, index);
        })
    }, delay)

}

function playSoundInColorSeries(musicNote, color, delay, index) {
    setTimeout(() => {
        playClick(color);
        playSound(musicNote);
        if ((index + 1) === colorSeries.length) {
            setTimeout(() => {
                gameStatus.innerHTML = 'Status: À toi de jouer !';
                disabledColorBtn(false)
            }, 1000)
        }
    }, delay)

}
