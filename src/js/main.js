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

const colorSeries = [];

const soundTime = 300;
let interval = 400;

const btnInGame = document.querySelectorAll(".color-btn");
const startBtn = document.querySelector('.start-game-btn');

const gameStatus = document.getElementById('game-status');

const clicksOk = document.getElementById('game-score-btn-ok');
const levelOk = document.getElementById('game-score-level-ok');

const startDiv = document.querySelector('.start-div');

startBtn.addEventListener('click', () => {
    startBtn.style.display = 'none';
    startDiv.style.display = 'block';
    gameStatus.innerHTML = 'Status: Écoutes et regardes';
    addColorBtnToArrayOfColorSeries()
    playColorSeries(1000)
    clicksOk.innerHTML = 'Cliques validés: 0 / ' + colorSeries.length;
    btnInGame.forEach((element) => {
        element.disabled = false;
    });
})


let nbBtnClickedOk = 0;
let level = 0;

// A chaque clique sur un bouton de couleur, une note est joué 
const gameOverModal = document.getElementById('game-over-modal');
const closeGameOverModal = document.getElementById('close-game-over');
const contentModalGameOver = document.getElementById('content-game-over');
btnInGame.forEach(element => {
    element.addEventListener('click', (e) => {
        // On joue la note en fonction de la data attributes du bouton
        playSound(e.target.dataset.musicnote);
        playClick(e.target.dataset.color);
        const btnColor = e.target.dataset.color;

        if (btnColor === colorSeries[nbBtnClickedOk].color) {
            nbBtnClickedOk++;
            clicksOk.innerHTML = 'Cliques validés: ' + nbBtnClickedOk + ' / ' + colorSeries.length;

            if (colorSeries.length === nbBtnClickedOk) {
                level++;
                nbBtnClickedOk = 0;
                setTimeout(() => {
                    clicksOk.innerHTML = 'Cliques validés: ' + nbBtnClickedOk + ' / ' + (colorSeries.length + 1);
                    gameBot();
                }, 1000)

                levelOk.innerHTML = 'Tours validés: ' + level;

            }
        }
        else {
            gameOverModal.style.display = 'block';

            closeGameOverModal.onclick = () => {
                gameOverModal.style.display = 'none';
            };

            const h1 = document.createElement("h2");
            const btnRestart = document.createElement("button");
            btnRestart.setAttribute()
            h1.innerHTML = `Vous avez fait un total de ${level} tour(s) valide(s)`;
            contentModalGameOver.appendChild(h1);

        }
    })
});

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
            }, 1000)
        }
    }, delay)

}
