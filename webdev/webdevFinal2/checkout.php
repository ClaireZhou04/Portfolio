<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);


// Initialize variables
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

$subtotal = isset($_POST['subtotal']) && is_numeric($_POST['subtotal']) ? floatval($_POST['subtotal']) : 0.0;
$shippingCost = ($shippingMethod == 'Shipping') ? 5 : 0;
$total = $subtotal + $shippingCost;

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Receipt</title>
    <!-- CSS FILES -->
    <link rel="preconnect" href="https://fonts.googleapis.com">

    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;300;400;700;900&display=swap" rel="stylesheet">

    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="css/bootstrap-icons.css" rel="stylesheet">
    <link href="css/shoppingcart.css" rel="stylesheet">

    <link rel="stylesheet" href="css/slick.css"/>

    <link href="css/tooplate-little-fashion.css" rel="stylesheet">

    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
            padding: 0;
            background-color: #f7f7f7;
        }
        h1, h2, h4 {
            text-align: center;
        }
        .receipt {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            background: #fff;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .receipt p {
            margin: 0 0 10px;
            line-height: 1.5;
        }
        .receipt .total {
            font-size: 18px;
            font-weight: bold;
        }
        .section {
            margin-bottom: 20px;
        }
    </style>
</head>
<body>
    <main>

        <nav class="navbar navbar-expand-lg">
                <div class="container">
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <a class="navbar-brand" href="index.php">
                        <strong><span>Virtual</span>Volumes</strong>
                    </a>

                    <div class="d-lg-none">
                        <!-- <a href="sign-in.html" class="bi-person custom-icon me-3"></a> -->

                        <a href="cart.html" class="bi-bag custom-icon"></a>
                    </div>

                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav mx-auto">
                            <li class="nav-item">
                                <a class="nav-link" href="index.php">Home</a>
                            </li>

                            <li class="nav-item">
                                <a class="nav-link" href="about.html">Story</a>
                            </li>

                            <li class="nav-item">
                                <a class="nav-link" href="products.html">Products</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="game.html">Game</a>
                            </li>

                        </ul>

                        <div class="d-none d-lg-block">
                            <!-- <a href="sign-in.html" class="bi-person custom-icon me-3"></a> -->

                            <a href="cart.html" class="bi-bag custom-icon"></a>
                        </div>
                    </div>
                </div>
            </nav>

            <section class="cart-items section-padding-med">
                <div class="container">
                    <h2>Your Receipt</h2>
                </div>
            </section>
            

            <section class="product-detail section-padding-xsmallt">
                <div class="container">
                    <div class="row">

   
                    <div class="receipt">

                        <div class="section">
                            <h4>Customer Information</h4>
                            <p><strong>Name:</strong> <?php echo htmlspecialchars($firstName . ' ' . $lastName); ?></p>
                            <p><strong>Email:</strong> <?php echo htmlspecialchars($email); ?></p>
                            <p><strong>Phone:</strong> <?php echo htmlspecialchars($phone); ?></p>
                        </div>

                        <div class="section">
                            <h4>Shipping Address</h4>
                            <p><?php echo htmlspecialchars($street); ?></p>
                            <p><?php echo htmlspecialchars($city . ', ' . $state . ' ' . $zip); ?></p>
                            <p><?php echo htmlspecialchars($country); ?></p>
                        </div>

                        <div class="section">
                            <h4>Payment Information</h4>
                            <p><strong>Credit Card Type:</strong> <?php echo htmlspecialchars($creditCard); ?></p>
                            <p><strong>Card Number:</strong> **** **** **** <?php echo substr($cardNumber, -4); ?></p>
                            <p><strong>Expiration Date:</strong> <?php echo htmlspecialchars($expiration); ?></p>
                        </div>

                        <div class="section">
                            <h4>Order Summary</h4>
                            <p><strong>Subtotal:</strong> $<?php echo number_format($subtotal, 2); ?></p>
                            <p><strong>Shipping:</strong> $<?php echo number_format($shippingCost, 2); ?></p>
                            <p class="total"><strong>Total:</strong> $<?php echo number_format($total, 2); ?></p>
                        </div>
                    </div>
                    </div>
                </div>
            </section>      
    </main>

        <footer class="site-footer">
            <div class="container">
                <div class="row">

                    <div class="col-lg-3 col-10 me-auto mb-4">
                        <h4 class="text-white mb-3"><a href="index.php">Virtual</a>Volumes</h4>
                        <p class="copyright-text text-muted mt-lg-5 mb-4 mb-lg-0">Copyright © 2024 <strong>Virtual Volumes</strong></p>
                        <br>
                        <p class="copyright-text">Template: <a href="https://www.tooplate.com/" target="_blank">Tooplate</a></p>
                    </div>

                    <div class="col-lg-5 col-8">
                        <h5 class="text-white mb-3">Sitemap</h5>

                        <ul class="footer-menu d-flex flex-wrap">
                            <li class="footer-menu-item"><a href="about.html" class="footer-menu-link">Story</a></li>

                            <li class="footer-menu-item"><a href="products.html" class="footer-menu-link">Products</a></li>

                            <li class="footer-menu-item"><a href="game.html" class="footer-menu-link">Game</a></li>
                        </ul>
                    </div>

                    <div class="col-lg-3 col-4">
                        <h5 class="text-white mb-3">Social</h5>

                        <ul class="social-icon">

                            <li><a href="https://www.youtube.com/watch?v=uq4BmvitXSc" class="social-icon-link bi-youtube"></a></li>

                            <li><a href="https://www.instagram.com/strandbookstore/" class="social-icon-link bi-instagram"></a></li>
                        </ul>
                    </div>

                </div>
            </div>
        </footer>

</body>
</html>
