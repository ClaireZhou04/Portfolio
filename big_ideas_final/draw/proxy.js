const grid = document.getElementById('gameGrid');
const cols = 100;
const rows = 60;
const cells = [];
const probability = 0.001; // 初始活跃概率
const spreadChance = 0.25; // 感染蔓延概率
const audio = document.getElementById('bgMusic');

const btn = document.getElementById('toggle-btn');
    const video = document.querySelector('.video-wrapper video');
    let isStopped = false;
  
    video.playbackRate = 3; 
  
    btn.addEventListener('click', () => {
      if (!isStopped) {
        btn.textContent = 'Continue';
        audio.play();
        video.pause();
        isStopped = true;
      } else {
        btn.textContent = 'Stop Processing';
        video.play();
        isStopped = false;
      }
    });

for (let i = 0; i < cols * rows; i++) {
  const cell = document.createElement('div');
  cell.classList.add('cell');
  if (Math.random() < probability) {
    cell.classList.add(Math.random() < 0.5 ? 'mosaic' : 'invert');
  }
  grid.appendChild(cell);
  cells.push(cell);
}

// 获取邻居索引
function getNeighbors(index) {
  const x = index % cols;
  const y = Math.floor(index / cols);
  const neighbors = [];

  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      if (dx === 0 && dy === 0) continue;
      const nx = x + dx;
      const ny = y + dy;
      if (nx >= 0 && nx < cols && ny >= 0 && ny < rows) {
        neighbors.push(ny * cols + nx);
      }
    }
  }
  return neighbors;
}

// 更新每一代
function updateGrid() {
  const newStates = [];

  cells.forEach((cell, index) => {
    const neighbors = getNeighbors(index);
    const infectedNeighbors = neighbors.filter(i =>
      cells[i].classList.contains('mosaic') ||
      cells[i].classList.contains('invert')
    );

    if (!cell.classList.contains('mosaic') && !cell.classList.contains('invert')) {
      if (infectedNeighbors.length > 0 && Math.random() < spreadChance) {
        newStates[index] = Math.random() < 0.5 ? 'mosaic' : 'invert';
      } else {
        newStates[index] = null;
      }
    } else {
      newStates[index] = cell.classList.contains('mosaic') ? 'mosaic' : 'invert';
    }
  });

  cells.forEach((cell, index) => {
    cell.classList.remove('mosaic', 'invert');
    if (newStates[index]) {
      cell.classList.add(newStates[index]);
    }
  });
}

// 动画循环
setInterval(updateGrid, 900);

