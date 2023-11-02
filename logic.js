const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const canvasSize = 20;
const startLength = 3;

let snake = [];
let direction = 'right';
let food = {
  x: Math.floor(Math.random() * canvasSize),
  y: Math.floor(Math.random() * canvasSize)
};

function createSnake() {
  for (let i = startLength - 1; i >= 0; i--) {
    snake.push({ x: i, y: 0 });
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? '#00ff00' : '#00cc00';
    ctx.fillRect(snake[i].x * canvasSize, snake[i].y * canvasSize, canvasSize, canvasSize);
    ctx.strokeStyle = '#000000';
    ctx.strokeRect(snake[i].x * canvasSize, snake[i].y * canvasSize, canvasSize, canvasSize);
  }

  ctx.fillStyle = '#ff0000';
  ctx.fillRect(food.x * canvasSize, food.y * canvasSize, canvasSize, canvasSize);
  ctx.strokeStyle = '#000000';
  ctx.strokeRect(food.x * canvasSize, food.y * canvasSize, canvasSize, canvasSize);

  const headX = snake[0].x;
  const headY = snake[0].y;

  if (direction === 'right') {
    snake.unshift({ x: headX + 1, y: headY });
  } else if (direction === 'left') {
    snake.unshift({ x: headX - 1, y: headY });
  } else if (direction === 'up') {
    snake.unshift({ x: headX, y: headY - 1 });
  } else if (direction === 'down') {
    snake.unshift({ x: headX, y: headY + 1 });
  }

  if (headX === food.x && headY === food.y) {
    food = {
      x: Math.floor(Math.random() * canvasSize),
      y: Math.floor(Math.random() * canvasSize)
    };
  } else {
    snake.pop();
  }

  if (headX < 0 || headY < 0 || headX >= canvasSize || headY >= canvasSize || checkCollision()) {
    clearInterval(game);
    alert('Game Over');
  }
}

function checkCollision() {
  const headX = snake[0].x;
  const headY = snake[0].y;

  for (let i = 1; i < snake.length; i++) {
    if (headX === snake[i].x && headY === snake[i].y) {
      return true;
    }
  }

  return false;
}

function changeDirection(event) {
  const keyPressed = event.keyCode;

  if (keyPressed === 37 && direction !== 'right') {
    direction = 'left';
  } else if (keyPressed === 38 && direction !== 'down') {
    direction = 'up';
  } else if (keyPressed === 39 && direction !== 'left') {
    direction = 'right';
  } else if (keyPressed === 40 && direction !== 'up') {
    direction = 'down';
  }
}

createSnake();
let game = setInterval(draw, 100);

document.addEventListener('keydown', changeDirection);