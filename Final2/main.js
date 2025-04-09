const bgMusic = document.getElementById("bg-music");
const toggleBtn = document.getElementById("toggle-btn");
const image = document.getElementById('interactive-image');

window.onload = () => {
  bgMusic.play();
};

toggleBtn.addEventListener("click", () => {
  if (bgMusic.paused) {

    bgMusic.play();
    toggleBtn.src = "images/voice1.png";
  } else {
  
    bgMusic.pause();
    toggleBtn.src = "images/voice2.png";
  }
});


image.addEventListener('click', () => {
  const currentSrc = image.getAttribute('src');
  if (currentSrc === 'images/middle1.png') {
    image.setAttribute('src', 'images/middle2.png');
  } else {
    image.setAttribute('src', 'images/middle1.png');
  }
});

const linkImageLeft = document.getElementById('link-image-left');
linkImageLeft.addEventListener('click', () => {
  window.location.href = 'video.html'; 
});

const linkImageLeft1 = document.getElementById('link-image-left1');
linkImageLeft1.addEventListener('click', () => {
  window.location.href = 'ghost.html'; 
});

const linkImageLeft2 = document.getElementById('link-image-left2');
linkImageLeft2.addEventListener('click', () => {
  window.location.href = 'slide.html'; 
});


const linkImageRight = document.getElementById('link-image-right');
linkImageRight.addEventListener('click', () => {
  window.location.href = 'pokemon2/index.html';
});

const linkImageRight1 = document.getElementById('link-image-right1');
linkImageRight1.addEventListener('click', () => {
  window.location.href = 'pokemon1/index.html'; 
});


const linkImageRight2 = document.getElementById('link-image-right2');
linkImageRight2.addEventListener('click', () => {
  window.location.href = 'api/api.html'; 
});
