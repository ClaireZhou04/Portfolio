
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const bubbles = [];
for (let i = 0; i < 50; i++) {
  bubbles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 6 + 5,
    dx: (Math.random() - 0.5) * 1.5,
    dy: (Math.random() - 0.5) * 1.5,
    color: `hsl(${Math.random() * 360}, 60%, 60%)`
  });
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let bubble of bubbles) {
    ctx.beginPath();
    ctx.shadowColor = bubble.color;
    ctx.shadowBlur = 10;
    ctx.fillStyle = bubble.color;
    ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    bubble.x += bubble.dx;
    bubble.y += bubble.dy;

    if (bubble.x + bubble.radius > canvas.width || bubble.x - bubble.radius < 0) bubble.dx *= -1;
    if (bubble.y + bubble.radius > canvas.height || bubble.y - bubble.radius < 0) bubble.dy *= -1;
  }
  requestAnimationFrame(animate);
}
animate();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// 拖拽图标（原有功能）
const icons = document.querySelectorAll('.feature-icon');
const gravity = 0.5;
const bounce = 0.7;
icons.forEach(icon => {
  let isDragging = false;
  let offsetX, offsetY;
  let velocityX = 0, velocityY = 0;
  let posX = icon.offsetLeft, posY = icon.offsetTop;

  icon.addEventListener('mousedown', e => {
    isDragging = true;
    offsetX = e.clientX - posX;
    offsetY = e.clientY - posY;
    icon.style.animation = 'none';
    velocityX = velocityY = 0;
  });

  document.addEventListener('mousemove', e => {
    if (isDragging) {
      posX = e.clientX - offsetX;
      posY = e.clientY - offsetY;
      icon.style.position = 'absolute';
      icon.style.left = `${posX}px`;
      icon.style.top = `${posY}px`;
    }
  });

  document.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      velocityX = (Math.random() - 0.5) * 4;
      // 可以加入落下逻辑
    }
  });
});

// ===== 新增：Logo 连续点击触发故障并返回 =====
const logo = document.querySelector('.logo');
let clickCount = 0;

// 创建故障画布
document.addEventListener('DOMContentLoaded', () => {
  const glitchCanvas = document.createElement('canvas');
  glitchCanvas.id = 'glitchCanvas';
  document.body.appendChild(glitchCanvas);
  const glitchCtx = glitchCanvas.getContext('2d');

  function resizeGlitch() {
    glitchCanvas.width = window.innerWidth;
    glitchCanvas.height = window.innerHeight;
  }
  resizeGlitch();
  window.addEventListener('resize', resizeGlitch);

  logo.addEventListener('click', e => {
    e.preventDefault();
    clickCount++;
    if (clickCount >= 10) {
      triggerGlitch(() => {
        window.location.href = '../start.html';
      });
    }
  });

  function triggerGlitch(callback) {
    html2canvas(document.body).then(screenshot => {
      const img = new Image();
      img.src = screenshot.toDataURL();
      img.onload = () => {
        glitchCanvas.style.opacity = 1;
        let frames = 0;
        const maxFrames = 20;
        const id = setInterval(() => {
          glitchCtx.clearRect(0, 0, glitchCanvas.width, glitchCanvas.height);
          for (let i = 0; i < 10; i++) {
            const sx = Math.random() * glitchCanvas.width;
            const sy = Math.random() * glitchCanvas.height;
            const sw = glitchCanvas.width - sx;
            const sh = Math.random() * 30 + 5;
            const dx = sx + (Math.random() - 0.5) * 40;
            const dy = sy + (Math.random() - 0.5) * 40;
            glitchCtx.drawImage(img, sx, sy, sw, sh, dx, dy, sw, sh);
          }
          frames++;
          if (frames >= maxFrames) {
            clearInterval(id);
            callback();
          }
        }, 60);
      };
    });
  }
});
