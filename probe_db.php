<?php
foreach ([3306, 3307] as $port) {
    foreach (['', 'root', 'admin', 'password', '123456', 'root123'] as $pass) {
        try {
            $pdo = new PDO("mysql:host=127.0.0.1;port=$port", 'root', $pass, [PDO::ATTR_TIMEOUT => 2]);
            echo "SUCCESS: Connected on port $port with pass '$pass'\n";
            $stmt = $pdo->query("SHOW DATABASES");
            print_r($stmt->fetchAll(PDO::FETCH_COLUMN));
            exit(0);
        } catch (Exception $e) {
            echo "Port $port pass '$pass': " . $e->getMessage() . "\n";
        }
    }
}
