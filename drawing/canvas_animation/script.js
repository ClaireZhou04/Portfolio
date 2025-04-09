const canvas1 = document.getElementById('c1');
const ctx1 = canvas1.getContext('2d');
const canvas2 = document.getElementById('c2');
const ctx2 = canvas2.getContext('2d');
const video = document.getElementById('video');

function scaleCanvas(canvas) {
  const ratio = window.devicePixelRatio || 1;
  canvas.width = canvas.clientWidth * ratio;
  canvas.height = canvas.clientHeight * ratio;
  canvas.getContext('2d').scale(ratio, ratio);
}

scaleCanvas(canvas1);
scaleCanvas(canvas2);

window.addEventListener('resize', () => {
  scaleCanvas(canvas1);
  scaleCanvas(canvas2);
});


let lastTime = 0;
let angle = 0;
let lineAngle = 0;
let circleRadius = 100;
let currentColor = {h: 0, s: 100, l: 50};
let targetColor = {h: 0, s: 100, l: 50};

function animateCanvas1(timestamp) {
  const deltaTime = timestamp - lastTime;
  lastTime = timestamp;


  currentColor.h += (targetColor.h - currentColor.h) * 0.05;
  currentColor.s += (targetColor.s - currentColor.s) * 0.05;
  currentColor.l += (targetColor.l - currentColor.l) * 0.05;


  circleRadius = 90 + 10 * Math.sin(timestamp * 0.002);

  ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
  ctx1.save();

  const centerX = canvas1.width / (2 * devicePixelRatio);
  const centerY = canvas1.height / (2 * devicePixelRatio);

  ctx1.translate(centerX, centerY);
  angle += 0.001 * deltaTime;
  ctx1.rotate(angle);


  ctx1.beginPath();
  ctx1.arc(0, 0, circleRadius, 0, Math.PI * 2);
  ctx1.strokeStyle = `hsl(${currentColor.h}, ${currentColor.s}%, ${currentColor.l}%)`;
  ctx1.lineWidth = 8;
  ctx1.stroke();

  ctx1.restore();


  ctx1.save();
  ctx1.translate(centerX, centerY);
  lineAngle -= 0.002 * deltaTime;
  ctx1.rotate(lineAngle);

  for(let i = 0; i < 8; i++) {
    ctx1.rotate(Math.PI / 4);
    ctx1.beginPath();
    ctx1.moveTo(circleRadius + 10, 0);
    ctx1.lineTo(circleRadius + 40, 0);
    ctx1.strokeStyle = `hsl(${(currentColor.h + i * 20) % 360}, ${currentColor.s}%, ${currentColor.l}%)`;
    ctx1.lineWidth = 4;
    ctx1.stroke();
  }

  ctx1.restore();

  requestAnimationFrame(animateCanvas1);
}

requestAnimationFrame(animateCanvas1);

function renderVideoFrame() {
  if (video.readyState >= video.HAVE_CURRENT_DATA && !video.paused) {
    ctx2.drawImage(video, 0, 0, canvas2.width / devicePixelRatio, canvas2.height / devicePixelRatio);

    const width = canvas2.width;
    const height = canvas2.height;

    const sampleCount = 10; 
    let totalR = 0, totalG = 0, totalB = 0;

    for (let i = 0; i < sampleCount; i++) {
      const x = Math.floor(Math.random() * width);
      const y = Math.floor(Math.random() * height);
      const pixel = ctx2.getImageData(x, y, 1, 1).data;

      totalR += pixel[0];
      totalG += pixel[1];
      totalB += pixel[2];
    }

    let avgR = Math.min(255, (totalR / sampleCount) * 2);
    let avgG = Math.min(255, (totalG / sampleCount) * 2);
    let avgB = Math.min(255, (totalB / sampleCount) * 2);

    const rgbToHsl = (r, g, b) => {
      r /= 255, g /= 255, b /= 255;
      const max = Math.max(r, g, b), min = Math.min(r, g, b);
      let hue, sat, light = (max + min) / 2;

      if (max === min) {
        hue = sat = 0;
      } else {
        const d = max - min;
        sat = light > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case r: hue = (g - b) / d + (g < b ? 6 : 0); break;
          case g: hue = (b - r) / d + 2; break;
          case b: hue = (r - g) / d + 4; break;
        }
        hue /= 6;
      }
      return [Math.floor(hue * 360), Math.floor(sat * 100), Math.floor(light * 50)];
    };

    const [hue, sat, light] = rgbToHsl(avgR, avgG, avgB);

    targetColor = {
      h: hue,
      s: Math.min(100, sat + 30),
      l: Math.min(70, light + 20)
    };

    const fullImageData = ctx2.getImageData(0, 0, width, height);
    const data = fullImageData.data;

    for (let i = 0; i < data.length; i += 4) {
      data[i] = 255 - data[i];
      data[i + 1] = 255 - data[i + 1];
      data[i + 2] = 255 - data[i + 2];
    }
    ctx2.putImageData(fullImageData, 0, 0);
  }

  requestAnimationFrame(renderVideoFrame);
}

video.play().catch(error => {
  console.error('video autoplay', error);
});

renderVideoFrame();
