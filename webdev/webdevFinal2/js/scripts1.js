const subtotalInput = document.querySelector("#subtotal");
const resultBox = document.querySelector("#result");
const placeOrder = document.querySelector("#placeorder");
let shoppingCartPage = document.querySelector("#shoppingCartPage");
let checkoutPage = document.querySelector("#checkoutPage");
let order = document.querySelector("#order");
let back = document.querySelector("#back");
let ordersummary = document.querySelector("#ordersummary");
const shipping = document.querySelector("#shipping");
// Initialize cart and total price from localStorage or defaults
let cart = [];
let totalPrice = 0;

let totalQuantity = 0;
const bookList = document.getElementById("booklist");
let genrefilter = document.getElementById('genrefilter');


const books = [
    { id: 1, title: "The Wishing Game", genre: "Fiction", price: 10, image: "https://m.media-amazon.com/images/I/81ANaZRiSpL._AC_UF1000,1000_QL80_.jpg" },
    { id: 2, title: "Demon Copperhead", genre: "Fiction", price: 15, image: "https://m.media-amazon.com/images/I/918DFDx5ZRL.jpg" },
    { id: 3, title: "Educated", genre: "Non-fiction", price: 14, image: "https://m.media-amazon.com/images/I/71-4MkLN5jL.jpg" },
    { id: 4, title: "The Afghanistan Papers: A Secret History of the War", genre: "Non-fiction", price: 8.99, image: "https://m.media-amazon.com/images/I/71RtusmjLWL._UF350,350_QL50_.jpg" },
    { id: 5, title: "By All Means Available: Memoirs of a Life...", genre: "Non-fiction", price: 24.99, image: "https://m.media-amazon.com/images/I/71bzNhSiOzL._UF1000,1000_QL80_.jpg" },
    { id: 6, title: "Harry Potter and the Philosopher's Stone", genre: "Young Adult", price: 12, image: "https://m.media-amazon.com/images/I/81q77Q39nEL._AC_UF1000,1000_QL80_.jpg" },
    { id: 7, title: "Harry Potter and the Chamber of Secrets", genre: "Young Adult", price: 10, image: "https://m.media-amazon.com/images/I/918wxhKJaPL._AC_UF1000,1000_QL80_.jpg" },
    { id: 8, title: "Harry Potter and the Prisoner of Azkaban", genre: "Young Adult", price: 10, image: "https://m.media-amazon.com/images/I/812CcFkEPCL._AC_UF1000,1000_QL80_.jpg" },
    { id: 9, title: "Harry Potter and the Goblet of Fire", genre: "Young Adult", price: 15, image: "https://m.media-amazon.com/images/I/91-LL7OnDCL._AC_UF1000,1000_QL80_.jpg" },
    { id: 10, title: "Harry Potter and the Order of the Phoenix", genre: "Young Adult", price: 12, image: "https://m.media-amazon.com/images/I/71pgI2ou5oL._AC_UF1000,1000_QL80_.jpg" },
    { id: 11, title: "Harry Potter and the Half-Blood Prince", genre: "Young Adult", price: 13, image: "https://m.media-amazon.com/images/I/71Z6OMoMjgL._AC_UF1000,1000_QL80_.jpg" },
    { id: 12, title: "Harry Potter and the Deathly Hallows", genre: "Young Adult", price: 20, image: "https://m.media-amazon.com/images/I/71sH3vxziLL._AC_UF1000,1000_QL80_.jpg" },
    { id: 13, title: "The Hunger Games", genre: "Young Adult", price: 11, image: "https://m.media-amazon.com/images/I/71un2hI4mcL.jpg" },
    { id: 14, title: "Catching Fire (The Hunger Games)", genre: "Young Adult", price: 12, image: "https://m.media-amazon.com/images/I/71e9wjuvcJL._AC_UF1000,1000_QL80_.jpg" },
    { id: 15, title: "Mockingjay (The Hunger Games)", genre: "Young Adult", price: 14, image: "https://m.media-amazon.com/images/I/61Rdf+YXwIL._AC_UF1000,1000_QL80_.jpg" },
    { id: 16, title: "The Midnight Library", genre: "Fiction", price: 13.50, image: "https://m.media-amazon.com/images/I/71ls-I6A5KL.jpg" },
    { id: 17, title: "Hello Beautiful", genre: "Fiction", price: 14.75, image: "https://m.media-amazon.com/images/I/91ejqv4ZJ6L._AC_UF1000,1000_QL80_.jpg" },
    { id: 18, title: "Lessons in Chemistry", genre: "Fiction", price: 11.40, image: "https://m.media-amazon.com/images/I/71dQACXhz6L.jpg" },
    { id: 19, title: "A Promised Land", genre: "Non-fiction", price: 14.50, image: "https://m.media-amazon.com/images/I/91-6R0VxRiL.jpg" },
    { id: 20, title: "Our Women on the Ground: Essays by Arab Women...", genre: "Non-fiction", price: 13.70, image: "https://m.media-amazon.com/images/I/71LWOWjrI3L.jpg" },
    { id: 21, title: "How the Irish Saved Civilization: The Untold Story...", genre: "Non-fiction", price: 11, image: "https://m.media-amazon.com/images/I/61Q9fTLR4KL._AC_UF1000,1000_QL80_.jpg" },
    { id: 22, title: "War and Peace", genre: "Fiction", price: 11, image: "https://m.media-amazon.com/images/I/71wXZB-VtBL._AC_UF1000,1000_QL80_.jpg" },
    { id: 23, title: "John Adams", genre: "Non-fiction", price: 13, image: "https://m.media-amazon.com/images/I/71wLn1zZBrL._AC_UF1000,1000_QL80_.jpg" },
    { id: 24, title: "Leviathan", genre: "Non-fiction", price: 9, image: "https://www.academybookstore.org/v/vspfiles/photos/489-2T.jpg" },

];


// use onchange to respond to filter changes
if (genrefilter !== null) {
    genrefilter.onchange = function(event) {
        event.preventDefault();
        let selectedGenre = genrefilter.value;
        bookList.innerHTML = "";
        if (selectedGenre === 'all'){
            for (let i = 0; i<books.length; i++){
                const bookElement = document.createElement("div");
                bookElement.classList.add("book", 'booksize');
                bookElement.innerHTML = `
                    <img src="${books[i].image}" alt="${books[i].title}">
                    <h3>${books[i].title}</h3>
                    <p>Genre: ${books[i].genre}</p>
                    <p>Price: $${books[i].price.toFixed(2)}</p>
                    <button type='button' onclick="addToCart(${books[i].id})">Add to Cart</button>
                `;
                bookList.appendChild(bookElement);
            }
        } else if(selectedGenre === 'fiction'){
            for (let i = 0; i<books.length; i++){
                if(books[i].genre === 'Fiction'){
                    const bookElement = document.createElement("div");
                    bookElement.classList.add("book", 'booksize');
                    bookElement.innerHTML = `
                        <img src="${books[i].image}" alt="${books[i].title}">
                        <h3>${books[i].title}</h3>
                        <p>Genre: ${books[i].genre}</p>
                        <p>Price: $${books[i].price.toFixed(2)}</p>
                        <button type='button' onclick="addToCart(${books[i].id})">Add to Cart</button>
                    `;
                    bookList.appendChild(bookElement);
                }
            }
        } else if(selectedGenre === 'nonfiction'){
            for (let i = 0; i<books.length; i++){
                if(books[i].genre === 'Non-fiction'){
                    const bookElement = document.createElement("div");
                    bookElement.classList.add("book", 'booksize');
                    bookElement.innerHTML = `
                        <img src="${books[i].image}" alt="${books[i].title}">
                        <h3>${books[i].title}</h3>
                        <p>Genre: ${books[i].genre}</p>
                        <p>Price: $${books[i].price.toFixed(2)}</p>
                        <button type='button' onclick="addToCart(${books[i].id})">Add to Cart</button>
                    `;
                    bookList.appendChild(bookElement);
                }
            }
        } else {
            for (let i = 0; i<books.length; i++){
                if(books[i].genre === 'Young Adult'){
                    const bookElement = document.createElement("div");
                    bookElement.classList.add("book", 'booksize');
                    bookElement.innerHTML = `
                        <img src="${books[i].image}" alt="${books[i].title}">
                        <h3>${books[i].title}</h3>
                        <p>Genre: ${books[i].genre}</p>
                        <p>Price: $${books[i].price.toFixed(2)}</p>
                        <button type='button' onclick="addToCart(${books[i].id})">Add to Cart</button>
                    `;
                    bookList.appendChild(bookElement);
                }
            }
        }
    }
}


function addToCart(bookId) {
    const book = books.find(b => b.id === bookId);  // find helps get book object
    let bookInCart = false;
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id === bookId) {
            cart[i].quantity++; 
            bookInCart = true;
            break; 
        }
    }
    if (!bookInCart) {
        cart.push({ id: book.id, title: book.title, price: book.price, image: book.image, quantity: 1 });
    }
    totalPrice += book.price;
    saveCartToLocalStorage(); // Save to localStorage
    alert(`${book.title} has been added to your cart!`);
}

function saveCartToLocalStorage() {
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("totalPrice", totalPrice.toFixed(2));  // Save the total price as well


}

