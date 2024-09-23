const enemyPositions = [100, 250, 400, 550]; // Renombrada
const maxEnemyCount = 5;
let enemySpacing = 100;
let enemyGenerationInterval = 6000; // Intervalo de generación más largo

// Inicializar enemigos
let enemies = [];

// Generar enemigos
function generateEnemies() {
    if (enemies.length < maxEnemyCount) {
        let enemyX, enemyY;

        do {
            enemyX = Math.random() * (canvas.width - 100) + 50;
            enemyY = -100 - Math.random() * 400;
        } while (isPositionOccupied(enemyX, enemyY));

        const enemy = {
            x: enemyX,
            y: enemyY,
            width: 50,
            height: 100,
            speed: 0.5 + Math.random() * 1
        };
        enemies.push(enemy);
    }
}

// Llama a `generateEnemies` cada 6 segundos
setInterval(generateEnemies, enemyGenerationInterval);

function drawEnemies() {
    for (let enemy of enemies) {
        if (enemyCarImage.complete) {
            ctx.drawImage(enemyCarImage, enemy.x, enemy.y, enemy.width, enemy.height);
        }
    }
}

function moveEnemies() {
    for (let i = enemies.length - 1; i >= 0; i--) { // Iterar hacia atrás
        const enemy = enemies[i];
        enemy.y += enemy.speed;

        if (enemy.y > canvas.height) {
            enemies.splice(i, 1); // Elimina el enemigo que sale de la pantalla
            // Aquí no generamos un nuevo enemigo, lo haremos en el intervalo
        }
    }
}

// Función para verificar si la posición ya está ocupada
function isPositionOccupied(x, y) {
    return enemies.some(enemy => Math.abs(enemy.x - x) < enemySpacing && Math.abs(enemy.y - y) < enemySpacing);
}

// Bucle de juego
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    moveEnemies();
    drawEnemies();
}

// Inicia el bucle de juego
function iniciarJuego() {
    setInterval(gameLoop, 1000 / 60); // 60 FPS
}


iniciarJuego();
