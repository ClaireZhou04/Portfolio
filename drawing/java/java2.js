let juiceOffset = 0;
const juice = document.querySelector('.juice-container');
const girl = document.querySelector('.girl');
const gradient = document.querySelector('#gradient1 stop'); 
const drinkSound = new Audio('media/drink.mp3');

const initialTop = window.innerHeight * 0.65;
const minTop = initialTop - 140;
const maxTop = window.innerHeight - juice.clientHeight;

juice.style.top = `${initialTop}px`;
juiceOffset = initialTop;

document.body.style.overflow = 'hidden';

window.addEventListener('wheel', (event) => {
    let moveAmount = event.deltaY * 0.25;
    let newTop = juiceOffset + moveAmount;

    if (newTop < minTop) newTop = minTop;
    if (newTop > maxTop) newTop = maxTop;

    if (newTop === minTop && juiceOffset !== minTop) {
        drinkSound.currentTime = 0; 
        drinkSound.play();
    }

    juiceOffset = newTop;
    juice.style.top = `${juiceOffset}px`;

    if (juiceOffset === minTop) {
        girl.src = 'media/girl2.png';
    } else {
        girl.src = 'media/girl1.png';
    }

    let scrollProgress = (juiceOffset - minTop) / (maxTop - minTop);

    let red = Math.round(255 * (1 - scrollProgress)); 
    let blue = Math.round(255 * scrollProgress);
    
    gradient.setAttribute('stop-color', `rgb(${blue}, 255, ${red})`);
});
