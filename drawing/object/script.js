let bgColor = '#f5f5f5';
let resizing = false;  
let isPageHidden = false;  

class Shape {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  draw(ctx) {
    
  }

  update(deltaTime) {
    
  }
}

class Circle extends Shape {
  constructor(x, y, radius, speedX, speedY) {
    super(x, y);
    this.radius = radius;
    this.speedX = speedX;
    this.speedY = speedY;
  }

  draw(ctx) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgb(252, 119, 199)';
    ctx.fill();
    ctx.restore();
  }

  update(deltaTime) {
    this.x += this.speedX * deltaTime;
    this.y += this.speedY * deltaTime;

    let collided = false;
    if (this.x - this.radius < 0 || this.x + this.radius > canvas.width) {
      this.speedX *= -1;
      this.x = Math.min(Math.max(this.radius, this.x), canvas.width - this.radius);  
      collided = true;
    }
    if (this.y - this.radius < 0 || this.y + this.radius > canvas.height) {
      this.speedY *= -1;
      this.y = Math.min(Math.max(this.radius, this.y), canvas.height - this.radius); 
      collided = true;
    }
    return collided;
  }

  isCollidingWith(rectangle) {
    const circleDistX = Math.abs(this.x - rectangle.x - rectangle.width / 2);
    const circleDistY = Math.abs(this.y - rectangle.y - rectangle.height / 2);

    if (circleDistX > (rectangle.width / 2 + this.radius)) return false;
    if (circleDistY > (rectangle.height / 2 + this.radius)) return false;

    if (circleDistX <= (rectangle.width / 2)) return true;
    if (circleDistY <= (rectangle.height / 2)) return true;

    const cornerDistSq = Math.pow(circleDistX - rectangle.width / 2, 2) +
                         Math.pow(circleDistY - rectangle.height / 2, 2);
    return cornerDistSq <= Math.pow(this.radius, 2);
  }
}

class Rectangle extends Shape {
  constructor(x, y, width, height, speedX, speedY) {
    super(x, y);
    this.width = width;
    this.height = height;
    this.speedX = speedX;
    this.speedY = speedY;
  }

  draw(ctx) {
    ctx.save();
    ctx.fillStyle = 'rgb(81, 194, 255)';
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.restore();
  }

  update(deltaTime) {
    this.x += this.speedX * deltaTime;
    this.y += this.speedY * deltaTime;

    let collided = false;
    if (this.x < 0 || this.x + this.width > canvas.width) {
      this.speedX *= -1;
      this.x = Math.min(Math.max(0, this.x), canvas.width - this.width); 
      collided = true;
    }
    if (this.y < 0 || this.y + this.height > canvas.height) {
      this.speedY *= -1;
      this.y = Math.min(Math.max(0, this.y), canvas.height - this.height);
      collided = true;
    }
    return collided;
  }
}

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const shapes = [];

function resizeCanvas() {
  resizing = true;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  shapes.forEach(shape => {
    if (shape instanceof Circle) {
      shape.x = Math.min(Math.max(shape.radius, shape.x), canvas.width - shape.radius);
      shape.y = Math.min(Math.max(shape.radius, shape.y), canvas.height - shape.radius);
    } else if (shape instanceof Rectangle) {
      shape.x = Math.min(Math.max(0, shape.x), canvas.width - shape.width);
      shape.y = Math.min(Math.max(0, shape.y), canvas.height - shape.height);
    }
  });

  resizing = false;
}

function createShapes() {
  shapes.push(new Circle(100, 100, 50, 300, 400));
  shapes.push(new Rectangle(200, 200, 150, 60, 300, -400));
}

function changeBackgroundColor() {
  const randomColor = `hsl(${Math.floor(Math.random() * 360)}, 75%, 75%)`;
  bgColor = randomColor;
}

let lastTime = 0;

function animate(time) {
  if (isPageHidden || resizing) {
    requestAnimationFrame(animate);
    return;
  }

  const deltaTime = Math.min((time - lastTime) / 1000, 0.016); 
  lastTime = time;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  document.body.style.backgroundColor = bgColor;

  ctx.save();

  let wallCollision = false;
  shapes.forEach(shape => {
    wallCollision = shape.update(deltaTime) || wallCollision;
  });

  if (shapes[0].isCollidingWith(shapes[1])) {
    shapes[0].speedX *= -1;
    shapes[0].speedY *= -1;
    shapes[1].speedX *= -1;
    shapes[1].speedY *= -1;
    changeBackgroundColor();
  }

  if (wallCollision) {
    changeBackgroundColor();
  }

  shapes.forEach(shape => {
    shape.draw(ctx);
  });

  ctx.restore();
  requestAnimationFrame(animate);
}

document.addEventListener('visibilitychange', () => {
  isPageHidden = document.hidden;
  if (!isPageHidden) {
    lastTime = performance.now();  
  }
});

window.addEventListener('resize', resizeCanvas);

resizeCanvas();
createShapes();
animate(0);

