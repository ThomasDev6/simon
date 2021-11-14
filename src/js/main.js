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
let interval = 800;

const btnInGame = document.querySelectorAll(".color-btn");
const startBtn = document.querySelector('.start-game-btn');

const startDiv = document.querySelector('.start-div');

startBtn.addEventListener('click', () => {
    startBtn.style.display = 'none';
    startDiv.style.display = 'block';
    addColorBtnToArrayOfColorSeries()
    playColorSeries(1000)
})

// A chaque clique sur un bouton de couleur, une note est joué 
btnInGame.forEach(element => {
    element.addEventListener('click', (e) => {
        // On joue la note en fonction de la data attributes du bouton
        playSound(e.target.dataset.musicnote)
    })
});

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
    setTimeout(() => {
        colorSeries.forEach((obj, index) => {
            const delay = index * (soundTime + interval);
            playSoundInColorSeries(obj.musicNote, obj.color, delay)
            
        })
    }, delay)
}

function playSoundInColorSeries(musicNote, color, delay) {
    setTimeout(() => {
        playClick(color);
        playSound(musicNote);
    }, delay)
    
}
