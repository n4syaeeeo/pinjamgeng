<?php
// Temporary helper for taking genuine poster screenshots
require_once __DIR__ . '/config/db.php';
require_once __DIR__ . '/config/auth.php';

$role = $_GET['role'] ?? 'student';
$redirect = $_GET['redirect'] ?? '/user/dashboard.php';

if ($role === 'admin') {
    $stmt = $pdo->query("SELECT * FROM users WHERE role = 'admin' LIMIT 1");
    $user = $stmt->fetch();
} else {
    $stmt = $pdo->query("SELECT * FROM users WHERE matric_staff_id = 'AM2412018113' LIMIT 1");
    $user = $stmt->fetch();
    if (!$user) {
        $stmt = $pdo->query("SELECT * FROM users WHERE role = 'user' LIMIT 1");
        $user = $stmt->fetch();
    }
}

if ($user) {
    $_SESSION['user_id'] = $user['id'];
    $_SESSION['user_name'] = $user['full_name'];
    $_SESSION['user_email'] = $user['email'];
    $_SESSION['matric_id'] = $user['matric_staff_id'];
    $_SESSION['user_role'] = $user['role'];
    $_SESSION['user_type'] = $user['user_type'];
    $_SESSION['user_department'] = $user['faculty_department'];
    $_SESSION['user_phone'] = $user['phone'];
}

header("Location: " . $redirect);
exit;
