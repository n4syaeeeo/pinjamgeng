<?php
// User Dashboard
// Smart Event Equipment Booking and Inventory Management System

require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../config/auth.php';
require_once __DIR__ . '/../config/helpers.php';

requireLogin();

$user = currentUser();
$userId = $user['id'];

// Get counts for current user
$totalBookings = (int)$pdo->query("SELECT COUNT(*) FROM bookings WHERE user_id = {$userId}")->fetchColumn();
$pendingBookings = (int)$pdo->query("SELECT COUNT(*) FROM bookings WHERE user_id = {$userId} AND status = 'Pending'")->fetchColumn();
$approvedBookings = (int)$pdo->query("SELECT COUNT(*) FROM bookings WHERE user_id = {$userId} AND status = 'Approved'")->fetchColumn();
$activeLoans = (int)$pdo->query("SELECT COUNT(*) FROM bookings WHERE user_id = {$userId} AND status = 'Borrowed'")->fetchColumn();

// Get recent bookings
$recentStmt = $pdo->prepare("
    SELECT b.*, p.name as package_name,
           (SELECT COUNT(*) FROM booking_items WHERE booking_id = b.id) as item_count
    FROM bookings b
    LEFT JOIN packages p ON b.package_id = p.id
    WHERE b.user_id = ?
    ORDER BY b.created_at DESC
    LIMIT 5
");
$recentStmt->execute([$userId]);
$recentBookings = $recentStmt->fetchAll();

// Get curated event packages for quick booking
$packages = $pdo->query("SELECT * FROM packages WHERE is_active = 1 LIMIT 4")->fetchAll();

$pageTitle = "My Dashboard";
include __DIR__ . '/../includes/header.php';
?>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    
    <?php include __DIR__ . '/../includes/alerts.php'; ?>

    <!-- Welcome Header Banner -->
    <div class="gradient-coffee rounded-3xl p-6 sm:p-8 text-white shadow-warm mb-8 relative overflow-hidden border border-coffee-800">
        <div class="absolute -right-10 -bottom-10 opacity-10 text-white text-9xl pointer-events-none">
            <i class="fa-solid fa-boxes-packing"></i>
        </div>
        <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-amber-gold border border-white/20 mb-2">
                    <i class="fa-solid fa-id-badge mr-1.5"></i> <?= sanitize($user['matric_id']) ?> • <?= ucfirst(sanitize($user['user_type'])) ?>
                </span>
                <h1 class="font-display text-2xl sm:text-3xl font-extrabold tracking-tight">
                    Hello, <?= sanitize($user['name']) ?>!
                </h1>
                <p class="text-xs sm:text-sm text-coffee-200 mt-1 max-w-xl">
                    PinjamGeng Equipment Booking Portal • <?= sanitize($user['department']) ?>
                </p>
            </div>
            <div class="flex flex-wrap gap-2.5">
                <a href="<?= base_url('user/packages.php') ?>" class="inline-flex items-center px-4.5 py-2.5 rounded-2xl text-xs font-bold bg-gradient-to-r from-caramel to-amber-gold hover:from-caramel-hover hover:to-amber-500 text-coffee-950 shadow-sm transition-all">
                    <i class="fa-solid fa-cubes-stacked mr-2"></i> Book Event Package
                </a>
                <a href="<?= base_url('user/book.php') ?>" class="inline-flex items-center px-4 py-2.5 rounded-2xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all">
                    <i class="fa-solid fa-plus mr-1.5"></i> Custom Booking
                </a>
            </div>
        </div>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        
        <div class="bg-white p-5 rounded-3xl border border-coffee-200 shadow-warm flex items-center space-x-4">
            <div class="w-12 h-12 rounded-2xl bg-coffee-100 text-coffee-800 flex items-center justify-center text-xl flex-shrink-0">
                <i class="fa-solid fa-folder-open"></i>
            </div>
            <div>
                <span class="font-display block text-2xl font-black text-coffee-950"><?= $totalBookings ?></span>
                <span class="text-xs text-coffee-600 font-medium">Total Bookings</span>
            </div>
        </div>

        <div class="bg-white p-5 rounded-3xl border border-coffee-200 shadow-warm flex items-center space-x-4">
            <div class="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center text-xl flex-shrink-0">
                <i class="fa-solid fa-clock-rotate-left"></i>
            </div>
            <div>
                <span class="font-display block text-2xl font-black text-amber-700"><?= $pendingBookings ?></span>
                <span class="text-xs text-coffee-600 font-medium">Pending Review</span>
            </div>
        </div>

        <div class="bg-white p-5 rounded-3xl border border-coffee-200 shadow-warm flex items-center space-x-4">
            <div class="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center text-xl flex-shrink-0">
                <i class="fa-solid fa-circle-check"></i>
            </div>
            <div>
                <span class="font-display block text-2xl font-black text-emerald-700"><?= $approvedBookings ?></span>
                <span class="text-xs text-coffee-600 font-medium">Approved</span>
            </div>
        </div>

        <div class="bg-white p-5 rounded-3xl border border-coffee-200 shadow-warm flex items-center space-x-4">
            <div class="w-12 h-12 rounded-2xl bg-orange-50 text-caramel flex items-center justify-center text-xl flex-shrink-0">
                <i class="fa-solid fa-hand-holding-box"></i>
            </div>
            <div>
                <span class="font-display block text-2xl font-black text-caramel"><?= $activeLoans ?></span>
                <span class="text-xs text-coffee-600 font-medium">Active Loans</span>
            </div>
        </div>

    </div>

    <!-- Main Content: Recent Bookings & Recommended Packages -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <!-- Left Column: Recent Bookings Table -->
        <div class="lg:col-span-8 space-y-6">
            <div class="bg-white rounded-3xl border border-coffee-200 shadow-warm overflow-hidden">
                <div class="p-5 border-b border-coffee-100 flex items-center justify-between">
                    <div>
                        <h2 class="font-display font-bold text-coffee-950 text-base">Your Recent Booking Records</h2>
                        <p class="text-xs text-coffee-500">Track approval status and download official UPTM loan slips</p>
                    </div>
                    <a href="<?= base_url('user/my_bookings.php') ?>" class="text-xs font-bold text-caramel hover:text-caramel-hover">
                        View All (<?= $totalBookings ?>) <i class="fa-solid fa-arrow-right ml-1"></i>
                    </a>
                </div>

                <?php if (empty($recentBookings)): ?>
                    <div class="p-10 text-center text-coffee-400">
                        <i class="fa-regular fa-calendar-xmark text-4xl mb-3 text-coffee-300"></i>
                        <p class="text-sm font-semibold text-coffee-700">No booking records found.</p>
                        <p class="text-xs mt-1 text-coffee-500">Get started by selecting an event package or browsing the equipment catalog.</p>
                        <a href="<?= base_url('user/packages.php') ?>" class="inline-flex items-center px-4 py-2 mt-4 rounded-2xl text-xs font-bold bg-coffee-900 text-white hover:bg-caramel transition-colors">
                            Choose Your First Package
                        </a>
                    </div>
                <?php else: ?>
                    <div class="overflow-x-auto">
                        <table class="w-full text-left text-xs text-coffee-700">
                            <thead class="bg-coffee-50 text-coffee-800 uppercase font-semibold text-[11px] border-b border-coffee-200 font-display">
                                <tr>
                                    <th class="py-3 px-4">Reference / Event</th>
                                    <th class="py-3 px-4">Event Date</th>
                                    <th class="py-3 px-4">Items</th>
                                    <th class="py-3 px-4">Status</th>
                                    <th class="py-3 px-4 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-coffee-100">
                                <?php foreach ($recentBookings as $b): ?>
                                    <tr class="hover:bg-coffee-50/60 transition-colors">
                                        <td class="py-3 px-4">
                                            <span class="font-mono font-bold text-coffee-950 block"><?= sanitize($b['booking_reference']) ?></span>
                                            <span class="font-medium text-coffee-800 block truncate max-w-[200px]" title="<?= sanitize($b['event_name']) ?>"><?= sanitize($b['event_name']) ?></span>
                                            <span class="text-[10px] text-coffee-500">
                                                <i class="fa-solid fa-location-dot mr-1 text-coffee-400"></i><?= sanitize($b['event_location']) ?>
                                            </span>
                                        </td>
                                        <td class="py-3 px-4 whitespace-nowrap">
                                            <span class="font-semibold text-coffee-900 block"><?= formatDateOnly($b['start_datetime']) ?></span>
                                            <span class="text-[10px] text-coffee-500"><?= formatDateTime($b['start_datetime'], 'h:i A') ?> - <?= formatDateTime($b['end_datetime'], 'h:i A') ?></span>
                                        </td>
                                        <td class="py-3 px-4 whitespace-nowrap">
                                            <span class="inline-flex items-center px-2 py-0.5 rounded-md bg-coffee-100 font-bold text-coffee-800">
                                                <i class="fa-solid fa-cube mr-1 text-coffee-400"></i> <?= $b['item_count'] ?> items
                                            </span>
                                            <?php if ($b['package_name']): ?>
                                                <span class="block text-[10px] text-caramel font-semibold truncate max-w-[120px] mt-0.5">
                                                    <?= sanitize($b['package_name']) ?>
                                                </span>
                                            <?php endif; ?>
                                        </td>
                                        <td class="py-3 px-4 whitespace-nowrap">
                                            <?= statusBadge($b['status']) ?>
                                        </td>
                                        <td class="py-3 px-4 text-right whitespace-nowrap">
                                            <a href="<?= base_url('user/booking_details.php?id=' . $b['id']) ?>" class="px-3 py-1.5 rounded-xl text-xs font-semibold bg-coffee-100 hover:bg-caramel hover:text-white text-coffee-800 transition-colors">
                                                Details <i class="fa-solid fa-chevron-right ml-1 text-[10px]"></i>
                                            </a>
                                        </td>
                                    </tr>
                                <?php endforeach; ?>
                            </tbody>
                        </table>
                    </div>
                <?php endif; ?>
            </div>
        </div>

        <!-- Right Column: Quick Event Packages -->
        <div class="lg:col-span-4 space-y-6">
            <div class="bg-white rounded-3xl border border-coffee-200 p-6 shadow-warm">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="font-display font-bold text-coffee-950 text-sm flex items-center">
                        <i class="fa-solid fa-cubes-stacked mr-2 text-caramel"></i> Smart Event Packages
                    </h3>
                    <span class="text-[10px] bg-amber-50 text-caramel font-bold px-2 py-0.5 rounded-md border border-amber-200">Star FYP</span>
                </div>
                <p class="text-xs text-coffee-600 mb-4 leading-relaxed">
                    Select your activity type to get pre-matched equipment automatically:
                </p>

                <div class="space-y-3">
                    <?php foreach ($packages as $pkg): ?>
                        <div class="p-3.5 rounded-2xl border border-coffee-200/80 hover:border-caramel/60 hover:bg-coffee-50/50 transition-all flex items-center justify-between">
                            <div class="flex items-center space-x-3 truncate">
                                <div class="w-9 h-9 rounded-xl bg-coffee-100 text-coffee-800 flex items-center justify-center text-sm flex-shrink-0">
                                    <i class="fa-solid <?= sanitize($pkg['icon']) ?> text-caramel"></i>
                                </div>
                                <div class="truncate">
                                    <span class="font-display font-bold text-coffee-950 text-xs block truncate"><?= sanitize($pkg['name']) ?></span>
                                    <span class="text-[10px] text-coffee-500"><?= sanitize($pkg['event_type']) ?> • <?= sanitize($pkg['suggested_attendees']) ?></span>
                                </div>
                            </div>
                            <a href="<?= base_url('user/book.php?package_id=' . $pkg['id']) ?>" class="p-2 rounded-xl bg-coffee-900 text-white hover:bg-caramel text-xs shadow-sm ml-2 flex-shrink-0" title="Book this package">
                                <i class="fa-solid fa-arrow-right"></i>
                            </a>
                        </div>
                    <?php endforeach; ?>
                </div>

                <div class="mt-5 pt-4 border-t border-coffee-100 text-center">
                    <a href="<?= base_url('user/packages.php') ?>" class="text-xs font-bold text-caramel hover:text-caramel-hover font-display">
                        View All Event Packages <i class="fa-solid fa-chevron-right ml-1"></i>
                    </a>
                </div>
            </div>

            <!-- Quick Contacts Card -->
            <div class="bg-coffee-100/60 rounded-3xl border border-coffee-200 p-5 text-xs text-coffee-700 space-y-2">
                <span class="font-display font-bold text-coffee-950 block flex items-center">
                    <i class="fa-solid fa-circle-question mr-1.5 text-caramel"></i> Need Special Assistance?
                </span>
                <p class="text-[11px] leading-relaxed">
                    For reservations outside scheduled hours or large faculty events, please contact the Audio Visual Support Unit at Level 3 FCM, UPTM or reach the officer on duty at <strong>ext. 2045</strong>.
                </p>
            </div>
        </div>

    </div>

</div>

<?php include __DIR__ . '/../includes/footer.php'; ?>
