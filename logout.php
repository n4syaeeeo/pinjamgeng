<?php
// Logout Script
// Smart Event Equipment Booking and Inventory Management System

require_once __DIR__ . '/config/auth.php';
require_once __DIR__ . '/config/helpers.php';

logoutUser();
setFlash('info', 'You have been successfully logged out.');
header('Location: ' . base_url('login.php'));
exit;
