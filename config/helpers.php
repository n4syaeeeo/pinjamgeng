<?php
// Utility and Helper Functions
// Smart Event Equipment Booking and Inventory Management System

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

/**
 * Get base URL for absolute asset and page paths
 */
function base_url(string $path = ''): string {
    $scriptName = str_replace('\\', '/', $_SERVER['SCRIPT_NAME'] ?? '');
    if (strpos($scriptName, '/smart_event_equipment') !== false) {
        $base = '/smart_event_equipment';
    } else {
        $base = '';
    }
    return ($base === '' ? '' : rtrim($base, '/')) . '/' . ltrim($path, '/');
}

/**
 * Flash messaging functions
 */
function setFlash(string $type, string $message): void {
    $_SESSION['flash_' . $type] = $message;
}

function getFlash(string $type): ?string {
    $key = 'flash_' . $type;
    if (isset($_SESSION[$key])) {
        $msg = $_SESSION[$key];
        unset($_SESSION[$key]);
        return $msg;
    }
    return null;
}

function hasFlash(string $type): bool {
    return isset($_SESSION['flash_' . $type]);
}

/**
 * Sanitize string output
 */
function sanitize(?string $str): string {
    return htmlspecialchars(trim((string)$str), ENT_QUOTES, 'UTF-8');
}

/**
 * Format datetime cleanly
 */
function formatDateTime(?string $datetime, string $format = 'd M Y, h:i A'): string {
    if (!$datetime) return 'N/A';
    try {
        $dt = new DateTime($datetime);
        return $dt->format($format);
    } catch (Exception $e) {
        return $datetime;
    }
}

/**
 * Format date only
 */
function formatDateOnly(?string $date): string {
    return formatDateTime($date, 'd M Y');
}

/**
 * Generate formatted HTML badge for booking statuses
 */
function statusBadge(string $status): string {
    switch (strtoupper($status)) {
        case 'PENDING':
            return '<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-900 border border-amber-300/80 shadow-sm"><i class="fa-solid fa-clock-rotate-left mr-1.5 text-amber-600"></i> Pending Review</span>';
        case 'APPROVED':
            return '<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-900 border border-emerald-300/80 shadow-sm"><i class="fa-solid fa-check mr-1.5 text-emerald-600"></i> Approved</span>';
        case 'BORROWED':
            return '<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-orange-50 text-orange-950 border border-orange-300/80 shadow-sm"><i class="fa-solid fa-hand-holding-box mr-1.5 text-orange-600"></i> Borrowed / Active</span>';
        case 'RETURNED':
            return '<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-stone-100 text-stone-800 border border-stone-300 shadow-sm"><i class="fa-solid fa-clipboard-check mr-1.5 text-stone-600"></i> Returned</span>';
        case 'REJECTED':
            return '<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-900 border border-rose-300 shadow-sm"><i class="fa-solid fa-circle-xmark mr-1.5 text-rose-600"></i> Rejected</span>';
        case 'CANCELLED':
            return '<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-stone-50 text-stone-600 border border-stone-300"><i class="fa-solid fa-ban mr-1.5 text-stone-500"></i> Cancelled</span>';
        default:
            return '<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-stone-100 text-stone-800">' . sanitize($status) . '</span>';
    }
}

/**
 * Generate formatted HTML badge for equipment condition
 */
function conditionBadge(string $condition): string {
    switch (strtoupper($condition)) {
        case 'GOOD':
            return '<span class="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-emerald-50 text-emerald-900 border border-emerald-200"><i class="fa-solid fa-circle-check mr-1.5 text-emerald-600"></i> Good Condition</span>';
        case 'FAIR':
            return '<span class="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-amber-50 text-amber-900 border border-amber-200"><i class="fa-solid fa-triangle-exclamation mr-1.5 text-amber-600"></i> Fair Wear</span>';
        case 'NEEDS MAINTENANCE':
        case 'UNDER MAINTENANCE':
            return '<span class="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-orange-50 text-orange-950 border border-orange-200"><i class="fa-solid fa-wrench mr-1.5 text-orange-600"></i> Needs Maintenance</span>';
        case 'DAMAGED':
            return '<span class="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-rose-50 text-rose-900 border border-rose-200"><i class="fa-solid fa-circle-exclamation mr-1.5 text-rose-600"></i> Damaged</span>';
        case 'LOST':
            return '<span class="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-purple-50 text-purple-900 border border-purple-200"><i class="fa-solid fa-question mr-1.5 text-purple-600"></i> Lost / Missing</span>';
        default:
            return '<span class="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-stone-100 text-stone-800">' . sanitize($condition) . '</span>';
    }
}

/**
 * Generate formatted HTML badge for equipment inventory item status
 */
function equipmentStatusBadge(string $status, int $availableQty): string {
    if ($availableQty <= 0) {
        return '<span class="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-stone-100 text-stone-600 border border-stone-200"><i class="fa-solid fa-circle-xmark mr-1.5 text-stone-400"></i> Out of Stock</span>';
    }
    switch (strtoupper($status)) {
        case 'AVAILABLE':
            return '<span class="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-emerald-50 text-emerald-900 border border-emerald-200"><i class="fa-solid fa-circle-check mr-1.5 text-emerald-600"></i> Available (' . $availableQty . ' units)</span>';
        case 'BORROWED':
            return '<span class="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-amber-50 text-amber-900 border border-amber-200"><i class="fa-solid fa-clock mr-1.5 text-amber-600"></i> Partially Borrowed</span>';
        case 'UNDER MAINTENANCE':
            return '<span class="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-orange-50 text-orange-950 border border-orange-200"><i class="fa-solid fa-wrench mr-1.5 text-orange-600"></i> Under Maintenance</span>';
        default:
            return '<span class="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-stone-100 text-stone-800">' . sanitize($status) . '</span>';
    }
}

/**
 * Generate a unique booking reference
 */
function generateBookingRef(PDO $pdo): string {
    $year = date('Y');
    $stmt = $pdo->query("SELECT COUNT(*) FROM bookings WHERE booking_reference LIKE 'UPTM-BK-{$year}-%'");
    $count = (int)$stmt->fetchColumn() + 1;
    return sprintf('UPTM-BK-%s-%03d', $year, $count);
}
