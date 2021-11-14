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
// Array qui représente la suite générée par l'ordi
let colorSeries = [];

// Constante de temps et d'intervale
const soundTime = 300;
const intervalDefine = 400
let interval = intervalDefine;

const btnInGame = document.querySelectorAll(".color-btn"); //on récupère tous les boutons de couleur du jeu
const startBtn = document.querySelector('.start-game-btn'); // on récupère le bouton "start"
const restartBtn = document.querySelectorAll('.restart-game'); // On récupère tous les boutons pour relancer le jeu (In game et modal)
const divRestartGame = document.querySelector('.div-restart-game') // On récupère la div qui contient le btn "Relancer" in game

const gameStatus = document.getElementById('game-status'); // on récupère l'élément du statut

const clicksOk = document.getElementById('game-score-btn-ok'); // On récupère l'élément qui affiche le score des cliques dans la manche
const levelOk = document.getElementById('game-score-level-ok');// On récupère l'élément qui affiche le nombre de tours
const totalClickOk = document.getElementById('game-total-score-btn-ok'); //on récupère l'élément qui affiche le total de clics

const startDiv = document.querySelector('.start-div'); // On récupère la div qui contient les score

/**
 * On ajoute un listener sur le btn "Start"
 * On cache le btn "Start" et affiche les scores et le btn "Relancer".
 * On ajoute un btn à "ColorSeries";
 * Puis on lance la lecture de ce dernier.
 * On incrémente le nb de clics
 * Et on active les btns de couleurs
 *  */ 
startBtn.addEventListener('click', () => {
    startBtn.style.display = 'none';
    startDiv.style.display = 'block';
    divRestartGame.style.display ='block';
    addColorBtnToArrayOfColorSeries()
    playColorSeries(1000)
    clicksOk.innerHTML = 'Clics validés: 0 / ' + colorSeries.length;
    disabledColorBtn(false)
})

// On déclare les variables qui nous serviront de score

let nbTotalClickOk = 0;
let nbBtnClickedOk = 0;
let level = 0;
 
const gameOverModal = document.getElementById('game-over-modal');
const closeGameOverModal = document.getElementById('close-game-over');
const gameOverScore = document.getElementById('game-over-score');
const h2TotalLevel = document.createElement("h2");
const h2TotalClics = document.createElement("h2");

/**
 * On ajoute un listener sur les btns de couleurs
 * On joue le click et le son
 * Si la nième couleur correspond à la couleur à l'indice n dans "colorSeries" alors on incrémente les scores 
 * Sinon on désactive les btns et affiche le modal de GameOver.
 */

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

            // Si taille "colorSeries" vaut nbBtnClickedOk on incrémente level et on lance gameBot()
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
            // Ici on lance le modal GameOver
            disabledColorBtn(true);
            gameOverModal.style.display = 'block';

            closeGameOverModal.onclick = () => {
                gameOverModal.style.display = 'none';
            };
            // on ajoute les phrases avec les scores
            h2TotalClics.innerHTML = `Vous avez fait un total de ${nbTotalClickOk} clic(s) valide(s)`
            h2TotalLevel.innerHTML = `Vous avez fait un total de ${level} tour(s) valide(s)`;
            gameOverScore.appendChild(h2TotalLevel)
            gameOverScore.appendChild(h2TotalClics);

        }
    })
});

// Pour chaque btn restart on relance le jeu et on cache le modal Game Over s'il existe
restartBtn.forEach((element) => {
    element.addEventListener('click', (e) => {
        restartGame();
        gameOverModal.style.display = 'none';
    });
});

/**
 * On remet tout à zéro (score, séquences générée, ...)
 * on supprime les message du modal GameOver
 * On actualise les messages des scores
 * On ajoute une couleurs aléatoire dans la séquence
 * puis après 2sec on joue la séquence
 * Et on active les btns de couleurs
 */

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

    gameStatus.innerHTML = 'Statut: Attend 2 secondes...';
    addColorBtnToArrayOfColorSeries()

    setTimeout(() => {

        playColorSeries()
    }, 2000)

    clicksOk.innerHTML = 'Clics validés: 0 / ' + colorSeries.length;
    disabledColorBtn(false);
}

// Active ou désactive les btns du jeu (couleur)
function disabledColorBtn(bool) {
    btnInGame.forEach((element) => {
        element.disabled = bool;
    });
};
/**
 * on décrémente l'intervale de base pour que le jeu soit plus rapide
 * Ajout d'un élément et lecture de la séquences
 */
function gameBot() {

    if (interval >= 100) {
        interval -= 50
    }
    addColorBtnToArrayOfColorSeries();
    playColorSeries();
}

// Ajoute une couleur à la séquences
function addColorBtnToArrayOfColorSeries() {
    colorSeries.push(colorBtns[getRandomIndex()]);
}

// Donne un index aléatoire pour un btn aléatoire
function getRandomIndex() {
    const randomIndex = parseInt(Math.random() * btnInGame.length);

    return randomIndex;
}

// On joue le son en fonction de la note de musique en param
function playSound(musicNote) {
    // Déclaration de du synthé pour le note de musique
    const synth = new Tone.Synth().toDestination();

    synth.triggerAttackRelease(`${musicNote}`, 0.1);
}

// Simule le clic lors de la lecture de la séquence
function playClick(color) {
    const colorBtn = document.querySelector(`.${color}-btn`);
    colorBtn.classList.add(`${color}-btn-animated`);
    // Le btn s'allume et s'éteind
    setTimeout(() => {
        colorBtn.classList.remove(`${color}-btn-animated`);
    }, soundTime)
}

// Lecture de la séquences présente dans le tableau "ColorSeries"
function playColorSeries(delay = 500) {
    gameStatus.innerHTML = 'Statut: Écoutes et regardes';
    disabledColorBtn(true);
    setTimeout(() => {
        // Pour chaque élément on joue un son à intervale différent
        colorSeries.forEach((obj, index) => {
            const delayP = index * (soundTime + interval);
            playSoundInColorSeries(obj.musicNote, obj.color, delayP, index);
        })
    }, delay)

}

// Regroupe la simulation de clique et de la lecture du son pour être joué en même temps
function playSoundInColorSeries(musicNote, color, delay, index) {
    setTimeout(() => {
        playClick(color);
        playSound(musicNote);
        // Une fois le taleau parcouru on active les btns et c'est au joueur de jouer.
        if ((index + 1) === colorSeries.length) {
            setTimeout(() => {
                gameStatus.innerHTML = 'Statut: À toi de jouer !';
                disabledColorBtn(false)
            }, 1000)
        }
    }, delay)

}
