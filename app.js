const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const unit = 20;
const row = canvas.height / unit;
const column = canvas.width / unit;

//蛇基本位置
let snake = [];
snake[0] = {
  x: 80,
  y: 0,
};
snake[1] = {
  x: 60,
  y: 0,
};
snake[2] = {
  x: 40,
  y: 0,
};
snake[3] = {
  x: 20,
  y: 0,
};
//食物位置
class Food {
  constructor() {
    this.pickALocation();
  }
  pickALocation() {
    this.x = Math.floor(Math.random() * column) * unit;
    this.y = Math.floor(Math.random() * row) * unit;
  }

  //畫食物
  drawFood() {
    ctx.fillStyle = "yellow";
    ctx.fillRect(this.x, this.y, unit, unit);
  }
}
let myFood = new Food();
//方向
document.addEventListener("keydown", changeDirection);
let d = "Right";
function changeDirection(e) {
  // console.log(e.key);
  if (e.key == " ") {
    toggleGame();
  }
  if (e.key == "ArrowUp" && d != "Down") {
    d = "Up";
  } else if (e.key == "ArrowDown" && d != "Up") {
    d = "Down";
  } else if (e.key == "ArrowLeft" && d != "Right") {
    d = "Left";
  } else if (e.key == "ArrowRight" && d != "Left") {
    d = "Right";
  }
}
//分數
let score = 0;
let highestScore = Number(localStorage.getItem("highestScore")) || 0;
document.getElementById("myScore").innerHTML = "分數:" + score;
document.getElementById("myScore2").innerHTML = "最高分數:" + highestScore;

//畫蛇
function drawSnake() {
  for (let i = 0; i < snake.length; i++) {
    if (i == 0) {
      ctx.fillStyle = "lightgreen";
    } else {
      ctx.fillStyle = "red";
    }
    ctx.strokeStyle = "white";
    ctx.fillRect(snake[i].x, snake[i].y, unit, unit);
    ctx.strokeRect(snake[i].x, snake[i].y, unit, unit);
  }
}
function draw() {
  console.log("正在執行");
  //畫面刷新
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  drawSnake();
  myFood.drawFood();

  //蛇動
  let HeadX = snake[0].x;
  let HeadY = snake[0].y;
  if (d == "Left") {
    HeadX -= unit;
  } else if (d == "Up") {
    HeadY -= unit;
  } else if (d == "Down") {
    HeadY += unit;
  } else if (d == "Right") {
    HeadX += unit;
  }

  let newHead = {
    x: HeadX,
    y: HeadY,
  };

  //穿牆
  if (newHead.x >= canvas.width) {
    newHead.x = 0;
  }
  if (newHead.x < 0) {
    newHead.x = canvas.width - unit;
  }
  if (newHead.y >= canvas.height) {
    newHead.y = 0;
  }
  if (newHead.y < 0) {
    newHead.y = canvas.height - unit;
  }

  //碰到食物
  if (newHead.x == myFood.x && newHead.y == myFood.y) {
    myFood.pickALocation();
    score++;
    document.getElementById("myScore").innerHTML = "分數:" + score;
  } else {
    snake.pop();
  }
  if (score >= highestScore) {
    highestScore = score;
    localStorage.setItem("highestScore", highestScore);
    document.getElementById("myScore2").innerHTML = "最高分數:" + highestScore;
  }

  snake.unshift(newHead);
  for (let i = 1; i < snake.length; i++) {
    if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
      clearInterval(myGame);
      alert("game over");
      resetGame();
      return;
    }
  }
}

// let myGame = setInterval(draw, 100);
let isPaused = true;
let myGame;
function toggleGame() {
  if (isPaused == true) {
    myGame = setInterval(draw, 100);
  } else {
    clearInterval(myGame);
  }
  isPaused = !isPaused;
}
function resetGame() {
  snake = [];
  snake[0] = {
    x: 80,
    y: 0,
  };
  snake[1] = {
    x: 60,
    y: 0,
  };
  snake[2] = {
    x: 40,
    y: 0,
  };
  snake[3] = {
    x: 20,
    y: 0,
  };
  score = 0;
  d = "Right";
  myFood.pickALocation();
  isPaused = true;
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}
