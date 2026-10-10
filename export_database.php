<?php
// Script to dump full database to a clean SQL file for deployment
require_once __DIR__ . '/config/db.php';

$outputFile = __DIR__ . '/pinjamgeng_database_dump.sql';
$fp = fopen($outputFile, 'w');

fwrite($fp, "-- ==========================================================\n");
fwrite($fp, "-- PinjamGeng Database Dump for Deployment\n");
fwrite($fp, "-- System: Smart Event Equipment Booking and Inventory Management System\n");
fwrite($fp, "-- Faculty of Computing & Multimedia, UPTM\n");
fwrite($fp, "-- Student: Nursyafiqah Zulaikha Binti Zilkamal (AM2412018113)\n");
fwrite($fp, "-- ==========================================================\n\n");
fwrite($fp, "SET FOREIGN_KEY_CHECKS = 0;\n");
fwrite($fp, "SET SQL_MODE = 'NO_AUTO_VALUE_ON_ZERO';\n");
fwrite($fp, "SET time_zone = '+08:00';\n\n");

// Get all tables
$tables = [];
$stmt = $pdo->query("SHOW TABLES");
while ($row = $stmt->fetch(PDO::FETCH_NUM)) {
    $tables[] = $row[0];
}

// Order tables to respect foreign keys on drop
$order = ['maintenance_records', 'returns_log', 'booking_items', 'bookings', 'package_items', 'packages', 'equipment', 'categories', 'users'];
$orderedTables = [];
foreach ($order as $tbl) {
    if (in_array($tbl, $tables)) {
        $orderedTables[] = $tbl;
    }
}
foreach ($tables as $tbl) {
    if (!in_array($tbl, $orderedTables)) {
        $orderedTables[] = $tbl;
    }
}

foreach ($orderedTables as $table) {
    fwrite($fp, "DROP TABLE IF EXISTS `{$table}`;\n");
}
fwrite($fp, "\n");

// Now create tables and insert data (reverse order for creation)
$createOrder = array_reverse($orderedTables);
foreach ($createOrder as $table) {
    // Show create table
    $stmt = $pdo->query("SHOW CREATE TABLE `{$table}`");
    $createRow = $stmt->fetch(PDO::FETCH_NUM);
    fwrite($fp, "-- Table structure for `{$table}`\n");
    fwrite($fp, $createRow[1] . ";\n\n");

    // Dump data
    $stmt = $pdo->query("SELECT * FROM `{$table}`");
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
    if (!empty($rows)) {
        fwrite($fp, "-- Dumping data for `{$table}`\n");
        $cols = array_keys($rows[0]);
        $colList = implode('`, `', $cols);
        
        $insertChunks = [];
        foreach ($rows as $r) {
            $vals = [];
            foreach ($r as $val) {
                if ($val === null) {
                    $vals[] = 'NULL';
                } else {
                    $vals[] = $pdo->quote($val);
                }
            }
            $insertChunks[] = "(" . implode(', ', $vals) . ")";
        }
        
        // Chunk inserts to avoid huge single statements
        $chunks = array_chunk($insertChunks, 50);
        foreach ($chunks as $chunk) {
            fwrite($fp, "INSERT INTO `{$table}` (`{$colList}`) VALUES\n" . implode(",\n", $chunk) . ";\n");
        }
        fwrite($fp, "\n");
    }
}

fwrite($fp, "SET FOREIGN_KEY_CHECKS = 1;\n");
fwrite($fp, "-- ==========================================================\n");
fwrite($fp, "-- End of Dump\n");
fwrite($fp, "-- ==========================================================\n");
fclose($fp);

echo "Database successfully exported to: " . $outputFile . " (" . round(filesize($outputFile)/1024, 2) . " KB)\n";
