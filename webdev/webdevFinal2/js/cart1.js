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
    saveCartToLocalStorage();
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
    saveCartToLocalStorage();
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


let text = '';
let details =[];
const formobj0 = document.forms[0];
formobj0.addEventListener("submit", function (event) {
    if (cart.length < 1) {
        event.preventDefault(); // Prevent form submission
        alert("Please place an item in the cart before checking out.");
        return;
    }
    for (let i = 0; i < formobj0.elements.length - 1; i++) {
        const element = formobj0.elements[i];

        if (element.type === 'button') {
            continue;
        } else if (element.value === "" || element.value === null) {
            event.preventDefault(); // Prevent form submission
            alert("Please enter a value for " + element.name);
            element.focus();
            element.style.backgroundColor = "#ffcccc";
            return;
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

});

function saveCartToLocalStorage() {
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("totalPrice", totalPrice.toFixed(2));  // Save the total price as well
    console.log(totalPrice);

}
