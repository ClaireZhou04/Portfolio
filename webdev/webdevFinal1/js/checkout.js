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

document.addEventListener("DOMContentLoaded", function () {
    // Retrieve cart and totalPrice from localStorage
    const savedCart = localStorage.getItem("cart");
    const savedTotalPrice = localStorage.getItem("totalPrice");
    console.log(savedTotalPrice);

    if (savedCart) {
        cart = JSON.parse(savedCart);  // Parse the cart data
        totalPrice = parseFloat(savedTotalPrice);  // Retrieve and parse the total price
    }

    updateCheckoutPage(); 
});

function updateCheckoutPage() {
    const subtotalInput = document.querySelector("#subtotal");
    const resultBox = document.querySelector("#result");

    if (cart && cart.length > 0) {
        subtotalInput.value = totalPrice.toFixed(2);  // Display the subtotal
        resultBox.value = `Subtotal: $${totalPrice.toFixed(2)}`;

        // Optionally update any other parts of the checkout page
        ordersummary.innerHTML = `<p><strong>Subtotal:</strong> $${totalPrice.toFixed(2)}</p>
            <p><strong>Grand Total:</strong> $${(totalPrice + shippingCost).toFixed(2)}</p>`;
    }
}

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

function resetFilter() {
    genrefilter.value = ''; 
}


// Ensure no field is empty or null.
let text = '';
let details =[];
// Validates all form fields:
// Ensure no field is empty or null.
// Validate the ZIP code (must contain exactly 5 digits).
const formobj1 = document.forms[0];
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
});
