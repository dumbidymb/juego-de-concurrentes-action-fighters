let explosionShown = false; // Renombrada
const explosionSound = new Audio('/Concurrente-7b-223732-main/juegoCAr/choque.mp3'); // Asegúrate de que la ruta sea correcta

function detectCollision() {
    const player = getPlayerPosition();
    for (let enemy of enemies) {
        if (player.x < enemy.x + enemy.width &&
            player.x + player.width > enemy.x &&
            player.y < enemy.y + enemy.height &&
            player.height + player.y > enemy.y) {
            explosionShown = true; // Usar la variable renombrada
            explosionSound.play(); // Reproducir el sonido de la explosión
            setTimeout(() => {
                document.location.reload();
            }, 1000);
        }
    }
}

function drawExplosion() {
    if (explosionShown) { // Usar la variable renombrada
        ctx.drawImage(explosionImage, playerCar.x, playerCar.y, playerCar.width, playerCar.height);
    }
}

function getPlayerPosition() {
    return { x: playerCar.x, y: playerCar.y, width: playerCar.width, height: playerCar.height };
}
