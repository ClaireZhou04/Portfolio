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
