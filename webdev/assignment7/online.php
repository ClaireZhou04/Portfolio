<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve form data and sanitize inputs
    $shirtQuantity = isset($_POST['shirtQuantity']) ? intval($_POST['shirtQuantity']) : 0;
    $jeansQuantity = isset($_POST['jeansQuantity']) ? intval($_POST['jeansQuantity']) : 0;
    $name = isset($_POST['name']) ? htmlspecialchars($_POST['name']) : '';
    $address = isset($_POST['address']) ? htmlspecialchars($_POST['address']) : '';
    $email = isset($_POST['email']) ? htmlspecialchars($_POST['email']) : '';
    $phone = isset($_POST['phone']) ? htmlspecialchars($_POST['phone']) : '';
    $zip = isset($_POST['zip']) ? htmlspecialchars($_POST['zip']) : '';
    $shippingMethod = isset($_POST['shipping']) ? htmlspecialchars($_POST['shipping']) : '';
    $creditCard = isset($_POST['creditCard']) ? htmlspecialchars($_POST['creditCard']) : '';
    $expiration = isset($_POST['expiration']) ? htmlspecialchars($_POST['expiration']) : '';

    $shirtPrice = 35.00;
    $jeansPrice = 50.00;
    $shippingCost = ($shippingMethod === 'Shipping') ? 10.00 : 0.00;

$subtotal = ($shirtQuantity * $shirtPrice) + ($jeansQuantity * $jeansPrice);
    $grandTotal = $subtotal + $shippingCost;

    $orderData = "Name: $name\nAddress: $address\nEmail: $email\nPhone: $phone\nZIP Code: $zip\n" .
                 "T-Shirt Quantity: $shirtQuantity\nJeans Quantity: $jeansQuantity\n" .
                 "Subtotal: $subtotal\nShipping: $shippingMethod\nShipping Cost: $shippingCost\n" .
                 "Grand Total: $grandTotal\nPayment Info: Credit Card ending in " . substr($creditCard, -4) . "\n\n";

    $fileWriteSuccess = file_put_contents("store.txt", $orderData, FILE_APPEND);
    if ($fileWriteSuccess === false) {
        die("Error: Unable to save order to file. Please check file permissions.");
    }

    echo "<!DOCTYPE html>
    <html lang='en'>
    <head>
        <meta charset='UTF-8'>
        <meta name='viewport' content='width=device-width, initial-scale=1.0'>
        <title>Receipt</title>
        <link rel='stylesheet' href='style.css'>
    </head>
    <body>
        <h1>Order Receipt</h1>
        <h2>Thank you for shopping with Claire's Online Clothes Store!</h2>
        <p><strong>Name:</strong> $name</p>
        <p><strong>Address:</strong> $address</p>
        <p><strong>Email:</strong> $email</p>
        <p><strong>Phone:</strong> $phone</p>
        <p><strong>ZIP Code:</strong> $zip</p>
        <h3>Order Summary</h3>
        <p><strong>T-Shirts:</strong> $shirtQuantity x $$shirtPrice = $" . number_format($shirtQuantity * $shirtPrice, 2) . "</p>
        <p><strong>Jeans:</strong> $jeansQuantity x $$jeansPrice = $" . number_format($jeansQuantity * $jeansPrice, 2) . "</p>
        <p><strong>Subtotal:</strong> $" . number_format($subtotal, 2) . "</p>
        <p><strong>Shipping Method:</strong> $shippingMethod</p>
        <p><strong>Shipping Cost:</strong> $" . number_format($shippingCost, 2) . "</p>
        <p><strong>Grand Total:</strong> $" . number_format($grandTotal, 2) . "</p>
        <h3>Payment Information</h3>
        <p>Credit Card ending in: " . substr($creditCard, -4) . "</p>
    </body>
    <footer>Produced by Claire Zhou</footer>
    </html>";
} else {
    
    echo "<!DOCTYPE html>
    <html lang='en'>
    <head>
        <meta charset='UTF-8'>
        <meta name='viewport' content='width=device-width, initial-scale=1.0'>
        <title>Error</title>
    </head>
    <body>
        <h1>Error</h1>
        <p>This script can only be accessed through a valid form submission.</p>
    </body>
    </html>";
}
?>
