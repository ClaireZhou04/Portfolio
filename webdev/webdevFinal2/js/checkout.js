document.addEventListener("DOMContentLoaded", function () {
    // Retrieve cart data and total price from localStorage
    const savedTotalPrice = parseFloat(localStorage.getItem("totalPrice")) || 0;

    // Update the subtotal hidden field
    const subtotalInput = document.querySelector("#subtotal");
    subtotalInput.value = savedTotalPrice.toFixed(2); // Set the subtotal value
    console.log("Subtotal set to:", subtotalInput.value);

    // Optionally, update order summary
    const orderSummary = document.querySelector("#ordersummary");
    orderSummary.innerHTML = `
        <p><strong>Subtotal:</strong> $${savedTotalPrice.toFixed(2)}</p>
        <p><strong>Shipping:</strong> $0.00</p>
        <p><strong>Total:</strong> $${savedTotalPrice.toFixed(2)}</p>
    `;
});

document.addEventListener("DOMContentLoaded", function () {
    // Retrieve cart data and total price from localStorage
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const savedTotalPrice = parseFloat(localStorage.getItem("totalPrice")) || 0;

    // Update the subtotal hidden field
    const subtotalInput = document.querySelector("#subtotal");
    subtotalInput.value = savedTotalPrice.toFixed(2);

    // Call renderCartItems to display cart items
    renderCartItems(savedCart, savedTotalPrice);

    // Add form validation
    const checkoutForm = document.getElementById('checkoutForm');
    checkoutForm.addEventListener('submit', validateForm);
});

function renderCartItems(cart, totalPrice) {
    const cartContainer = document.querySelector("#cartItems");
    const orderSummary = document.querySelector("#ordersummary");
    const subtotalInput = document.querySelector("#subtotal");
    let shippingCost = 0;

    // Clear existing content
    cartContainer.innerHTML = "";
    orderSummary.innerHTML = "";

    // Check if the cart is empty
    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty.</p>";
        subtotalInput.value = "0.00";
        return;
    }

    // Display each cart item
    cart.forEach(item => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}" class="cart-item-image">
            <div class="cart-item-details">
                <h3>${item.title}</h3>
                <p>Price: $${item.price.toFixed(2)}</p>
                <p>Quantity: ${item.quantity}</p>
                <p><strong>Total:</strong> $${(item.price * item.quantity).toFixed(2)}</p>
            </div>
        `;
        cartContainer.appendChild(cartItem);
    });

    // Update subtotal input field
    subtotalInput.value = totalPrice.toFixed(2);

    // Display initial order summary
    orderSummary.innerHTML = `
        <p><strong>Subtotal:</strong> $${totalPrice.toFixed(2)}</p>
        <p><strong>Shipping:</strong> $${shippingCost.toFixed(2)}</p>
        <p><strong>Total:</strong> $${(totalPrice + shippingCost).toFixed(2)}</p>
    `;
    
    // Add event listener to shipping method selection
    const shippingOptions = document.querySelectorAll('input[name="shipping"]');
    shippingOptions.forEach(option => {
        option.addEventListener("change", function () {
            // Update shipping cost based on selection
            shippingCost = option.value === "Shipping" ? 5 : 0;

            // Update order summary dynamically
            orderSummary.innerHTML = `
                <p><strong>Subtotal:</strong> $${totalPrice.toFixed(2)}</p>
                <p><strong>Shipping:</strong> $${shippingCost.toFixed(2)}</p>
                <p><strong>Total:</strong> $${(totalPrice + shippingCost).toFixed(2)}</p>
            `;
        });
    });
}

// Form Validation Functions
function validateEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
}

function validatePhoneNumber(phone) {
    const re = /^\d{3}-\d{3}-\d{4}$/;
    return re.test(phone);
}

function validateCreditCard(cardNumber) {
    // Remove spaces and dashes
    const cleanedNumber = cardNumber.replace(/[\s-]/g, '');
    
    // Basic length check for different card types
    const cardTypeToLength = {
        'Amex': [16],
        'Visa': [16],
        'Other': [16]
    };

    const selectedCardType = document.querySelector('input[name="creditCard"]:checked').value;
    return cardTypeToLength[selectedCardType].includes(cleanedNumber.length);
}

function validateExpirationDate(expiration) {
    if (!expiration) return false;
    
    const currentDate = new Date();
    const [inputYear, inputMonth] = expiration.split('-').map(Number);
    
    return (
        inputYear > currentDate.getFullYear() || 
        (inputYear === currentDate.getFullYear() && inputMonth >= currentDate.getMonth() + 1)
    );
}

function validateCVV(cvv) {
    return /^\d{3,4}$/.test(cvv);
}

function validateForm(event) {
    event.preventDefault();
    let isValid = true;
    let errorMessage = '';

    // Validate Customer Information
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const street = document.getElementById('street').value.trim();
    const city = document.getElementById('city').value.trim();
    const state = document.getElementById('state').value.trim();
    const zip = document.getElementById('zip').value.trim();
    const country = document.getElementById('country').value.trim();

    // Validate Contact Information
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();

    // Validate Payment Information
    const cardName = document.getElementById('cardname').value.trim();
    const cardNumber = document.getElementById('cardnumber').value.trim();
    const expiration = document.getElementById('expiration').value;
    const securityCode = document.getElementById('securitycode').value.trim();

    // Validate Cart
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    
    if (!securityCode || !validateCVV(securityCode)) {
        errorMessage = "Please enter a valid CVV.\n";
        isValid = false;
    }
    if (!expiration || !validateExpirationDate(expiration)) {
        errorMessage = "Please enter a valid expiration date.\n";
        isValid = false;
    }
    if (!cardNumber || !validateCreditCard(cardNumber)) {
        errorMessage = "Please enter a valid 16-digit credit card number.\n";
        isValid = false;
    }
    if (!cardName) {
        errorMessage = "Please enter the name on the card.\n";
        isValid = false;
    }
    if (!phone || !validatePhoneNumber(phone)) {
        errorMessage = "Please enter a valid phone number (format: 000-000-0000).\n";
        isValid = false;
    }
    if (!email || !validateEmail(email)) {
        errorMessage = "Please enter a valid email address.\n";
        isValid = false;
    }
    if (!country) {
        errorMessage = "Please enter your country.\n";
        isValid = false;
    }
    if (!zip || zip.length !== 5 || !/^\d{5}$/.test(zip)) {
        errorMessage = "Please enter a valid 5-digit ZIP code.\n";
        isValid = false;
    }
    if (!state) {
        errorMessage += "Please enter your state.\n";
        isValid = false;
    }
    if (!city) {
        errorMessage = "Please enter your city.\n";
        isValid = false;
    }
    if (!street) {
        errorMessage = "Please enter your street address.\n";
        isValid = false;
    }
    if (!lastName) {
        errorMessage = "Please enter your last name.\n";
        isValid = false;
    }
    if (!firstName) {
        errorMessage = "Please enter your first name.\n";
        isValid = false;
    }
    if (savedCart.length === 0) {
        errorMessage += "Your cart is empty. Please add items before checking out.\n";
        isValid = false;
    }
    // If all validations pass, submit the form
    if (isValid) {
        // You might want to add additional processing here if needed
        event.target.submit();
    } else {
        // Display error messages
        alert(errorMessage);
    }
}