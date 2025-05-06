// 父级 start.js —— 带故障音效 + 故障画面 + 跳转

// 气泡背景部分（保留不变）
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

// =============================================================================
// 新增：Logo 连续点击触发故障音效 + 故障画面 + 跳转
// =============================================================================

// 请确保在 start.html 中加入：
// <audio id="glitchSound" src="bug.mp3" preload="auto"></audio>
// <script src="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js"></script>

const logo = document.querySelector('.logo');
const glitchSound = document.getElementById('glitchSound');
let clickCount = 0;

// 创建并配置故障画布
const glitchCanvas = document.createElement('canvas');
glitchCanvas.id = 'glitchCanvas';
glitchCanvas.style.position = 'fixed';
glitchCanvas.style.top = '0';
glitchCanvas.style.left = '0';
glitchCanvas.style.width = '100%';
glitchCanvas.style.height = '100%';
glitchCanvas.style.opacity = '0';
glitchCanvas.style.pointerEvents = 'none';
glitchCanvas.style.zIndex = '9999';
document.body.appendChild(glitchCanvas);

const glitchCtx = glitchCanvas.getContext('2d');

function resizeGlitchCanvas() {
  glitchCanvas.width = window.innerWidth;
  glitchCanvas.height = window.innerHeight;
}
resizeGlitchCanvas();
window.addEventListener('resize', resizeGlitchCanvas);

logo.addEventListener('click', e => {
  e.preventDefault();
  clickCount++;

  if (clickCount >= 10) {
    // 1) 播放故障音效
    glitchSound.currentTime = 0;
    glitchSound.play();

    // 2) 触发故障画面
    triggerGlitchEffect(() => {
      // 3) 故障结束后跳转到 draw/start.html
      window.location.href = 'draw/start.html';
    });
  }
});

function triggerGlitchEffect(callback) {
  html2canvas(document.body).then(screenshot => {
    const img = new Image();
    img.src = screenshot.toDataURL();
    img.onload = () => {
      glitchCanvas.style.opacity = '1';
      let frames = 0;
      const maxFrames = 20;

      const interval = setInterval(() => {
        glitchCtx.clearRect(0, 0, glitchCanvas.width, glitchCanvas.height);

        // 每帧绘制若干条“错位”条带
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
          clearInterval(interval);
          callback();
        }
      }, 60);
    };
  });
}

