<?php
// Authentication & Session Management
// Smart Event Equipment Booking and Inventory Management System (UPTM)

if (session_status() === PHP_SESSION_NONE) {
    // Configure secure session cookie parameters
    session_set_cookie_params([
        'lifetime' => 0,
        'path' => '/',
        'domain' => '',
        'secure' => false, // Set to true if running over HTTPS in production
        'httponly' => true, // Prevents JavaScript XSS theft of session cookie
        'samesite' => 'Lax'
    ]);
    session_start();
}

/**
 * Check if a user is currently logged in
 */
function isLoggedIn(): bool {
    return isset($_SESSION['user_id']) && !empty($_SESSION['user_id']);
}

/**
 * Check if the currently logged in user has admin role
 */
function isAdmin(): bool {
    return isLoggedIn() && isset($_SESSION['user_role']) && $_SESSION['user_role'] === 'admin';
}

/**
 * Get the current logged-in user array or null
 */
function currentUser(): ?array {
    if (!isLoggedIn()) {
        return null;
    }
    return [
        'id' => $_SESSION['user_id'],
        'name' => $_SESSION['user_name'] ?? 'User',
        'matric_id' => $_SESSION['matric_id'] ?? '',
        'email' => $_SESSION['user_email'] ?? '',
        'phone' => $_SESSION['user_phone'] ?? '',
        'role' => $_SESSION['user_role'] ?? 'user',
        'user_type' => $_SESSION['user_type'] ?? 'student',
        'department' => $_SESSION['user_department'] ?? 'Faculty of Computing & Multimedia'
    ];
}

/**
 * Require user login or redirect to login page
 */
function requireLogin(?string $redirectPath = null): void {
    if (!isLoggedIn()) {
        $_SESSION['flash_error'] = "Please log in to access this page.";
        $target = $redirectPath ?: base_url('login.php');
        header("Location: {$target}");
        exit;
    }
}

/**
 * Require admin access or redirect with error
 */
function requireAdmin(?string $redirectPath = null): void {
    requireLogin();
    if (!isAdmin()) {
        $_SESSION['flash_error'] = "Access denied. Administrator privileges required.";
        $target = $redirectPath ?: base_url('user/dashboard.php');
        header("Location: {$target}");
        exit;
    }
}

/**
 * Establish user session on login
 * Hardened with session_regenerate_id to protect against Session Fixation attacks
 */
function loginUser(array $user): void {
    // Regenerate session ID and delete old session file
    session_regenerate_id(true);

    $_SESSION['user_id'] = $user['id'];
    $_SESSION['user_name'] = $user['full_name'];
    $_SESSION['matric_id'] = $user['matric_staff_id'];
    $_SESSION['user_email'] = $user['email'];
    $_SESSION['user_phone'] = $user['phone'];
    $_SESSION['user_role'] = $user['role'];
    $_SESSION['user_type'] = $user['user_type'];
    $_SESSION['user_department'] = $user['faculty_department'];

    // Clear failed login tracking on success
    clearFailedLogins();
}

/**
 * Destroy user session on logout
 */
function logoutUser(): void {
    $_SESSION = [];
    if (ini_get("session.use_cookies")) {
        $params = session_get_cookie_params();
        setcookie(session_name(), '', time() - 42000,
            $params["path"], $params["domain"],
            $params["secure"], $params["httponly"]
        );
    }
    session_destroy();
}

/* ==========================================================================
   SECURITY HARDENING: Anti-CSRF Tokens
   ========================================================================== */

/**
 * Generate or retrieve current CSRF token
 */
function csrfToken(): string {
    if (empty($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf_token'];
}

/**
 * Verify submitted CSRF token using timing attack safe comparison
 */
function verifyCsrfToken(?string $token): bool {
    if (empty($token) || empty($_SESSION['csrf_token'])) {
        return false;
    }
    return hash_equals($_SESSION['csrf_token'], $token);
}

/**
 * Output hidden CSRF input field for forms
 */
function csrfField(): string {
    return '<input type="hidden" name="csrf_token" value="' . htmlspecialchars(csrfToken(), ENT_QUOTES, 'UTF-8') . '">';
}

/* ==========================================================================
   SECURITY HARDENING: Brute-Force Protection & Rate Limiting
   ========================================================================== */

const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_DURATION_SECONDS = 300; // 5 minutes

/**
 * Check if the current user session is locked due to too many failed attempts
 */
function isLoginLocked(): bool {
    if (isset($_SESSION['lockout_until'])) {
        if (time() < $_SESSION['lockout_until']) {
            return true;
        } else {
            // Lockout period expired
            clearFailedLogins();
            return false;
        }
    }
    return false;
}

/**
 * Get remaining lockout time in seconds
 */
function getRemainingLockoutSeconds(): int {
    if (isLoginLocked()) {
        return max(0, $_SESSION['lockout_until'] - time());
    }
    return 0;
}

/**
 * Record a failed login attempt and trigger lockout if limit reached
 */
function recordFailedLogin(): int {
    $_SESSION['failed_attempts'] = ($_SESSION['failed_attempts'] ?? 0) + 1;
    
    if ($_SESSION['failed_attempts'] >= MAX_LOGIN_ATTEMPTS) {
        $_SESSION['lockout_until'] = time() + LOCKOUT_DURATION_SECONDS;
    }
    return $_SESSION['failed_attempts'];
}

/**
 * Get current failed attempts count
 */
function getFailedAttempts(): int {
    return $_SESSION['failed_attempts'] ?? 0;
}

/**
 * Clear failed attempts counter
 */
function clearFailedLogins(): void {
    unset($_SESSION['failed_attempts'], $_SESSION['lockout_until']);
}
