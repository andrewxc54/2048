const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const keys = {};

window.addEventListener('keydown', e => keys[e.key] = true);
window.addEventListener('keyup', e => keys[e.key] = false);

// Car object
const car = {
  x: 400,
  y: 500,
  width: 40,
  height: 80,
  speed: 0,
  angle: 0,
  accel: 0.2,
  maxSpeed: 5,
  friction: 0.05,
  turnSpeed: 3,
  color: '#0f0'
};

// Track boundaries
const walls = [
  { x: 100, y: 100, width: 600, height: 20 },
  { x: 100, y: 480, width: 600, height: 20 },
  { x: 100, y: 100, width: 20, height: 400 },
  { x: 680, y: 100, width: 20, height: 400 },
];

function drawCar() {
  ctx.save();
  ctx.translate(car.x, car.y);
  ctx.rotate(car.angle * Math.PI / 180);
  ctx.fillStyle = car.color;
  ctx.fillRect(-car.width / 2, -car.height / 2, car.width, car.height);
  ctx.restore();
}

function drawTrack() {
  ctx.fillStyle = '#555';
  for (let wall of walls) {
    ctx.fillRect(wall.x, wall.y, wall.width, wall.height);
  }
}

function updateCar() {
  // Acceleration
  if (keys['ArrowUp']) car.speed += car.accel;
  if (keys['ArrowDown']) car.speed -= car.accel;

  // Limit speed
  car.speed = Math.max(Math.min(car.speed, car.maxSpeed), -car.maxSpeed / 2);

  // Turning
  if (keys['ArrowLeft']) car.angle -= car.turnSpeed * (car.speed !== 0 ? 1 : 0);
  if (keys['ArrowRight']) car.angle += car.turnSpeed * (car.speed !== 0 ? 1 : 0);

  // Apply friction
  if (car.speed > 0) car.speed -= car.friction;
  if (car.speed < 0) car.speed += car.friction;
  if (Math.abs(car.speed) < car.friction) car.speed = 0;

  // Movement
  car.x += Math.sin(car.angle * Math.PI / 180) * car.speed;
  car.y -= Math.cos(car.angle * Math.PI / 180) * car.speed;

  // Collision
  for (let wall of walls) {
    if (
      car.x + car.width / 2 > wall.x &&
      car.x - car.width / 2 < wall.x + wall.width &&
      car.y + car.height / 2 > wall.y &&
      car.y - car.height / 2 < wall.y + wall.height
    ) {
      // Collision detected — bounce back
      car.speed = 0;
    }
  }
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawTrack();
  updateCar();
  drawCar();
  requestAnimationFrame(gameLoop);
}

gameLoop();

