const menuMusic = document.getElementById('menuMusic');
const gameMusic = document.getElementById('gameMusic');
const modal = document.getElementById('modal');
const howToPlayButton = document.getElementById('howToPlayButton');
const closeModal = document.getElementById('closeModal');
const muteButton = document.getElementById('muteButton');

let isMuted = false;

howToPlayButton.addEventListener('click', () => {
    modal.style.display = 'block';
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
});

window.addEventListener('click', () => {
    if (!isMuted) {
        menuMusic.play();
    }
}, { once: true });

startButton.addEventListener('click', () => {
    menu.style.display = 'none';
    canvas.style.display = 'block';
    menuMusic.pause();
    gameMusic.volume = 0.2;
    if (!isMuted) {
        gameMusic.play(); 
    }
    iniciarJuego();
});

muteButton.addEventListener('click', () => {
    isMuted = !isMuted;
    menuMusic.muted = isMuted;
    gameMusic.muted = isMuted;

    muteButton.innerHTML = isMuted
        ? '<path d="M3 6v12h4l8 8V2L7 6H3z" fill="#000"/><path d="M15 9h4v6h-4z" fill="#000"/>'
        : '<path d="M12 3v3H9v4H5v3h4v4h3v3h3v-3h4v-3h-4v-4h-3V3z" fill="#000"/>';
    
    if (isMuted) {
        menuMusic.pause();
        gameMusic.pause();
    } else {
        if (menu.style.display !== 'none') {
            menuMusic.play();
        } else {
            gameMusic.play();
        }
    }
});
