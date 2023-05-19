// setup canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// function to generate random number

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

function Ball(x, y, velX, velY, color, size) {
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.color = color;
  this.size = size;
}

Ball.prototype.draw = function() {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.fill();
}

Ball.prototype.update = function() {
  if ((this.x + this.size) >= width) {
    this.velX = -(this.velX - 0.5);
    this.x = width - this.size - 1;
  }

  if ((this.x - this.size) <= 0) {
    this.velX = (this.velX + 0.5);
    this.x = this.size + 1;
  }

  if ((this.y + this.size) >= height) {
    this.velY = -(this.velY - 0.5);
    this.y = height - this.size - 1;
  }

  if ((this.y - this.size) <= 0) {
    this.velY = (this.velY + 0.5);
    this.y = this.size + 1;
  }

  if (this.velY >= 2) {
    this.velY -= (0.25 * this.velY);
  }

  if (this.velX >= 2) {
    this.velX -= (0.25 * this.velX);
  }

  if (this.velY <= -2) {
    this.velY += (0.25 * this.velY);
  }

  if (this.velX <= -2) {
    this.velX += (0.25 * this.velX);
  }

  this.x += this.velX;
  this.y += this.velY;
}

let balls = [];

while (balls.length < 25) {
  let size = random(5,30);
  let ball = new Ball(
    // ball position always drawn at least one ball width
    // away from the edge of the canvas, to avoid drawing errors
    random(0 + size,width - size),
    random(0 + size,height - size),
    0,
    0,
    'rgb(' + random(10,255) + ',' + random(10,255) + ',' + random(10,255) +')',
    size
  );

  balls.push(ball);
}

Ball.prototype.collisionDetect = function() {
  for (let j = 0; j < balls.length; j++) {
    if (!(this === balls[j])) {
      const dx = this.x - balls[j].x;
      const dy = this.y - balls[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size) {
        let lastVelx1 = this.velX;
        let lastVelx2 = balls[j].velX;

        let lastVely1 = this.velY;
        let lastVely2 = balls[j].velY;
        
        this.velX = lastVelx2;
        this.velY = lastVely2;

        balls[j].velX = lastVelx1;
        balls[j].velY = lastVely1;
        
        // let dSize = this.size - balls[j].size;

        // let tSize = 0;

        // for (let k; k < balls.length; k++) {
        //   tSize = tSize + balls[k].size;
        // }

        // let avgSize = tSize / balls.length;

        // if (dSize >= avgSize) {
        //   this.size = this.size + balls[j].size;
        //   balls.splice(j, 1);
        // }
      }

      let gAccel = -5 * ((balls[j].size) / (distance * distance));
      let angle = Math.atan2(dy - ((5 * Math.random()) - 2.5), dx - ((5 * Math.random()) - 2.5));
      let xGAccel = gAccel * Math.cos(angle);
      let yGAccel = gAccel * Math.sin(angle);

      this.velX = this.velX + xGAccel;
      this.velY = this.velY + yGAccel;
    }
  }
}

function loop() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.fillRect(0, 0, width, height);

  for (let i = 0; i < balls.length; i++) {
    balls[i].draw();
    balls[i].update();
    balls[i].collisionDetect();
  }

  requestAnimationFrame(loop);
}

loop();