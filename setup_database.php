<?php
// One-Click Online Database Importer for PinjamGeng
// Bypasses phpMyAdmin Cloudflare 522 timeouts by running directly on the server!
require_once __DIR__ . '/config/db.php';

header('Content-Type: text/html; charset=utf-8');
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>PinjamGeng - Database Auto-Installer</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #fdfbf7; color: #231308; padding: 40px 20px; }
        .box { max-width: 650px; margin: 0 auto; background: #fff; border-radius: 12px; padding: 30px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); border: 1px solid #e5e7eb; }
        h2 { color: #8B3A0F; margin-top: 0; }
        .success { background: #ecfdf5; border: 1px solid #10b981; color: #065f46; padding: 15px; border-radius: 8px; margin: 20px 0; }
        .error { background: #fef2f2; border: 1px solid #ef4444; color: #991b1b; padding: 15px; border-radius: 8px; margin: 20px 0; }
        .btn { display: inline-block; background: #8B3A0F; color: #fff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: bold; margin-top: 15px; }
        .btn:hover { background: #6e2d0a; }
        code { background: #f3f4f6; padding: 2px 6px; border-radius: 4px; font-size: 13px; }
    </style>
</head>
<body>
<div class="box">
    <h2>🚀 PinjamGeng Database Auto-Installer</h2>
    <p>Connecting to database using credentials in <code>config/db.php</code>...</p>
    <?php
    $sqlFile = __DIR__ . '/pinjamgeng_database_dump.sql';
    if (!file_exists($sqlFile)) {
        echo "<div class='error'><strong>Error:</strong> <code>pinjamgeng_database_dump.sql</code> not found in root directory! Please ensure it was uploaded to <code>htdocs/</code>.</div>";
        exit;
    }

    try {
        $sql = file_get_contents($sqlFile);
        $pdo->exec($sql);
        echo "<div class='success'>
            <h3>🎉 Database Imported Successfully!</h3>
            <p>All tables (users, categories, equipment, packages, bookings) and default accounts were imported cleanly into your cloud database.</p>
            <p><strong>Admin Login:</strong> <code>admin@uptm.edu.my</code> | <code>password123</code><br/>
            <strong>Student Login:</strong> <code>syafiqah@student.uptm.edu.my</code> | <code>password123</code></p>
        </div>";
        echo "<a href='index.php' class='btn'>Go to PinjamGeng Homepage &rarr;</a>";
    } catch (Exception $e) {
        echo "<div class='error'>
            <h3>❌ Import Error:</h3>
            <p>" . htmlspecialchars($e->getMessage()) . "</p>
            <p>Please double-check your database settings in <code>config/db.php</code>.</p>
        </div>";
    }
    ?>
</div>
</body>
</html>
