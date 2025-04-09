document.addEventListener('DOMContentLoaded', function () {
    const shirtQuantity = document.getElementById('shirtQuantity');
    const jeansQuantity = document.getElementById('jeansQuantity');
    const shippingOptions = document.getElementsByName('shipping');
    const subtotalEl = document.getElementById('subtotal');
    const shippingCostEl = document.getElementById('shippingCost');
    const grandTotalEl = document.getElementById('grandTotal');
    const form = document.getElementById('shoppingCartForm');
    const shirtPrice = 35;
    const jeansPrice = 50;
    const shippingFee = 10;

   
    const updateTotals = () => {
        const shirtTotal = shirtQuantity.value * shirtPrice;
        const jeansTotal = jeansQuantity.value * jeansPrice;
        const subtotal = shirtTotal + jeansTotal;

        let shippingCost = 0;
        if (document.getElementById('shipping').checked) {
            shippingCost = shippingFee;
        }

        const grandTotal = subtotal + shippingCost;

  
        subtotalEl.textContent = subtotal.toFixed(2);
        shippingCostEl.textContent = shippingCost.toFixed(2);
        grandTotalEl.textContent = grandTotal.toFixed(2);
    };


    shirtQuantity.addEventListener('change', updateTotals);
    jeansQuantity.addEventListener('change', updateTotals);
    shippingOptions.forEach(option => option.addEventListener('change', updateTotals));


    form.addEventListener('submit', function (e) {
        e.preventDefault();

 
        const name = document.getElementById('name');
        const address = document.getElementById('address');
        const email = document.getElementById('email');
        const phone = document.getElementById('phone');
        const zip = document.getElementById('zip');
        const creditCard = document.getElementById('creditCard');
        const expiration = document.getElementById('expiration');

        if (!name.value || !address.value || !email.value || !phone.value || !zip.value || !creditCard.value || !expiration.value) {
            alert('Please fill out all fields.');
            return;
        }

        if (!/^\d{5}$/.test(zip.value)) {
            alert('ZIP code must be exactly 5 digits.');
            zip.focus();
            return;
        }

 
        const lastFourDigits = creditCard.value.slice(-4);
        const receiptWindow = window.open('', 'Receipt', 'width=600,height=400');
        receiptWindow.document.write(`
            <h1>Order Receipt</h1>
            <p>Name: ${name.value}</p>
            <p>Address: ${address.value}</p>
            <p>Email: ${email.value}</p>
            <p>Phone: ${phone.value}</p>
            <p>Products Purchased:</p>
            <ul>
                <li>T-Shirt: ${shirtQuantity.value} @ $${shirtPrice}</li>
                <li>Jeans: ${jeansQuantity.value} @ $${jeansPrice}</li>
            </ul>
            <p>Subtotal: $${subtotalEl.textContent}</p>
            <p>Shipping: $${shippingCostEl.textContent}</p>
            <p>Grand Total: $${grandTotalEl.textContent}</p>
            <p>Credit Card: ************${lastFourDigits}</p>
            <p>Date: ${new Date().toLocaleString()}</p>
        `);
    });


    document.getElementById('resetBtn').addEventListener('click', function () {
        form.reset();
        updateTotals();
    });
});
