const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const img = new Image();
img.src = 'sky.jpg';

let palette = [];
let scale = window.devicePixelRatio;

function setup() {
  scale = window.devicePixelRatio;
  canvas.width = window.innerWidth * scale;
  canvas.height = window.innerHeight * scale;
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;
  ctx.scale(scale, scale);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const bgColors = [
     'rgb(67, 56, 63)',
     'rgb(240, 213, 229)',
     'rgb(72, 57, 86)',
     'rgb(242, 229, 255)'
     ];

  ctx.fillStyle = bgColors[Math.floor(Math.random() * bgColors.length)];
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const shapeCount = Math.floor(10 + Math.random() * 20);
  for (let i = 0; i < shapeCount; i++) {
    ctx.save();

    const color = palette[Math.floor(Math.random() * palette.length)];
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.globalAlpha = 0.3 + Math.random() * 0.7;

    const x = Math.random() * canvas.width / scale;
    const y = Math.random() * canvas.height / scale;
    const s = 0.5 + Math.random() * 1.5;
    ctx.translate(x, y);
    ctx.scale(s, s);

    const shapeType = Math.floor(Math.random() * 4);
    switch (shapeType) {
      case 0:
        drawCircle(ctx);
        break;
      case 1:
        drawRectangle(ctx);
        break;
      case 2:
        drawTriangle(ctx);
        break;
      default:
        drawCustomPath(ctx);
    }

    ctx.restore();
  }
}

function extractPalette(image, sampleCount = 100) {
  const tempCanvas = document.createElement('canvas');
  const tempCtx = tempCanvas.getContext('2d');
  tempCanvas.width = image.width;
  tempCanvas.height = image.height;
  tempCtx.drawImage(image, 0, 0, image.width, image.height);
  const imgData = tempCtx.getImageData(0, 0, image.width, image.height);
  const colors = [];

  for (let i = 0; i < sampleCount; i++) {
    const px = Math.floor(Math.random() * image.width);
    const py = Math.floor(Math.random() * image.height);
    const index = (py * image.width + px) * 4;
    const color = `rgb(${imgData.data[index]}, ${imgData.data[index+1]}, ${imgData.data[index+2]})`;
    colors.push(color);
  }

  return colors;
}

function drawCircle(ctx) {
  const radius = 10 + Math.random() * 50;
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI * 2);
  ctx.fill();
}

function drawRectangle(ctx) {
  const width = 20 + Math.random() * 60;
  const height = 20 + Math.random() * 60;
  ctx.fillRect(-width / 2, -height / 2, width, height);
}

function drawTriangle(ctx) {
  ctx.beginPath();
  ctx.moveTo(0, -30);
  ctx.lineTo(25, 20);
  ctx.lineTo(-25, 20);
  ctx.closePath();
  ctx.fill();
}

function drawCustomPath(ctx) {
  ctx.beginPath();
  ctx.moveTo(-30, -30);
  ctx.bezierCurveTo(30, -60, 40, 40, 0, 50);
  ctx.bezierCurveTo(-40, 40, -50, -10, -30, -30);
  ctx.closePath();
  ctx.fill();
}

img.onload = () => {
  palette = extractPalette(img);
  setup();
  draw();
};

window.addEventListener('resize', () => {
  setup();
  draw();
});
