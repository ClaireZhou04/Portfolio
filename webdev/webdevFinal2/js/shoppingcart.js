// Create a fully functional online shopping cart application featuring your own design and products to sell. Use HTML forms, JavaScript validation, and the addEventListener() method to enhance user interaction. Follow the guidelines below:

// Select DOM elements
const subtotalInput = document.querySelector("#subtotal");
const resultBox = document.querySelector("#result");
const placeOrder = document.querySelector("#placeorder");
let shoppingCartPage = document.querySelector("#shoppingCartPage");
let checkoutPage = document.querySelector("#checkoutPage");
let order = document.querySelector("#order");
let back = document.querySelector("#back");
let ordersummary = document.querySelector("#ordersummary");
const shipping = document.querySelector("#shipping");
let cart = [];
if (!cart) cart = [];
let totalPrice = 0;
let totalQuantity = 0;
const bookList = document.getElementById("booklist");
let genrefilter = document.getElementById('genrefilter');
let discountAmount = 0; 
let discountCode = ""; 
let isDiscountApplied = false;

// Array of books
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

// Add to cart
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
    saveCartToLocalStorage(); // Save to localStorage
    updateCart();
    alert(`${book.title} has been added to your cart!`);
}

function setDiscountCode(code) {
    discountCode = code; 
    alert(`Your discount code is: ${discountCode}`);
}

document.getElementById("apply-discount").addEventListener("click", function () {
    const discountInput = document.getElementById("discount-code").value;
    const discountMessage = document.getElementById("discount-message");

    if (discountInput === discountCode) {
        if (!isDiscountApplied) {
            discountAmount = 10;
            isDiscountApplied = true;
            discountMessage.textContent = `Discount applied! You saved $${discountAmount.toFixed(2)}.`;
            discountMessage.style.color = "green";
            updateCartTotal();
        } else {
            discountMessage.textContent = "Discount already applied.";
            discountMessage.style.color = "orange";
        }
    } else {
        discountMessage.textContent = "Invalid discount code.";
        discountMessage.style.color = "red";
    }
});

function saveCartToLocalStorage() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Function to load the cart from localStorage and display it on the cart page
function loadCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || []; // Get the cart from localStorage
    let cartContainer = document.getElementById('cartContainer'); // Container to display the cart items
    let cartTotal = 0;

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        cart.forEach(item => {
            let itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.title}" class="cart-item-image" />
                <div class="cart-item-details">
                    <h4>${item.title}</h4>
                    <p>Price: $${item.price}</p>
                    <p>Quantity: ${item.quantity}</p>
                    <p>Total: $${(item.price * item.quantity).toFixed(2)}</p>
                </div>
                <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
            `;
            cartContainer.appendChild(itemElement);
            cartTotal += item.price * item.quantity;
        });

        // Display total cart value
        let totalElement = document.getElementById('cartTotal');
        totalElement.textContent = `Total: $${cartTotal.toFixed(2)}`;
    }
}

// Call loadCart when the page is loaded
document.addEventListener('DOMContentLoaded', loadCart);


// Update cart
function updateCart() {
    const cartItems = document.getElementById("cartitems");
    cartItems.innerHTML = ""; // Clear previous cart items
    totalPrice = 0;

    cart.forEach(cartItem => {
        const itemElement = document.createElement("li");
        itemElement.classList.add("cart-item", "booksize");

        itemElement.innerHTML = `
            <img src="${cartItem.image}" alt="${cartItem.title}" class="cart-item-image">
            <span>${cartItem.title}</span>
            <span>$${cartItem.price.toFixed(2)}</span>
            <input type="number" class="quantity" value="${cartItem.quantity}" min="1">
            <span>$${(cartItem.price * cartItem.quantity).toFixed(2)}</span>
            <button type="button" class="remove-btn">Remove</button>
        `;
        cartItems.appendChild(itemElement);

        const quantityInput = itemElement.querySelector(".quantity");
        quantityInput.addEventListener("change", function(event){
            const newQuantity = parseInt(event.target.value, 10);
            updateQuantity(cartItem.id, newQuantity);
        });

        const removeButton = itemElement.querySelector(".remove-btn");
        removeButton.addEventListener("click", function() {
            removeFromCart(cartItem.id);
        });

        totalPrice += cartItem.quantity * cartItem.price;
    });

    document.getElementById("subtotal").value = totalPrice.toFixed(2);
    total();
}

// Function to calculate total
// total() Function:
// Calculates and displays the subtotal and grand total immediately, including shipping costs if applicable.
// Use the change event to update totals dynamically.
function total() {
    totalPrice = 0; // Reset total price
    totalQuantity = 0; // Reset total quantity
    for (let x=0; x<cart.length; x++){
        const cartItem = cart[x];
        const quantity = cartItem.quantity || 0;
        const price = parseFloat(cartItem.price) || 0;
        totalPrice += quantity * price;
        totalQuantity += quantity;
    };
    if (totalQuantity > 0) {
        resultBox.value = `Total cost for ${totalQuantity} item(s): $${totalPrice.toFixed(2)}`;
    } else {
        resultBox.value = "Enter a valid quantity.";
    }
}

// Update quant
function updateQuantity(bookId, newQuantity) {
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id === bookId) {
            cart[i].quantity = parseInt(newQuantity);
            if (cart[i].quantity <= 0) {
                cart[i].quantity = 1; 
            }else if (isNaN(cart[i].quantity)) {
                cart[i].quantity = 1; 
            }
            break;
        }
    }
    updateCart();
}

// Remove from cart
function removeFromCart(bookId) {
    let updatedCart = [];
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id !== bookId) {
            updatedCart.push(cart[i]);
        }
    }
    cart = updatedCart;
    updateCart();
}


//new
document.addEventListener("DOMContentLoaded", function () {
    loadCartFromLocalStorage();
    updateCart();
});

function loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}








// Form Validation:
// Use e.preventDefault() to stop the form from submitting and keep the user on the same page.



// Event listeners
shipping.addEventListener("input", handleShipping);

// Function to handle product selection

let shippingCost = 0;
function handleShipping(event) {
    event.preventDefault();
    const selectedShipping = document.querySelector('input[name="shipping"]:checked').value;
    if (selectedShipping === 'Shipping'){
        shippingCost = 5;
    }else{
        shippingCost = 0;
    }
    ordersummary.innerHTML = `<p><strong>Subtotal:</strong> $${totalPrice.toFixed(2)}</p>
    <p><strong>Grand Total:</strong> $${(totalPrice + shippingCost).toFixed(2)}</p>`;
}

back.addEventListener("click", goBack);
function goBack(){
    shoppingCartPage.classList.remove('hidden');
    checkoutPage.classList.add('hidden');
    text = '';
    details = {};
    bookList.innerHTML = "";
    resetFilter();
}

function resetFilter() {
    genrefilter.value = ''; 
}


// Ensure no field is empty or null.
let text = '';
let details =[];
const formobj0 = document.forms[0];
formobj0.addEventListener("submit", function (event) {
    event.preventDefault();
    for (let i = 0; i < formobj0.elements.length -1; i++) {
        const element = formobj0.elements[i];
        console.log(element);

        if(element.type === 'button'){
            continue
        } else if (element.value === "" || element.value === null) {
            alert("Please enter a value for " + element.name);
            element.focus();
            element.style.backgroundColor = "#ffcccc";
            return;
        }else{

            cart.forEach(item => {
                //need to deal with multiple books
                /*
                details['producttitle'] = item.title;
                details['price'] = item.price.toFixed(2);
                details['quantity'] = item.quantity;
                details['subprice'] = (item.price * item.quantity).toFixed(2);
                */
            });
        }

    }

    totalPrice = 0;
    for (let x=0; x<cart.length; x++){
        const cartItem = cart[x];
        text += `
            <li class="cart-item booksize">
                <img src="${cartItem.image}" alt="${cartItem.title}" class="cart-item-image">
                <p><strong>Product: </strong>${cartItem.title}</p><br>
                <p><strong>Price: </strong>$${cartItem.price.toFixed(2)}</p><br>
                <p><strong>Quantity: </strong>${cartItem.quantity}</p><br>
                <p><strong>Total Price: </strong>$${(cartItem.price * cartItem.quantity).toFixed(2)}</p><br>
            </li>
        `;
        totalPrice += cartItem.quantity * cartItem.price;
    };
    
    shoppingCartPage.classList.add('hidden');
    checkoutPage.classList.remove('hidden');
    ordersummary.innerHTML = `<p><strong>Subtotal:</strong> $${totalPrice.toFixed(2)}</p>
    <p><strong>Grand Total:</strong> $${(totalPrice).toFixed(2)}</p>`;

});

// Validates all form fields:
// Ensure no field is empty or null.
// Validate the ZIP code (must contain exactly 5 digits).
const formobj1 = document.forms[1];
formobj1.addEventListener("submit", function (event) {
    event.preventDefault();
    for (let i = 0; i < formobj1.elements.length; i++) {
        const element = formobj1.elements[i];

        // Handle radio buttons
        if (element.type === "radio" && !element.checked) {
            continue;
        }
        // If validation fails:
        // Display an alert and indicate which element is empty or why it's invalid.
        // Use focus() and select() to highlight the invalid field.
        // Change the background color of the invalid field to red.
        if (element.value === "" || element.value === null) {
            alert("Please enter a value for " + element.name);
            element.focus();
            element.style.backgroundColor = "#ffcccc";
            return;
        
        }else if ((element.name === 'cardnumber' || element.name === 'zip' || element.name === 'phone' || element.name === 'securitycode') && isNaN(element.value)) {
            alert("The value of " + element.name + " must be a number.");
            element.focus();
            element.value='';
            element.style.backgroundColor = "#ffcccc";
            return;
        }
        // get value as it's valid
        else {
            if(element.name === 'cardnumber'){
                details[element.name] = `**********${element.value.slice(-4)}`;
            }else if(element.name === 'shipping'){
                details[element.name] = element.value;
                if(element.value === 'Shipping'){
                    details['shippingmessage'] = 'Your package should arrive in approximately 10 days!';
                }else{
                    details['shippingmessage'] = 'Pick up your order at 110 Main Street New York, NY!';
                }
            }
            else {
                details[element.name] = element.value;
            }
        }
    }
    receipt(details);
});


// receipt() Function:
// Triggered when the user clicks the "Checkout" button (<input type="submit" value="checkout">).
    // Receipt Display:
    // When validation passes, generate a receipt in a new HTML document:
    // Include details such as:
    // Customer information, Products purchased, Quantity, Current date, Subtotal and grand total.
    // Mask the credit card number, displaying only the last four digits (e.g., ************1234).
    function receipt(details) {
        const grandTotal = Math.max(totalPrice - discountAmount + shippingCost, 0); // Ensure total is not negative
        const receiptWindow = window.open();
        receiptWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Receipt</title>
            <link rel='stylesheet' href='macro6.css' />
        </head>
        <body>
            <header>
                <h1>Welcome to Virtual Volumes</h1>
                <p>Thank you for shopping with us!</p>
            </header>
            <main>
                <h2>Customer Receipt</h2>
                <h3>Thank you, ${details.firstName}, for your order!</h3>
                <p><strong>Date:</strong> ${new Date().toString()}</p>
                <div id="purchaseinfo">${text}</div>
                <div id="totals">
                    <p><strong>Subtotal:</strong> $${totalPrice.toFixed(2)}</p>
                    <p><strong>Discount:</strong> -$${discountAmount.toFixed(2)}</p>
                    <p><strong>Shipping:</strong> $${shippingCost.toFixed(2)}</p>
                    <p><strong>Grand Total:</strong> $${grandTotal.toFixed(2)}</p>
                </div>
                <hr>
                <div id="customer">
                    <p><strong>Name:</strong> ${details.firstName} ${details.lastName}</p>
                    <p><strong>Email:</strong> ${details.email}</p>
                    <p><strong>Phone:</strong> ${details.phone}</p>
                </div>
            </main>
        </body>
        </html>
        `);
        receiptWindow.document.close();
    }