// scripts/game.js

const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

const player1 = {
    x: 50,
    y: 500,
    width: 50,
    height: 50,
    color: 'red',
    speed: 5,
    dx: 0,
    dy: 0
};

const player2 = {
    x: 700,
    y: 500,
    width: 50,
    height: 50,
    color: 'blue',
    speed: 5,
    dx: 0,
    dy: 0
};

function drawPlayer(player) {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function newPos(player) {
    player.x += player.dx;
    player.y += player.dy;

    detectWalls(player);
}

function detectWalls(player) {
    // Left wall
    if (player.x < 0) {
        player.x = 0;
    }

    // Right Wall
    if (player.x + player.width > canvas.width) {
        player.x = canvas.width - player.width;
    }

    // Top wall
    if (player.y < 0) {
        player.y = 0;
    }

    // Bottom Wall
    if (player.y + player.height > canvas.height) {
        player.y = canvas.height - player.height;
    }
}

function update() {
    clear();

    newPos(player1);
    newPos(player2);

    drawPlayer(player1);
    drawPlayer(player2);

    requestAnimationFrame(update);
}

function moveUp(player) {
    player.dy = -player.speed;
}

function moveDown(player) {
    player.dy = player.speed;
}

function moveRight(player) {
    player.dx = player.speed;
}

function moveLeft(player) {
    player.dx = -player.speed;
}

function keyDown(e) {
    if (e.key === 'ArrowRight') {
        moveRight(player1);
    } else if (e.key === 'ArrowLeft') {
        moveLeft(player1);
    } else if (e.key === 'ArrowUp') {
        moveUp(player1);
    } else if (e.key === 'ArrowDown') {
        moveDown(player1);
    }

    if (e.key === 'd') {
        moveRight(player2);
    } else if (e.key === 'a') {
        moveLeft(player2);
    } else if (e.key === 'w') {
        moveUp(player2);
    } else if (e.key === 's') {
        moveDown(player2);
    }
}

function keyUp(e) {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        player1.dx = 0;
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        player1.dy = 0;
    }

    if (e.key === 'd' || e.key === 'a') {
        player2.dx = 0;
    } else if (e.key === 'w' || e.key === 's') {
        player2.dy = 0;
    }
}

update();

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);
