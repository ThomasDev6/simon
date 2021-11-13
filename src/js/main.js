
btnInGame = document.querySelectorAll(".color-btn");

// Déclaration de du synthé pour le note de musique
const synth = new Tone.Synth().toDestination();
const now = Tone.now()

// A chaque clique sur un bouton de couleur, une note est joué 
btnInGame.forEach(element => {
    element.addEventListener('click', (e) => {

        // On joue la note en fonction de la data attributes du bouton
        synth.triggerAttackRelease(`${e.target.dataset.sound}`, now);
    })
});
