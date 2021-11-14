// on récupère le modal dans le DOM
const modal = document.getElementById("game-rules-modal");

// on récupère le btn qui ouvre le modal
const openModalBtn = document.getElementById("game-rules");

// on récupère le btn pour close le modal
const closeBtn = document.getElementById('close-rules');

// Lorsque l'on clique sur le btn des règles on ouvre le modal
openModalBtn.onclick = () => {
    modal.style.display = "block";
}

// Lorsque l'on clique sur le croix du modal, on le ferme
closeBtn.onclick = () => {
    modal.style.display = "none";
}

// Lorsque l'on clique n'importe où hors du modal, on le ferme
window.onclick = (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
}