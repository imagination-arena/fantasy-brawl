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
    health: 100,
    defaultColor: 'red',
    isDefeated: false,
    isBlocking: false,
    canAttack: true
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
    health: 100,
    defaultColor: 'blue',
    isDefeated: false,
    isBlocking: false,
    canAttack: true
};

function resetGame() {
    location.reload(); // Refresh the page
}

function drawPlayer(player) {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawHealthBar(player, x, y) {
    ctx.fillStyle = 'black';
    ctx.fillRect(x, y, 104, 24);
    ctx.fillStyle = 'red';
    ctx.fillRect(x + 2, y + 2, 100, 20);
    ctx.fillStyle = 'green';
    ctx.fillRect(x + 2, y + 2, player.health, 20);
    ctx.fillStyle = 'white';
    ctx.font = '14px Arial';
    ctx.fillText(`${player.health} / 100`, x + 34, y + 17);
}

function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function newPos(player) {
    if (!player.isDefeated) {
        player.x += player.dx;
        player.y += player.dy;
        detectWalls(player);
    }
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
    drawHealthBar(player1, 20, 20);
    drawHealthBar(player2, canvas.width - 124, 20);

    if (player1.isDefeated || player2.isDefeated) {
        displayGameOver();
        return;
    }

    requestAnimationFrame(update);
}

function displayGameOver() {
    const gameOverText = document.getElementById('game-over');
    const startOverButton = document.getElementById('start-over');

    if (player1.isDefeated) {
        gameOverText.textContent = 'Player 2 Wins!';
    } else if (player2.isDefeated) {
        gameOverText.textContent = 'Player 1 Wins!';
    }

    gameOverText.style.display = 'block';
    startOverButton.style.display = 'block';
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
    if (!player1.isDefeated && player1.canAttack) {
        if (e.key === 'ArrowRight') moveRight(player1);
        else if (e.key === 'ArrowLeft') moveLeft(player1);
        else if (e.key === 'ArrowUp') moveUp(player1);
        else if (e.key === 'ArrowDown') moveDown(player1);
        else if (e.key === 'k') kick(player1, player2);
        else if (e.key === 'p') punch(player1, player2);
        else if (e.key === 'b') player1.isBlocking = true;
    }

    // Player 2 controls
    if (!player2.isDefeated && player2.canAttack) {
        if (e.key === 'd') moveRight(player2);
        else if (e.key === 'a') moveLeft(player2);
        else if (e.key === 'w') moveUp(player2);
        else if (e.key === 's') moveDown(player2);
        else if (e.key === 'l') kick(player2, player1);
        else if (e.key === 'o') player2.isBlocking = true;
        else if (e.key === ';') punch(player2, player1);
    }
}

function keyUp(e) {
    // Player 1 stop movement
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') player1.dx = 0;
    else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') player1.dy = 0;
    else if (e.key === 'b') player1.isBlocking = false;

    // Player 2 stop movement
    if (e.key === 'd' || e.key === 'a') player2.dx = 0;
    else if (e.key === 'w' || e.key === 's') player2.dy = 0;
    else if (e.key === 'o') player2.isBlocking = false;
}

function kick(attacker, defender) {
    if (defender.isDefeated || !attacker.canAttack) return;
    attacker.color = 'yellow';
    setTimeout(() => attacker.color = attacker.defaultColor, 200);
    if (isColliding(attacker, defender)) {
        let damage = defender.isBlocking ? 10 : 20;
        defender.health -= damage;
        if (defender.health <= 0) {
            defender.health = 0;
            defender.color = 'darkgrey';
            defender.isDefeated = true;
        } else {
            defender.color = 'lightgrey';
            setTimeout(() => defender.color = defender.defaultColor, 200);
        }
        defender.canAttack = false;
        setTimeout(() => defender.canAttack = true, 1000);
    }
}

function punch(attacker, defender) {
    if (defender.isDefeated || !attacker.canAttack) return;
    attacker.color = 'green';
    setTimeout(() => attacker.color = attacker.defaultColor, 200);
    if (isColliding(attacker, defender)) {
        let damage = defender.isBlocking ? 5 : 10;
        defender.health -= damage;
        if (defender.health <= 0) {
            defender.health = 0;
            defender.color = 'darkgrey';
            defender.isDefeated = true;
        } else {
            defender.color = 'lightgrey';
            setTimeout(() => defender.color = defender.defaultColor, 200);
        }
        defender.canAttack = false;
        setTimeout(() => defender.canAttack = true, 1000);
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

// Add event listener to the start over button
document.getElementById('start-over').addEventListener('click', resetGame);
