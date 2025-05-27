let sweetCount = 0;
let saltyCount = 0;
let countdown = 30;
let timer;
let recognition;
let isRunning = false;
let isPaused = false;

const bgm = document.getElementById('bgm');

const sweetScore = document.querySelector('.sweet-score');
const saltyScore = document.querySelector('.salty-score');
const resultDiv = document.querySelector('.result');
const timerDiv = document.querySelector('.timer');
const startBtn = document.getElementById('start-btn');


window.addEventListener('DOMContentLoaded', () => {
    const bgm = document.getElementById('bgm');

    // 尝试自动播放背景音乐（多数浏览器需要用户互动）
    bgm.play().catch(() => {
        // 若失败，等待第一次点击恢复播放
        document.body.addEventListener('click', () => {
            bgm.play();
        }, { once: true });
    });
});


startBtn.onclick = () => {
    if (!isRunning) {
        // 初次点击：开始比赛
        isRunning = true;
        isPaused = false;
        startBtn.textContent = "暂停";

        setupRecognition();
        recognition.start();
        startCountdown();
    } else if (!isPaused) {
        // 比赛中：点击暂停
        isPaused = true;
        startBtn.textContent = "继续";
        recognition.stop();
        clearInterval(timer);
    } else {
        // 比赛暂停中：点击继续
        isPaused = false;
        startBtn.textContent = "暂停";
        setupRecognition();
        recognition.start();
        startCountdown();
    }
};

function setupRecognition() {
    recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'zh-CN';
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event) => {
        if (isPaused) return;

        const result = event.results[event.results.length - 1][0].transcript.trim();
        console.log("识别内容:", result);

        if (/甜|甜粽|甜的|田/.test(result)) {
            sweetCount++;
            sweetScore.textContent = sweetCount;
            
        }
        if (/咸|咸粽|咸的|闲/.test(result)) {
            saltyCount++;
            saltyScore.textContent = saltyCount;
            
        }
    };

    recognition.onerror = (e) => {
        console.error("语音识别错误:", e);
    };
}

function startCountdown() {
    clearInterval(timer);
    timer = setInterval(() => {
        if (!isPaused) {
            countdown--;
            timerDiv.textContent = `倒计时：${countdown}秒`;

            if (countdown <= 0) {
            clearInterval(timer);
            recognition.stop();
            
            startBtn.textContent = "重新开始";
            startBtn.disabled = false;

            startBtn.onclick = () => location.reload(); // 刷新页面，重置比赛
            displayResult();
}
        }
    }, 1000);
}

function displayResult() {
    if (sweetCount > saltyCount) {
        resultDiv.textContent = "甜粽子获胜！";
    } else if (saltyCount > sweetCount) {
        resultDiv.textContent = "咸粽子获胜！";
    } else {
        resultDiv.textContent = "平局！";
    }
}
