const bgMusic = document.getElementById("bg-music");
const toggleBtn = document.getElementById("toggle-btn");

window.onload = () => {
  bgMusic.play();
};

toggleBtn.addEventListener("click", () => {
  if (bgMusic.paused) {

    bgMusic.play();
    toggleBtn.src = "../images/voice1.png";
  } else {
  
    bgMusic.pause();
    toggleBtn.src = "../images/voice2.png";
  }
});



const url = 'https://api.oick.cn/yiyan/api.php';  // The API for generating Chinese sentences
const deeplApiUrl = 'https://api-free.deepl.com/v2/translate';  // DeepL API endpoint for translation
const deeplApiKey = 'f7d3814e-7146-4a14-bab1-7ba7d9f570b0:fx';  // Your DeepL API key

const options = {
    method: 'GET',
};

// Fetch a random Chinese sentence
async function fetchSentence() {
    try {
        const response = await fetch(url, options);
        const chineseSentence = await response.text();
        console.log('Chinese Sentence:', chineseSentence);
        translateChineseToEnglish(chineseSentence);  // Pass the sentence for translation
    } catch (error) {
        console.error('Error fetching sentence:', error);
    }
}

// Translate Chinese sentence to English using DeepL
async function translateChineseToEnglish(chineseSentence) {
    try {
        const response = await fetch(deeplApiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                auth_key: deeplApiKey,
                text: chineseSentence,
                target_lang: 'EN',  // Translate to English
            })
        });

        const data = await response.json();
        if (data.translations && data.translations[0]) {
            const englishTranslation = data.translations[0].text;
            console.log('English Translation:', englishTranslation);
            displaySentence(chineseSentence, englishTranslation);  // Display both sentences
        } else {
            throw new Error('Translation failed');
        }
    } catch (error) {
        console.error('Translation error:', error);
        displaySentence(chineseSentence, 'Translation not available');
    }
}

// Display Chinese sentence and English translation on the page
function displaySentence(chineseSentence, englishTranslation) {
    const sentenceDisplay = document.getElementById('sentence');
    const historyList = document.getElementById('history-list');

    // Display both the Chinese sentence and its translation
    sentenceDisplay.innerHTML = `<strong>Chinese:</strong> ${chineseSentence}<br><strong>English:</strong> ${englishTranslation}`;

    // Add to history
    const historyItem = document.createElement('li');
    historyItem.innerHTML = `<strong>Chinese:</strong> ${chineseSentence} <br><strong>English:</strong> ${englishTranslation}`;
    historyList.appendChild(historyItem);
}

// Clear the history
function clearHistory() {
    const historyList = document.getElementById('history-list');
    historyList.innerHTML = '';  // Clears all items in the history
}

// Event listeners
document.getElementById('generate-btn').addEventListener('click', fetchSentence);
document.getElementById('clear-history-btn').addEventListener('click', clearHistory);
