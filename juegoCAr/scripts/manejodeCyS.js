const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const roadImage = new Image();
roadImage.src = '/Concurrente-7b-223732-main/juegoCAr/imagenes/carretera.png';

let roadY1 = 0;
let roadY2 = -canvas.height;
let score = 0;
let scoreCounter = 0;
const scoreElement = document.getElementById('score');
const scoreboard = document.getElementById('scoreboard');

let isPaused = false;
let animationId;

canvas.style.display = 'none';
scoreboard.style.display = 'none';

const startButton = document.getElementById('startButton'); 
const menu = document.getElementById('menu');

startButton.addEventListener('click', () => {
    menu.style.display = 'none';
    canvas.style.display = 'block';
    scoreboard.style.display = 'block';
    generateEnemies();
    iniciarJuego();
});

function drawRoad() {
    ctx.drawImage(roadImage, 0, roadY1, canvas.width, canvas.height);
    ctx.drawImage(roadImage, 0, roadY2, canvas.width, canvas.height);
}

function updateScore() {
    score += 1;
    scoreElement.textContent = score;
}

function updateRoad() {
    roadY1 += 5;
    roadY2 += 5;

    if (roadY1 >= canvas.height) {
        roadY1 = -canvas.height;
    }
    if (roadY2 >= canvas.height) {
        roadY2 = -canvas.height;
    }
}

function iniciarJuego() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    updateRoad();
    drawRoad();

    if (!isPaused) {
        movePlayer();
        drawPlayer();
        drawExplosion();
        moveEnemies();
        drawEnemies();
        detectCollision();

        scoreCounter++;
        if (scoreCounter % 60 === 0) {
            updateScore();
        }

        animationId = requestAnimationFrame(iniciarJuego);
    }
}

function showPauseModal() {
    isPaused = true;
    document.getElementById('pauseModal').style.display = 'block';
    cancelAnimationFrame(animationId);
}

function hidePauseModal() {
    isPaused = false;
    document.getElementById('pauseModal').style.display = 'none';
    iniciarJuego();
}

window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        if (!isPaused) {
            showPauseModal();
        }
    }
});

document.getElementById('continueButton').addEventListener('click', hidePauseModal);

const enemyCarImage = new Image();
enemyCarImage.src = '/Concurrente-7b-223732-main/juegoCAr/imagenes/carroE.png';

const positions = [100, 250, 400, 550];
let enemies = [];

function generateEnemies() {
    const enemyCount = 6;
    enemies = [];
    for (let i = 0; i < enemyCount; i++) {
        const positionIndex = Math.floor(Math.random() * positions.length);
        const enemy = {
            x: positions[positionIndex],
            y: -100 - Math.random() * 400,
            width: 50,
            height: 100,
            speed: 1 + Math.random() * 2
        };
        enemies.push(enemy);
    }
}

setInterval(generateEnemies, 2000);

function drawEnemies() {
    for (let enemy of enemies) {
        ctx.drawImage(enemyCarImage, enemy.x, enemy.y, enemy.width, enemy.height);
    }
}

function moveEnemies(playerX) {
    for (let enemy of enemies) {
        enemy.y += enemy.speed;

        if (enemy.x < playerX) {
            enemy.x += 1;
        } else if (enemy.x > playerX) {
            enemy.x -= 1;
        }

        if (enemy.y > canvas.height) {
            enemy.y = -100 - Math.random() * 400;
            const positionIndex = Math.floor(Math.random() * positions.length);
            enemy.x = positions[positionIndex];
        }
    }
}

function getEnemies() {
    return enemies;
}

const explosionImage = new Image();
explosionImage.src = '/Concurrente-7b-223732-main/juegoCAr/imagenes/explo.gif';
let explosionVisible = false;

function detectCollision() {
    const player = getPlayerPosition();
    const enemies = getEnemies();

    for (let enemy of enemies) {
        if (player.x < enemy.x + enemy.width &&
            player.x + player.width > enemy.x &&
            player.y < enemy.y + enemy.height &&
            player.height + player.y > enemy.y) {
            explosionVisible = true;
            setTimeout(() => {
                document.location.reload();
            }, 1000);
        }
    }
}

function drawExplosion() {
    if (explosionVisible) {
        ctx.drawImage(explosionImage, playerCar.x, playerCar.y, playerCar.width, playerCar.height);
    }
}

function getPlayerPosition() {
    return { x: playerCar.x, y: playerCar.y, width: playerCar.width, height: playerCar.height };
}

function drawPlayer() {
    ctx.drawImage(playerCarImage, playerCar.x, playerCar.y, playerCar.width, playerCar.height);
}
