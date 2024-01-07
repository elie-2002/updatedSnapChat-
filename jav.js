const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const boxSize = 20;
let snake = [{ x: 10, y: 10 }];
let food = { x: 15, y: 15 };
let direction = "right";

function draw() {
  // Draw the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the snake
  ctx.fillStyle = "#00F";
  for (let i = 0; i < snake.length; i++) {
    ctx.fillRect(snake[i].x * boxSize, snake[i].y * boxSize, boxSize, boxSize);
  }

  // Draw the food
  ctx.fillStyle = "#F00";
  ctx.fillRect(food.x * boxSize, food.y * boxSize, boxSize, boxSize);
}

function update() {
  // Update snake position
  const head = { x: snake[0].x, y: snake[0].y };

  switch (direction) {
    case "up":
      head.y--;
      break;
    case "down":
      head.y++;
      break;
    case "left":
      head.x--;
      break;
    case "right":
      head.x++;
      break;
  }

  // Check for collision with food
  if (head.x === food.x && head.y === food.y) {
    // Generate new food location
    food = {
      x: Math.floor(Math.random() * (canvas.width / boxSize)),
      y: Math.floor(Math.random() * (canvas.height / boxSize)),
    };
  } else {
    // Remove the last segment of the snake
    snake.pop();
  }

  // Check for collision with walls or itself
  if (
    head.x < 0 ||
    head.x >= canvas.width / boxSize ||
    head.y < 0 ||
    head.y >= canvas.height / boxSize ||
    checkCollision(head, snake)
  ) {
    // Game over
    resetGame();
  }

  // Update snake array with new head
  snake.unshift(head);
}

function checkCollision(point, array) {
  return array.some(
    (segment) => segment.x === point.x && segment.y === point.y
  );
}

function resetGame() {
  alert("Game Over! Press OK to restart.");
  snake = [{ x: 10, y: 10 }];
  food = { x: 15, y: 15 };
  direction = "right";
}

document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp":
      direction = "up";
      break;
    case "ArrowDown":
      direction = "down";
      break;
    case "ArrowLeft":
      direction = "left";
      break;
    case "ArrowRight":
      direction = "right";
      break;
  }
});

function gameLoop() {
  draw();
  update();
  setTimeout(gameLoop, 1000); // Adjust the speed of the game here
}

gameLoop();
