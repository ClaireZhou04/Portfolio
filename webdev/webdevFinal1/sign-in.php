<?php
// Path to the users file (same as used for sign-up)
$usersFile = __DIR__ . '/users.json';

// Get form data
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$plainPassword = isset($_POST['password']) ? $_POST['password'] : '';

// Validate email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    // Incorrect email format: show alert and go back
    echo "<script>alert('Incorrect email address/password'); window.location.href='sign-in.html';</script>";
    exit;
}

// Check if users file exists
if (!file_exists($usersFile)) {
    // No users signed up yet
    echo "<script>alert('Incorrect email address/password'); window.location.href='sign-in.html';</script>";
    exit;
}

// Load user data
$usersData = json_decode(file_get_contents($usersFile), true);
if (!is_array($usersData)) {
    // User data not in expected format
    echo "<script>alert('Incorrect email address/password'); window.location.href='sign-in.html';</script>";
    exit;
}

// Find the user by email
$userFound = null;
foreach ($usersData as $user) {
    if (isset($user['email']) && $user['email'] === $email) {
        $userFound = $user;
        break;
    }
}

// If user not found or user data is invalid
if (!$userFound) {
    echo "<script>alert('Incorrect email address/password'); window.location.href='sign-in.html';</script>";
    exit;
}

// Verify password
if (password_verify($plainPassword, $userFound['password'])) {
    // Success: Show success message and redirect after 2 seconds
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
        <title>Sign In Successful</title>
    </head>
    <body>
        <p class='success-message'>Sign-in successful! Redirecting...</p>
        <script>setTimeout(function(){ window.location.href = 'index.html'; }, 2000);</script>
    </body>
    </html>";
} else {
    // Incorrect password
    echo "<script>alert('Incorrect email address/password'); window.location.href='sign-in.html';</script>";
    exit;
}
