let player;
let items = [];
let score = 0;
let itemSpeed = 3;
let bookImages = [];
let gameDuration = 60; 
let timer = gameDuration; 
let isGameRunning = true; 

let books = [
    { id: 1, title: "The Wishing Game", genre: "Fiction", price: 10, image: "https://m.media-amazon.com/images/I/81ANaZRiSpL._AC_UF1000,1000_QL80_.jpg" },
    { id: 2, title: "Demon Copperhead", genre: "Fiction", price: 15, image: "https://m.media-amazon.com/images/I/918DFDx5ZRL.jpg" },
    { id: 3, title: "Educated", genre: "Non-fiction", price: 14, image: "https://m.media-amazon.com/images/I/71-4MkLN5jL.jpg" },
    { id: 4, title: "The Afghanistan Papers: A Secret History of the War", genre: "Non-fiction", price: 8.99, image: "https://m.media-amazon.com/images/I/71RtusmjLWL._UF350,350_QL50_.jpg" },
    { id: 5, title: "By All Means Available: Memoirs of a Life...", genre: "Non-fiction", price: 24.99, image: "https://m.media-amazon.com/images/I/71bzNhSiOzL._UF1000,1000_QL80_.jpg" },
    { id: 6, title: "Harry Potter and the Philosopher's Stone", genre: "Young Adult", price: 12, image: "https://m.media-amazon.com/images/I/81q77Q39nEL._AC_UF1000,1000_QL80_.jpg" },
    { id: 7, title: "Harry Potter and the Chamber of Secrets", genre: "Young Adult", price: 10, image: "https://m.media-amazon.com/images/I/918wxhKJaPL._AC_UF1000,1000_QL80_.jpg" },
];

function preload() {

    books.forEach((book) => {
        bookImages.push(loadImage(book.image));
    });
}

function setup() {
    const canvas = createCanvas(400, 600);
    canvas.parent("game-container");

    player = new Player();

    setInterval(() => {
        if (isGameRunning) {
            timer--;
            if (timer <= 0) {
                endGame();
            }
        }
    }, 1000); 
}

function draw() {
    if (!isGameRunning) return; 

    background(0);

    player.show();
    player.move();

    if (frameCount % 45 === 0) {
        items.push(new Item());
    }

    for (let i = items.length - 1; i >= 0; i--) {
        items[i].show();
        items[i].update();

        if (items[i].hits(player)) {
            score += 10;
            items.splice(i, 1);
        } else if (items[i].offscreen()) {
            items.splice(i, 1);
        }
    }

    fill(255);
    textSize(24);
    text(`Score: ${score}`, 10, 50);
    text(`Time Left: ${timer}s`, 10, 80);
}

class Player {
    constructor() {
        this.x = width / 2;
        this.y = height - 30;
        this.w = 60;
        this.h = 20;
    }

    show() {
        fill(0, 0, 255);
        rect(this.x, this.y, this.w, this.h);
    }

    move() {
        if (keyIsDown(LEFT_ARROW) && this.x > 0) {
            this.x -= 5;
        }
        if (keyIsDown(RIGHT_ARROW) && this.x < width - this.w) {
            this.x += 5;
        }
    }
}

class Item {
    constructor() {
        this.x = random(width); 
        this.y = 0; 
        this.size = 50; 
        this.image = random(bookImages); 
    }

    show() {
        image(this.image, this.x, this.y, this.size, this.size); 
    }

    update() {
        this.y += itemSpeed; 
    }

    hits(player) {
        return (
            this.x + this.size > player.x &&
            this.x < player.x + player.w &&
            this.y + this.size > player.y &&
            this.y < player.y + player.h
        );
    }

    offscreen() {
        return this.y > height; 
    }
}

function endGame() {
    isGameRunning = false;
    if (score >= 500) {
        const discountCode = `DISCOUNT-${Math.floor(Math.random() * 10000)}`;
        alert(`Congratulations! Your score is ${score}. Use this discount code: ${discountCode}`);
    } else {
        alert(`Game Over! Your score is ${score}. You need at least 500 points to earn a discount.`);
    }
}