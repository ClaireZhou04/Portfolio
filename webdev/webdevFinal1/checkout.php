
<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$firstName = $lastName = $street = $city = $state = $zip = $country = '';
$email = $phone = $creditCard = $cardName = $cardNumber = $expiration = $securityCode = '';
$shippingMethod = $subtotal = 0;
$shippingCost = 0;

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Capture form data using POST method
    $firstName = $_POST['firstName'] ?? '';
    $lastName = $_POST['lastName'] ?? '';
    $street = $_POST['street'] ?? '';
    $city = $_POST['city'] ?? '';
    $state = $_POST['state'] ?? '';
    $zip = $_POST['zip'] ?? '';
    $country = $_POST['country'] ?? '';
    $email = $_POST['email'] ?? '';
    $phone = $_POST['phone'] ?? '';
    $creditCard = $_POST['creditCard'] ?? '';
    $cardName = $_POST['cardname'] ?? '';
    $cardNumber = $_POST['cardnumber'] ?? '';
    $expiration = $_POST['expiration'] ?? '';
    $securityCode = $_POST['securitycode'] ?? '';
    $shippingMethod = $_POST['shipping'] ?? '';
    
    $subtotal = isset($_POST['subtotal']) ? floatval($_POST['subtotal']) : 0.0; 
    $shippingCost = ($shippingMethod == 'Shipping') ? 5 : 0;
    $total = $subtotal + $shippingCost;
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Receipt</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
            padding: 0;
        }
        h1, h2 {
            text-align: center;
        }
        .receipt {
            max-width: 600px;
            margin: 0 auto;
            border: 1px solid #ddd;
            padding: 20px;
            background-color: #f9f9f9;
        }
        .receipt p {
            font-size: 14px;
        }
        .receipt .total {
            font-weight: bold;
        }
        .receipt .address, .receipt .order-summary {
            margin-bottom: 20px;
        }
    </style>
</head>
<body>

    <div class="receipt">
        <h1>Order Receipt</h1>
        
        <div class="customer-info">
            <h2>Customer Information</h2>
            <p><strong>Name:</strong> <?php echo htmlspecialchars($firstName . ' ' . $lastName); ?></p>
            <p><strong>Email:</strong> <?php echo htmlspecialchars($email); ?></p>
            <p><strong>Phone:</strong> <?php echo htmlspecialchars($phone); ?></p>
        </div>

        <div class="address">
            <h2>Shipping Address</h2>
            <p><?php echo htmlspecialchars($street); ?></p>
            <p><?php echo htmlspecialchars($city . ', ' . $state . ' ' . $zip); ?></p>
            <p><?php echo htmlspecialchars($country); ?></p>
        </div>

        <div class="payment-info">
            <h2>Payment Information</h2>
            <p><strong>Credit Card Type:</strong> <?php echo htmlspecialchars($creditCard); ?></p>
            <p><strong>Card Number:</strong> **** **** **** <?php echo substr($cardNumber, -4); ?></p>
            <p><strong>Expiration Date:</strong> <?php echo htmlspecialchars($expiration); ?></p>
        </div>

        <div class="order-summary">
            <h2>Order Summary</h2>
            <p><strong>Subtotal:</strong> $<?php echo number_format($subtotal, 2); ?></p>
            <p><strong>Shipping:</strong> $<?php echo number_format($shippingCost, 2); ?></p>
            <p class="total"><strong>Total:</strong> $<?php echo number_format($total, 2); ?></p>
        </div>
    </div>

</body>
</html>
