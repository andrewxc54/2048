const square = document.getElementById("square");
const scoreDisplay = document.getElementById("score");
const timeDisplay = document.getElementById("time");

let score = 0;
let timeLeft = 30;
let gameInterval;

function moveSquare() {
  const game = document.getElementById("game");
  const maxX = game.clientWidth - square.clientWidth;
  const maxY = game.clientHeight - square.clientHeight;

  const randomX = Math.floor(Math.random() * maxX);
  const randomY = Math.floor(Math.random() * maxY);

  square.style.left = `${randomX}px`;
  square.style.top = `${randomY}px`;
}

square.addEventListener("click", () => {
  score++;
  scoreDisplay.textContent = score;
  moveSquare();
});

function startGame() {
  moveSquare();
  gameInterval = setInterval(() => {
    timeLeft--;
    timeDisplay.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(gameInterval);
      alert(`Game Over! Your score is ${score}`);
      square.style.display = "none";
    }
  }, 1000);
}

startGame();
