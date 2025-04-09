<?php
session_start(); // Start the session at the top of the file

// Path to the users file (same as used for sign-up)
$usersFile = __DIR__ . '/users.json';

// Get form data
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$plainPassword = isset($_POST['password']) ? $_POST['password'] : '';

// Validate email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo "<script>alert('Incorrect email address/password'); window.location.href='sign-in.html';</script>";
    exit;
}

// Check if users file exists
if (!file_exists($usersFile)) {
    echo "<script>alert('Incorrect email address/password'); window.location.href='sign-in.html';</script>";
    exit;
}

// Load user data
$usersData = json_decode(file_get_contents($usersFile), true);
if (!is_array($usersData)) {
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

// If user not found or invalid credentials
if (!$userFound || !password_verify($plainPassword, $userFound['password'])) {
    echo "<script>alert('Incorrect email address/password'); window.location.href='sign-in.html';</script>";
    exit;
}

// Store the user's email in the session
$_SESSION['email'] = $email;

// Redirect to index.html
header("Location: index.php");
exit;
