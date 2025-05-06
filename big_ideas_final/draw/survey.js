const startBtn = document.getElementById('startAudio');
const audio = document.getElementById('bgMusic');
const svg = document.getElementById('bgSVG');

let audioCtx, analyser, dataArray, source;
let clickedOnce = false;

startBtn.addEventListener('click', () => {
  if (!clickedOnce) {
    // 第一次点击：播放音乐、启动动画、改按钮文字
    audio.play();
    clickedOnce = true;
    startBtn.textContent = 'Next';  // 修改按钮文字

    // 启动音频可视化
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioCtx.createAnalyser();
    source = audioCtx.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(audioCtx.destination);
    analyser.fftSize = 256;
    dataArray = new Uint8Array(analyser.frequencyBinCount);

    animate();
  } else {
    // 第二次点击：跳转
    window.location.href = 'proxy.html';
  }
});

function animate() {
  analyser.getByteFrequencyData(dataArray);

  const avg = dataArray.reduce((a, b) => a + b) / dataArray.length;
  const threshold = 60;

  if (avg > threshold && Math.random() < 0.3) {
    createIcon();
  }

  requestAnimationFrame(animate);
}

function createIcon() {
  const colors = ['#ffdefc', '#e2d9ff', '#c9ffff', '#fffbde', '#bdc0ff'];
  const color = colors[Math.floor(Math.random() * colors.length)];

  const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  const x = Math.random() * 1920;
  const r = 15 + Math.random() * 10; 
  const startY = window.innerHeight + 100;

  circle.setAttribute('cx', x);
  circle.setAttribute('cy', startY);
  circle.setAttribute('r', r);
  circle.setAttribute('fill', color);  
  circle.classList.add('icon');

  svg.appendChild(circle);

  setTimeout(() => {
    circle.style.transition = 'opacity 1s';
    circle.style.opacity = 0;
    setTimeout(() => circle.remove(), 1000);
  }, 6000);
}
