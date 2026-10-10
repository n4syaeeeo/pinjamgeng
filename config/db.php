<?php
// Database Connection Configuration
// Smart Event Equipment Booking and Inventory Management System (UPTM)

// Set environment: 'development' (Local XAMPP) or 'production' (Cloud / InfinityFree)
// When uploading to InfinityFree or cPanel, change 'development' to 'production'
if (!defined('APP_ENV')) {
    define('APP_ENV', getenv('APP_ENV') ?: 'development');
}

if (APP_ENV === 'production') {
    // ==========================================
    // CLOUD HOSTING CREDENTIALS (INFINITYFREE / CPANEL)
    // Replace these values with the details provided in your InfinityFree control panel:
    // ==========================================
    $db_host = 'sqlXXX.infinityfree.com'; // e.g. sql208.infinityfree.com
    $db_port = 3306;
    $db_name = 'epiz_XXXXXXX_smart_equipment'; // e.g. epiz_34567890_pinjamgeng
    $db_user = 'epiz_XXXXXXX';                 // e.g. epiz_34567890
    $db_pass = 'YOUR_CPANEL_PASSWORD';         // your vPanel account password
} else {
    // ==========================================
    // LOCAL XAMPP ENVIRONMENT
    // ==========================================
    $db_host = '127.0.0.1';
    $db_port = 3307; // Configured for XAMPP MariaDB port
    $db_name = 'smart_equipment_db';
    $db_user = 'root';
    $db_pass = '';
}

try {
    $dsn = "mysql:host={$db_host};port={$db_port};dbname={$db_name};charset=utf8mb4";
    $pdo = new PDO($dsn, $db_user, $db_pass, [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ]);
} catch (PDOException $e) {
    if (APP_ENV === 'development') {
        // Fallback attempt on port 3306 in local development
        try {
            $dsn = "mysql:host={$db_host};port=3306;dbname={$db_name};charset=utf8mb4";
            $pdo = new PDO($dsn, $db_user, $db_pass, [
                PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES   => false,
            ]);
        } catch (PDOException $ex) {
            die("<div style='font-family:sans-serif;padding:20px;background:#fee2e2;border:1px solid #ef4444;border-radius:8px;max-width:600px;margin:40px auto;color:#991b1b;'>
                <h3 style='margin:0 0 10px 0;'>Database Connection Error</h3>
                <p>Could not connect to MySQL server: " . htmlspecialchars($ex->getMessage()) . "</p>
                <p><small>Please verify that MySQL is running in XAMPP on port 3307 or 3306.</small></p>
            </div>");
        }
    } else {
        die("<div style='font-family:sans-serif;padding:20px;background:#fee2e2;border:1px solid #ef4444;border-radius:8px;max-width:600px;margin:40px auto;color:#991b1b;'>
            <h3 style='margin:0 0 10px 0;'>Production Database Connection Error</h3>
            <p>Could not connect to database: " . htmlspecialchars($e->getMessage()) . "</p>
            <p><small>Please check your database credentials in <code>config/db.php</code>.</small></p>
        </div>");
    }
}
