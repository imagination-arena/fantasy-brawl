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
    dy: 0,
    defaultColor: 'red'
};

const player2 = {
    x: 700,
    y: 500,
    width: 50,
    height: 50,
    color: 'blue',
    speed: 5,
    dx: 0,
    dy: 0,
    defaultColor: 'blue'
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
    if (player.x < 0) player.x = 0;
    if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
    if (player.y < 0) player.y = 0;
    if (player.y + player.height > canvas.height) player.y = canvas.height - player.height;
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
    // Player 1 controls
    if (e.key === 'ArrowRight') moveRight(player1);
    else if (e.key === 'ArrowLeft') moveLeft(player1);
    else if (e.key === 'ArrowUp') moveUp(player1);
    else if (e.key === 'ArrowDown') moveDown(player1);
    else if (e.key === 'k') kick(player1, player2);
    else if (e.key === 'p') punch(player1, player2);

    // Player 2 controls
    if (e.key === 'd') moveRight(player2);
    else if (e.key === 'a') moveLeft(player2);
    else if (e.key === 'w') moveUp(player2);
    else if (e.key === 's') moveDown(player2);
    else if (e.key === 'l') kick(player2, player1);
    else if (e.key === ';') punch(player2, player1);
}

function keyUp(e) {
    // Player 1 stop movement
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') player1.dx = 0;
    else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') player1.dy = 0;

    // Player 2 stop movement
    if (e.key === 'd' || e.key === 'a') player2.dx = 0;
    else if (e.key === 'w' || e.key === 's') player2.dy = 0;
}

function kick(attacker, defender) {
    if (isColliding(attacker, defender)) {
        defender.color = 'lightgrey';
        setTimeout(() => defender.color = defender.defaultColor, 200);
    } else {
        attacker.color = 'yellow';
        setTimeout(() => attacker.color = attacker.defaultColor, 200);
    }
}

function punch(attacker, defender) {
    if (isColliding(attacker, defender)) {
        defender.color = 'lightgrey';
        setTimeout(() => defender.color = defender.defaultColor, 200);
    } else {
        attacker.color = 'green';
        setTimeout(() => attacker.color = attacker.defaultColor, 200);
    }
}

function isColliding(player1, player2) {
    return !(player1.x + player1.width < player2.x ||
             player1.x > player2.x + player2.width ||
             player1.y + player1.height < player2.y ||
             player1.y > player2.y + player2.height);
}

update();

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);
