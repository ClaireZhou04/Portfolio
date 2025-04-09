const assets = [
    'snorlax.png', 'electrabuzz.png', 'chansey.png', 'oddish.png',
    'pikachu.png', 'paras.png', 'arcanine.png', 'ponita.png',
    'venonat.png', 'eggsecute.png', 'machop.png', 'pidgey.png',
    'psyduck.png', 'tauros.png', 'vulpix.png', 'gloom.png',
    'krabby.png', 'butterfree.png', 'bulbasaur.png', 'clefairy.png',
    'koffing.png', 'goldeen.png', 'magikarp.png', 'beedrill.png',
    'lapras.png', 'meowth.png', 'ekans.png', 'jigglypuff.png',
    'horsea.png', 'polywog.png', 'sandshrew.png', 'rattata.png',
    'gengar.png', 'eevee.png', 'bellsprout.png', 'squirtle.png',
    'seel.png', 'caterpie.png'
  ];
  

  let gameTokens = [];
  let selectedTokens = [];
  let matchCount = 0;
  let totalPairs = 0;
  let timer = 400;
  let playerName;
  let timerInterval;
  let bestTime = localStorage.getItem('bestTime') || 300;
  let bestPlayer = localStorage.getItem('bestPlayer') || 'N/A';
  let difficulty = 'easy';
  

  const startBtn = document.getElementById('start-btn');
  const restartBtn = document.getElementById('restart-btn');
  const gameBoard = document.getElementById('game-board');
  const timerElement = document.getElementById('timer');
  const startScreen = document.getElementById('start-screen');
  const gameScreen = document.getElementById('game-screen');
  const gameOverScreen = document.getElementById('game-over-screen');
  const finalTimeElement = document.getElementById('final-time');
  const bestTimeElement = document.getElementById('best-time');
  const finalPlayerNameElement = document.getElementById('final-player-name');
  const bestPlayerElement = document.getElementById('best-player');
  const easyBtn = document.getElementById('easy-btn');
  const mediumBtn = document.getElementById('medium-btn');
  const hardBtn = document.getElementById('hard-btn');
  
  const correctSound = new Audio('Images/correct.wav');
  const wrongSound = new Audio('Images/wrong.wav');
  
  restartBtn.addEventListener('click', restartGame);
  easyBtn.addEventListener('click', () => { difficulty = 'easy'; startGame(); });
  mediumBtn.addEventListener('click', () => { difficulty = 'medium'; startGame(); });
  hardBtn.addEventListener('click', () => { difficulty = 'hard'; startGame(); });
  
  function startGame() {
    startScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
    resetGame();
    setupBoard();
    startTimer();
  }
  
  function restartGame() {
    gameOverScreen.classList.add('hidden');
    startScreen.classList.remove('hidden');
    setupBoard();
  }
  
  function resetGame() {
    gameTokens = [];
    selectedTokens = [];
    matchCount = 0;
    totalPairs = 0;
    timer = 0;
    clearInterval(timerInterval);
    timerElement.textContent = `Time: 0`;
  }
  
  function setupBoard() {
    const gridSizes = {
      easy: { rows: 3, cols: 4 },
      medium: { rows: 4, cols: 5 },
      hard: { rows: 5, cols: 6 }
    };
  
    const size = gridSizes[difficulty];
    totalPairs = (size.rows * size.cols) / 2; 
    const shuffledAssets = getShuffledAssets(size.rows * size.cols);
  
    gameBoard.innerHTML = '';  
    gameBoard.style.gridTemplateColumns = `repeat(${size.cols}, 1fr)`; 
  
    shuffledAssets.forEach((image, index) => {
      const token = createToken(image, index);
      gameTokens.push(token);
      gameBoard.appendChild(token.element);
    });
  }
  
  function getShuffledAssets(numTokens) {
    const selectedImages = [];
    const selected = [];
    
    while (selectedImages.length * 2 < numTokens) {
      const randomIndex = Math.floor(Math.random() * assets.length);
      const image = assets[randomIndex];
      if (!selectedImages.includes(image)) {
        selectedImages.push(image);
      }
    }
    
    selectedImages.forEach(image => {
      selected.push(image, image);
    });
  
    return selected.sort(() => Math.random() - 0.5);
  }
  
  function createToken(image, index) {
    const token = document.createElement('div');
    token.classList.add('token');
    token.dataset.image = image;
    token.dataset.index = index;
    
    const front = document.createElement('div');
    front.classList.add('front');
    front.style.backgroundImage = `url('Images/pokeball.png')`; // Initial Pokéball image
  
    const back = document.createElement('div');
    back.classList.add('back');
    back.style.backgroundImage = `url('Images/${image}')`; // Actual secret image
  
    token.appendChild(front);
    token.appendChild(back);
    
    token.addEventListener('click', () => handleTokenClick(token));
  
    return { element: token, image };
  }
  
  function handleTokenClick(token) {
    if (selectedTokens.length === 2 || token.classList.contains('uncovered')) return;
  
    token.classList.add('uncovered');
    selectedTokens.push(token);
  
    if (selectedTokens.length === 2) {
      checkMatch();
    }
  }
  
  function checkMatch() {
    const [first, second] = selectedTokens;
    
   
    if (first.dataset.image === second.dataset.image) {
      matchCount++;
      selectedTokens = [];
      correctSound.play(); 
      
      if (matchCount === totalPairs) {
        endGame();
      }
    } else {

      wrongSound.play(); 

      setTimeout(() => {
        first.classList.remove('uncovered');
        second.classList.remove('uncovered');
        selectedTokens = [];
      }, 1000); 
    }
  }
  
  function startTimer() {
    timerInterval = setInterval(() => {
      timer++;
      timerElement.textContent = `Time: ${timer}`;
    }, 1000);
  }

   function endGame() {
     clearInterval(timerInterval);
    finalTimeElement.textContent = timer;
    //bestTimeElement.textContent = bestTime === null ? 'N/A' : bestTime;
     
    if (timer < bestTime|| bestTime == 300) {
    playerName = prompt('Congratulations! New best score! Please enter your name:');
    localStorage.setItem('bestTime', timer); // Save the new best time
    localStorage.setItem('bestPlayer', playerName); // Save the player's name
    bestTime = timer; // Update the current best time
    bestPlayer = playerName;
    }
    
     //bestTimeElement.textContent = bestTime === ` ${timer} seconds`;
     bestTimeElement.textContent = 'Player '+ bestPlayer +': '+ bestTime +' seconds';
    
     gameScreen.classList.add('hidden');
    gameOverScreen.classList.remove('hidden');
 }
  