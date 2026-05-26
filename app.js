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

let d = "Right";

function draw() {
  console.log("正在執行");
  //畫面刷新
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  //畫蛇
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
    newHead.x = canvas.width;
  }
  if (newHead.y >= canvas.height) {
    newHead.y = 0;
  }
  if (newHead.y < 0) {
    newHead.y = canvas.height;
  }

  //方向
  document.addEventListener("keydown", changeDirection);
  function changeDirection(e) {
    console.log(e.key);

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

  snake.pop(); //123123
  snake.unshift(newHead);
}

let myGame = setInterval(draw, 100);
