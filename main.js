// // setup canvas

// const canvas = document.querySelector('canvas');
// const ctx = canvas.getContext('2d');

// const width = canvas.width = window.innerWidth;
// const height = canvas.height = window.innerHeight;

// // function to generate random number

// function random(min, max) {
//   const num = Math.floor(Math.random() * (max - min + 1)) + min;
//   return num;
// }

// function Ball(x, y, velX, velY, color, size, initSize, gConst) {
//   this.x = x;
//   this.y = y;
//   this.velX = velX;
//   this.velY = velY;
//   this.color = color;
//   this.size = size;
//   this.initSize = initSize;
//   this.gConst = gConst;
// }

// Ball.prototype.draw = function() {
//   ctx.beginPath();
//   ctx.fillStyle = this.color;
//   ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
//   ctx.fill();
// }

// Ball.prototype.update = function() {
//   if ((this.x + this.size) >= width) {
//     this.velX = -(this.velX - 0.5);
//     this.x = width - this.size - 1;
//   }

//   if ((this.x - this.size) <= 0) {
//     this.velX = -(this.velX + 0.5);
//     this.x = this.size + 1;
//   }

//   if ((this.y + this.size) >= height) {
//     this.velY = -(this.velY - 0.5);
//     this.y = height - this.size - 1;
//   }

//   if ((this.y - this.size) <= 0) {
//     this.velY = -(this.velY + 0.5);
//     this.y = this.size + 1;
//   }

  // if (this.velY >= 2) {
  //   this.velY -= (0.25 * Math.abs(this.velY));
  // }

  // if (this.velX >= 2) {
  //   this.velX -= (0.25 * Math.abs(this.velX));
  // }

  // if (this.velY <= -2) {
  //   this.velY += (0.25 * Math.abs(this.velY));
  // }

  // if (this.velX <= -2) {
  //   this.velX += (0.25 * Math.abs(this.velX));
  // }

//   this.x += this.velX;
//   this.y += this.velY;

//   if (this.size > this.initSize) {
//     this.size -= this.size / 750;
//   }
// }

// let balls = [];

// while (balls.length < 25) {
//   ballmake;
// }

// function ballmake () {
//   let size = random(5,30);
//   let ball = new Ball(
//     // ball position always drawn at least one ball width
//     // away from the edge of the canvas, to avoid drawing errors
//     random(0 + size,width - size),
//     random(0 + size,height - size),
//     0,
//     0,
//     'rgb(' + random(10,255) + ',' + random(10,255) + ',' + random(10,255) +')',
//     size,
//     3 * (this.size / 4),
//     2
//   );

//   balls.push(ball);
// }

// ballmake();


// Ball.prototype.collisionDetect = function() {
//   for (let j = 0; j < balls.length; j++) {
//     if (!(this === balls[j])) {
//       const dx = 1 + this.x - balls[j].x;
//       const dy = 1 + this.y - balls[j].y;
//       const distance = Math.sqrt(dx * dx + dy * dy);

      

//       let gAccel = -this.gConst * ((balls[j].size) / (distance * distance));
//       let angle = Math.atan2(dy - ((5 * Math.random()) - 2.5), dx - ((5 * Math.random()) - 2.5));
//       let xGAccel = gAccel * Math.cos(angle);
//       let yGAccel = gAccel * Math.sin(angle);

//       this.velX = this.velX + xGAccel;
//       this.velY = this.velY + yGAccel;
      
//       if (distance <= this.size + balls[j].size) {
//         if (this.size > balls[j].size) {
//           this.size += balls[j].size / 25;
//           balls[j].size -= balls[j].size / 25;
//           this.initSize = this.size / 2;
//         }
//       }

//       if (balls[j].size < 2.5) {
//         this.size += balls[j].size;
//         balls.splice(j, 1);
//         let chance = random(0, 7)
//         if (chance >= 4 && chance < 6) {
//           ballmake();
//         } else if (chance >= 7) {
//           ballmake();
//           ballmake();
//         }
//       }
//     }
//   }
// }

// function loop() {
//   ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
//   ctx.fillRect(0, 0, width, height);

//   for (let i = 0; i < balls.length; i++) {
//     balls[i].draw();
//     balls[i].update();
//     balls[i].collisionDetect();
//   }

//   requestAnimationFrame(loop);
// }

// loop();

// Setup canvas
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// Function to generate random number
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let popCheck = false;

// Ball object
class Ball {
  constructor(x, y, velX, velY, color, size, initSize, gConst, index) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
    this.initSize = initSize;
    this.gConst = gConst;
    this.index = index;
  }

  draw() {
    let glowStrength = this.size / 10;

    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.shadowColor = this.color;
    ctx.shadowBlur = glowStrength;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore();
  }

  update() {
    let { size, initSize } = this;

    if (this.x + size >= width || this.x - size <= 0) {
      this.velX = -this.velX + (Math.abs(this.velX) >= 2 ? -0.25 * Math.abs(this.velX) : 0);
      this.x = Math.min(Math.max(this.x, this.size + 1), width - this.size - 1);
    }

    if (this.y + size >= height || this.y - size <= 0) {
      this.velY = -this.velY + (Math.abs(this.velY) >= 2 ? -0.25 * Math.abs(this.velY) : 0);
      this.y = Math.min(Math.max(this.y, this.size + 1), height - this.size - 1);
    }

    if (this.velY >= 2) {
      this.velY -= (0.25 * Math.abs(this.velY));
    }
  
    if (this.velX >= 2) {
      this.velX -= (0.25 * Math.abs(this.velX));
    }
  
    if (this.velY <= -2) {
      this.velY += (0.25 * Math.abs(this.velY));
    }
  
    if (this.velX <= -2) {
      this.velX += (0.25 * Math.abs(this.velX));
    }

    this.x += this.velX;
    this.y += this.velY;

    if (size > initSize) {
      this.size -= size / 500;
    }

    if (popCheck == true) {
      while (balls.length < 20) {
        ballmake(5, 35);
      }
    }

    let centerX = width / 2;
    let centerY = height / 2;

    let angle1 = 0.0025;
    let dx1 = this.x - centerX;
    let dy1 = this.y - centerY;

    let newX = dx1 * Math.cos(angle1) - dy1 * Math.sin(angle1);
    let newY = dx1 * Math.sin(angle1) + dy1 * Math.cos(angle1);

    this.x = newX + centerX;
    this.y = newY + centerY;
  }

  collisionDetect() {
    for (let j = 0; j < balls.length; j++) {
      if (this !== balls[j]) {
        let dx = this.x - balls[j].x;
        let dy = this.y - balls[j].y;
        let distance = Math.sqrt(dx * dx + dy * dy) + 1;

        let gAccel = -this.gConst * (balls[j].size / (distance * distance));
        let angle = Math.atan2(dy - ((5 * Math.random()) - 2.5), dx - ((5 * Math.random()) - 2.5));
        let xGAccel = gAccel * Math.cos(angle);
        let yGAccel = gAccel * Math.sin(angle);

        this.velX += xGAccel;
        this.velY += yGAccel;

        if (distance <= this.size + balls[j].size) {
          if (this.size > balls[j].size) {
            this.size += balls[j].size / 25;
            balls[j].size -= balls[j].size / 25;
            let lastInit = this.initSize;
            if (lastInit < balls[j].size * 0.75) {
              if (this.size > 5) {
                this.initSize = balls[j].size * 0.75;
              } else {
                this.initSize += balls[j].size / 100;
              }
            }
          }
        }

        if (balls[j].size < 1) {
          this.size += balls[j].size;
          balls.splice(j, 1);
          if (balls.length < 6) {
            popCheck = true;
          }
          let chance = random(0, 7);
          if (chance >= 2 && chance < 6) {
            ballmake(10, 40);
          } else if (chance >= 7) {
            ballmake(10, 35);
            ballmake(10, 35);
          }
        } else if (balls[j].size < 5) {
          balls[j].gConst = 8;
        }
      }
    }
  }
}

let balls = [];
let x = 0;

function ballmake(min, max) {
  
  let size = random(min, max);
  let ball = new Ball(
    random(0 + size, width - size),
    random(0 + size, height - size),
    0,
    0,
    'rgb(' + random(10, 255) + ',' + random(10, 255) + ',' + random(10, 255) + ')',
    size,
    3 * (size / 4),
    4,
    x
  );

  balls.push(ball);
  x += 1;
}

for (let i = 0; i < 25; i++) {
  ballmake(5, 30);
}

function checkBallSize() {
  let newBalls = [];

  for (let i = balls.length - 1; i >= 0; i--) {
    let ball = balls[i];

    if (ball.size > width / 2 || ball.size > height / 2) {
      balls.splice(i, 1);

      let numNewBalls = random(10, 20);

      for (let j = 0; j < numNewBalls; j++) {
        let size = random(5, 35);
        let newBall = new Ball(
          random(0 + size, width - size),
          random(0 + size, height - size),
          0,
          0,
          'rgb(' + random(10, 255) + ',' + random(10, 255) + ',' + random(10, 255) + ')',
          size,
          3 * (size / 4),
          2
        );

        newBalls.push(newBall);
      }
    }
  }

  balls.push(...newBalls);
}

function loop() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.fillRect(0, 0, width, height);

  checkBallSize();

  for (let i = 0; i < balls.length; i++) {
    balls[i].draw();
    balls[i].update();
    balls[i].collisionDetect();
  }

  if (balls.length > 50) {
    balls.splice(0, 30);
  }

  requestAnimationFrame(loop);
}

loop();