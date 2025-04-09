<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $query = isset($_GET['q']) ? strtolower(trim($_GET['q'])) : '';

    if (!isset($_SESSION['search_history'])) {
        $_SESSION['search_history'] = [];
    }

    if ($query !== '') {
        if (!in_array($query, $_SESSION['search_history'])) {
            $_SESSION['search_history'][] = $query;
        }
    }

    header('Content-Type: application/json');
    echo json_encode(array_values($_SESSION['search_history']));
    exit;
}
?>
