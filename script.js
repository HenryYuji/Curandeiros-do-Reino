const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let player = { x: 50, y: 50, width: 30, height: 30, health: 100 };
let keys = {};
let items = [];
let enemies = [];

function createItem() {
    const item = {
        x: Math.random() * (canvas.width - 20),
        y: Math.random() * (canvas.height - 20),
        width: 20,
        height: 20
    };
    items.push(item);
}

function createEnemy() {
    const enemy = {
        x: Math.random() * (canvas.width - 30),
        y: Math.random() * (canvas.height - 30),
        width: 30,
        height: 30,
        direction: Math.random() < 0.5 ? 1 : -1
    };
    enemies.push(enemy);
}

function update() {
    if (keys['ArrowUp']) player.y -= 2;
    if (keys['ArrowDown']) player.y += 2;
    if (keys['ArrowLeft']) player.x -= 2;
    if (keys['ArrowRight']) player.x += 2;

    items.forEach((item, index) => {
        if (player.x < item.x + item.width &&
            player.x + player.width > item.x &&
            player.y < item.y + item.height &&
            player.y + player.height > item.y) {
            items.splice(index, 1);
            player.health += 10;
            console.log("Saúde: " + player.health);
        }
    });

    enemies.forEach((enemy) => {
        enemy.x += enemy.direction * 1.5;

        if (enemy.x < 0 || enemy.x > canvas.width - enemy.width) {
            enemy.direction *= -1;
        }

        if (player.x < enemy.x + enemy.width &&
            player.x + player.width > enemy.x &&
            player.y < enemy.y + enemy.height &&
            player.y + player.height > enemy.y) {
            player.health -= 1;
            console.log("Saúde: " + player.health);
        }
    });

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'green';
    ctx.fillRect(player.x, player.y, player.width, player.height);

    ctx.fillStyle = 'yellow';
    items.forEach(item => ctx.fillRect(item.x, item.y, item.width, item.height));

    ctx.fillStyle = 'red';
    enemies.forEach(enemy => ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height));

    if (player.health > 0) {
        requestAnimationFrame(update);
    } else {
        alert("Game Over! Sua saúde acabou.");
    }
}

document.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});

document.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

for (let i = 0; i < 5; i++) createItem();
for (let i = 0; i < 3; i++) createEnemy();

update();
