const canvas = document.getElementById("visualizer");
const ctx = canvas.getContext("2d");
const audio = document.getElementById("audio");
const h1 = document.getElementById("title");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

document.body.addEventListener("click", async () => {
  await audio.play();

  const audioContext = new AudioContext();
  const source = audioContext.createMediaElementSource(audio);
  const analyser = audioContext.createAnalyser();
  analyser.fftSize = 256;

  source.connect(analyser);
  analyser.connect(audioContext.destination);

  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

  function draw() {
    requestAnimationFrame(draw);
    analyser.getByteFrequencyData(dataArray);

    ctx.fillStyle = "rgba(51, 92, 154, 0.42)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const barWidth = canvas.width / bufferLength;
    let barHeight, x = 0;

    for (let i = 0; i < bufferLength; i++) {
      barHeight = dataArray[i]* 2;
      const r = barHeight + 25;
      const g = 50 + i * 2;
      const b = 200;
      ctx.fillStyle = `rgb(${r},${g},${b})`;
      ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
      x += barWidth + 4;
    }
  }

  draw();
});

function updateVideo() {
  const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  document.getElementById('video-light').style.display = isDarkMode ? 'none' : 'block';
  document.getElementById('video-dark').style.display = isDarkMode ? 'block' : 'none';
  document.getElementById('pic-light').style.display = isDarkMode ? 'none' : '';
  document.getElementById('pic-dark').style.display = isDarkMode ? '' : 'none';
  h1.style.display = "";
}

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateVideo);
updateVideo();