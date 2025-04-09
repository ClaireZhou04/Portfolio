<?php
// Path to the users file
$usersFile = __DIR__ . '/users.json';

// Get form data
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$plainPassword = isset($_POST['password']) ? $_POST['password'] : '';

// Validate email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo "<script>
        alert('Invalid email address. Please try again.');
        window.location.href='sign-up.html';
    </script>";
    exit;
}

// Validate password length
if (strlen($plainPassword) < 4 || strlen($plainPassword) > 10) {
    echo "<script>
        alert('Password must be between 4 to 10 characters. Please try again.');
        window.location.href='sign-up.html';
    </script>";
    exit;
}

// Load existing users
if (!file_exists($usersFile)) {
    file_put_contents($usersFile, json_encode([])); // Create file if it doesn't exist
}

$usersData = json_decode(file_get_contents($usersFile), true);
if (!is_array($usersData)) {
    $usersData = []; // Reset to an empty array if JSON decoding fails
}

// Check if user already exists
foreach ($usersData as $user) {
    if (isset($user['email']) && $user['email'] === $email) {
        echo "<script>
            alert('Email is already in use. Please use a different email.');
            window.location.href='sign-up.html';
        </script>";
        exit;
    }
}

// Hash the password
$hashedPassword = password_hash($plainPassword, PASSWORD_BCRYPT);

// Append new user
$usersData[] = [
    'email' => $email,
    'password' => $hashedPassword,
    'created_at' => date('c') // ISO 8601 date for reference
];

// Save back to file
file_put_contents($usersFile, json_encode($usersData, JSON_PRETTY_PRINT));

// Successful account creation with redirect
echo "<!doctype html>
<html lang='en'>
<head>
    <meta charset='utf-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
    <link href='css/bootstrap.min.css' rel='stylesheet'>
    <link href='css/bootstrap-icons.css' rel='stylesheet'>
    <link rel='stylesheet' href='css/slick.css'/>
    <link href='css/tooplate-little-fashion.css' rel='stylesheet'>
    <link href='css/custom-messages.css' rel='stylesheet'>
    <title>Sign Up Successful</title>
</head>
<body>
    <p class='success-message'>Your account has been successfully created! Redirecting to sign in page...</p>
    <script>
        setTimeout(function() {
            window.location.href = 'sign-in.html';
        }, 2000); // Redirects after 2 seconds
    </script>
</body>
</html>";
