<?php
// Administrator Dashboard - PinjamGeng
// Smart Event Equipment Booking and Inventory Management System (UPTM)

require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../config/auth.php';
require_once __DIR__ . '/../config/helpers.php';

requireAdmin();
$user = currentUser();

// KPI Calculations
$totalEquipUnits = (int)$pdo->query("SELECT SUM(total_qty) FROM equipment")->fetchColumn();
$availableUnits = (int)$pdo->query("SELECT SUM(available_qty) FROM equipment WHERE item_status = 'Available'")->fetchColumn();
$borrowedUnits = (int)$pdo->query("SELECT SUM(total_qty - available_qty) FROM equipment WHERE item_status != 'Damaged'")->fetchColumn();
$maintenanceItems = (int)$pdo->query("SELECT COUNT(*) FROM equipment WHERE item_status = 'Under Maintenance' OR condition_status = 'Damaged'")->fetchColumn();

$pendingBookingsCount = (int)$pdo->query("SELECT COUNT(*) FROM bookings WHERE status = 'Pending'")->fetchColumn();
$activeLoansCount = (int)$pdo->query("SELECT COUNT(*) FROM bookings WHERE status = 'Borrowed'")->fetchColumn();
$totalUsersCount = (int)$pdo->query("SELECT COUNT(*) FROM users WHERE role = 'user'")->fetchColumn();

// Fetch Pending Requests requiring review
$pendingRequests = $pdo->query("
    SELECT b.*, u.full_name as applicant_name, u.matric_staff_id,
           (SELECT COUNT(*) FROM booking_items WHERE booking_id = b.id) as item_count,
           p.name as package_name
    FROM bookings b
    JOIN users u ON b.user_id = u.id
    LEFT JOIN packages p ON b.package_id = p.id
    WHERE b.status = 'Pending'
    ORDER BY b.created_at ASC
    LIMIT 6
")->fetchAll();

// Fetch Currently Borrowed Loans
$activeLoans = $pdo->query("
    SELECT b.*, u.full_name as applicant_name, u.phone as applicant_phone,
           (SELECT COUNT(*) FROM booking_items WHERE booking_id = b.id) as item_count
    FROM bookings b
    JOIN users u ON b.user_id = u.id
    WHERE b.status = 'Borrowed'
    ORDER BY b.end_datetime ASC
    LIMIT 5
")->fetchAll();

// Category Breakdown
$catBreakdown = $pdo->query("
    SELECT c.name, COUNT(e.id) as total_items, SUM(e.total_qty) as total_units, SUM(e.available_qty) as available_units
    FROM categories c
    LEFT JOIN equipment e ON c.id = e.category_id
    GROUP BY c.id
    ORDER BY total_units DESC
")->fetchAll();

$pageTitle = "Admin Dashboard";
include __DIR__ . '/../includes/header.php';
?>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    
    <?php include __DIR__ . '/../includes/alerts.php'; ?>

    <!-- Admin Welcome Header Banner -->
    <div class="relative bg-gradient-to-br from-coffee-950 via-coffee-900 to-coffee-800 rounded-3xl p-6 sm:p-8 text-white shadow-warm mb-8 overflow-hidden border border-coffee-800">
        <!-- Ambient Warm Glow -->
        <div class="absolute -right-16 -top-16 w-80 h-80 bg-caramel/20 rounded-full blur-3xl pointer-events-none"></div>
        <div class="absolute -left-16 -bottom-16 w-60 h-60 bg-amber-gold/15 rounded-full blur-2xl pointer-events-none"></div>

        <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
                <div class="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-caramel/25 text-amber-gold border border-caramel/40 text-xs font-bold uppercase tracking-wider mb-2 font-display">
                    <i class="fa-solid fa-shield-halved mr-1"></i> UPTM Lab & Audio Visual Admin Control
                </div>
                <h1 class="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                    Welcome back, <?= sanitize($user['name']) ?>
                </h1>
                <p class="text-xs sm:text-sm text-coffee-300 mt-1 max-w-xl font-light">
                    <strong class="text-amber-gold font-semibold">PinjamGeng</strong> Admin Portal • Centralized Event Equipment & Inventory Control
                </p>
            </div>
            <div class="flex flex-wrap gap-2.5">
                <a href="<?= base_url('admin/bookings.php?status=Pending') ?>" class="inline-flex items-center px-4 py-2.5 rounded-2xl text-xs font-bold bg-gradient-to-r from-caramel to-amber-gold text-coffee-950 hover:brightness-105 shadow-warm transition-all">
                    <i class="fa-solid fa-bell mr-1.5"></i> Review Bookings (<?= $pendingBookingsCount ?>)
                </a>
                <a href="<?= base_url('admin/equipment.php?action=new') ?>" class="inline-flex items-center px-4 py-2.5 rounded-2xl text-xs font-bold bg-coffee-800 hover:bg-coffee-700 text-amber-gold border border-coffee-700 shadow transition-all">
                    <i class="fa-solid fa-plus mr-1.5"></i> Add Equipment
                </a>
                <a href="<?= base_url('admin/returns.php') ?>" class="inline-flex items-center px-4 py-2.5 rounded-2xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white border border-white/15 transition-all">
                    <i class="fa-solid fa-rotate-left mr-1.5 text-caramel"></i> Return Desk
                </a>
            </div>
        </div>
    </div>

    <!-- KPI Metric Cards Grid -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        
        <div class="bg-white p-5 sm:p-6 rounded-3xl border border-coffee-200/90 shadow-warm flex items-center justify-between">
            <div>
                <span class="text-[11px] text-coffee-600 font-bold uppercase tracking-wider font-display">Total Equipment</span>
                <span class="block font-display text-2xl sm:text-3xl font-extrabold text-coffee-950 mt-1"><?= $totalEquipUnits ?> <span class="text-xs font-normal text-coffee-500">units</span></span>
                <span class="text-[11px] text-emerald-700 font-bold mt-1 block">
                    <i class="fa-solid fa-check mr-1"></i> <?= $availableUnits ?> available in stock
                </span>
            </div>
            <div class="w-12 h-12 rounded-2xl bg-coffee-100 text-coffee-900 flex items-center justify-center text-xl shadow-sm">
                <i class="fa-solid fa-boxes-stacked text-caramel"></i>
            </div>
        </div>

        <div class="bg-white p-5 sm:p-6 rounded-3xl border border-coffee-200/90 shadow-warm flex items-center justify-between">
            <div>
                <span class="text-[11px] text-coffee-600 font-bold uppercase tracking-wider font-display">Pending Review</span>
                <span class="block font-display text-2xl sm:text-3xl font-extrabold text-amber-600 mt-1"><?= $pendingBookingsCount ?></span>
                <span class="text-[11px] text-coffee-500 font-medium mt-1 block">
                    Requires immediate action
                </span>
            </div>
            <div class="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center text-xl shadow-sm">
                <i class="fa-solid fa-clock-rotate-left"></i>
            </div>
        </div>

        <div class="bg-white p-5 sm:p-6 rounded-3xl border border-coffee-200/90 shadow-warm flex items-center justify-between">
            <div>
                <span class="text-[11px] text-coffee-600 font-bold uppercase tracking-wider font-display">Active Loans</span>
                <span class="block font-display text-2xl sm:text-3xl font-extrabold text-coffee-950 mt-1"><?= $activeLoansCount ?></span>
                <span class="text-[11px] text-coffee-500 font-medium mt-1 block">
                    <?= $borrowedUnits ?> units currently loaned
                </span>
            </div>
            <div class="w-12 h-12 rounded-2xl bg-caramel/15 text-caramel border border-caramel/25 flex items-center justify-center text-xl shadow-sm">
                <i class="fa-solid fa-hand-holding-box"></i>
            </div>
        </div>

        <div class="bg-white p-5 sm:p-6 rounded-3xl border border-coffee-200/90 shadow-warm flex items-center justify-between">
            <div>
                <span class="text-[11px] text-coffee-600 font-bold uppercase tracking-wider font-display">Damaged / Maintenance</span>
                <span class="block font-display text-2xl sm:text-3xl font-extrabold text-rose-600 mt-1"><?= $maintenanceItems ?></span>
                <span class="text-[11px] text-coffee-500 font-medium mt-1 block">
                    <a href="<?= base_url('admin/maintenance.php') ?>" class="text-caramel font-bold hover:underline">Maintenance log &raquo;</a>
                </span>
            </div>
            <div class="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 border border-rose-200 flex items-center justify-center text-xl shadow-sm">
                <i class="fa-solid fa-wrench"></i>
            </div>
        </div>

    </div>

    <!-- Main Content Area: Pending Requests & Inventory Status -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <!-- Left: Pending Booking Requests List -->
        <div class="lg:col-span-8 space-y-6">
            <div class="bg-white rounded-3xl border border-coffee-200/90 shadow-warm overflow-hidden">
                <div class="p-6 border-b border-coffee-100 flex items-center justify-between">
                    <div>
                        <h2 class="font-display font-bold text-coffee-950 text-base flex items-center">
                            <i class="fa-solid fa-bell mr-2 text-amber-600"></i> Pending Booking Requests
                        </h2>
                        <p class="text-xs text-coffee-600">Review equipment reservation requests submitted by UPTM students, clubs, and staff</p>
                    </div>
                    <a href="<?= base_url('admin/bookings.php?status=Pending') ?>" class="text-xs font-bold text-caramel hover:text-caramel-hover flex items-center">
                        View All <i class="fa-solid fa-arrow-right ml-1.5 text-xs"></i>
                    </a>
                </div>

                <?php if (empty($pendingRequests)): ?>
                    <div class="p-10 text-center text-coffee-400">
                        <i class="fa-solid fa-circle-check text-4xl mb-3 text-emerald-500"></i>
                        <p class="font-display text-sm font-bold text-coffee-900">All requests processed!</p>
                        <p class="text-xs text-coffee-500 mt-1">No new booking requests pending approval at this time.</p>
                    </div>
                <?php else: ?>
                    <div class="divide-y divide-coffee-100">
                        <?php foreach ($pendingRequests as $pr): ?>
                            <div class="p-5 sm:p-6 hover:bg-coffee-50/70 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div class="space-y-1.5">
                                    <div class="flex items-center space-x-2">
                                        <span class="font-mono text-xs font-bold text-coffee-900 bg-coffee-100 px-2.5 py-0.5 rounded-xl border border-coffee-200">
                                             <?= sanitize($pr['booking_reference']) ?>
                                        </span>
                                        <span class="inline-flex items-center px-2 py-0.5 rounded-lg text-[10px] font-bold bg-amber-100 text-amber-900">
                                            <?= sanitize($pr['event_type']) ?>
                                        </span>
                                        <?php if ($pr['package_name']): ?>
                                            <span class="inline-flex items-center px-2 py-0.5 rounded-lg text-[10px] font-bold bg-caramel/15 text-caramel border border-caramel/30">
                                                <i class="fa-solid fa-box mr-1"></i> <?= sanitize($pr['package_name']) ?>
                                            </span>
                                        <?php endif; ?>
                                    </div>

                                    <h3 class="font-display font-bold text-coffee-950 text-base">
                                        <?= sanitize($pr['event_name']) ?>
                                    </h3>

                                    <p class="text-xs text-coffee-600">
                                        Applicant: <strong class="text-coffee-900"><?= sanitize($pr['applicant_name']) ?></strong> (<?= sanitize($pr['matric_staff_id']) ?>)
                                    </p>

                                    <div class="flex flex-wrap items-center gap-3 text-[11px] text-coffee-500">
                                        <span><i class="fa-solid fa-calendar mr-1 text-caramel"></i> <?= formatDateTime($pr['start_datetime'], 'd M Y, h:i A') ?></span>
                                        <span>•</span>
                                        <span><i class="fa-solid fa-location-dot mr-1 text-caramel"></i> <?= sanitize($pr['event_location']) ?></span>
                                        <span>•</span>
                                        <span><i class="fa-solid fa-box mr-1 text-caramel"></i> <?= $pr['item_count'] ?> items requested</span>
                                    </div>
                                </div>

                                <div class="flex sm:flex-col items-end justify-between sm:justify-center gap-2 flex-shrink-0">
                                    <a href="<?= base_url('admin/booking_view.php?id=' . $pr['id']) ?>" class="px-4 py-2.5 rounded-2xl text-xs font-bold bg-coffee-950 hover:bg-coffee-900 text-amber-gold shadow-warm transition-all flex items-center active:scale-95">
                                        Review & Approve <i class="fa-solid fa-chevron-right ml-1.5 text-[10px]"></i>
                                    </a>
                                </div>
                            </div>
                        <?php endforeach; ?>
                    </div>
                <?php endif; ?>
            </div>

            <!-- Active Loans (Equipment Currently Borrowed) -->
            <div class="bg-white rounded-3xl border border-coffee-200/90 shadow-warm overflow-hidden">
                <div class="p-6 border-b border-coffee-100 flex items-center justify-between">
                    <div>
                        <h2 class="font-display font-bold text-coffee-950 text-base flex items-center">
                            <i class="fa-solid fa-hand-holding-box mr-2 text-caramel"></i> Active Loans (In Use)
                        </h2>
                        <p class="text-xs text-coffee-600">Monitor equipment currently checked out and expected return dates</p>
                    </div>
                    <a href="<?= base_url('admin/returns.php') ?>" class="text-xs font-bold text-caramel hover:text-caramel-hover flex items-center">
                        Return Desk <i class="fa-solid fa-arrow-right ml-1.5 text-xs"></i>
                    </a>
                </div>

                <?php if (empty($activeLoans)): ?>
                    <div class="p-8 text-center text-coffee-400 text-xs">
                        No equipment is currently on loan.
                    </div>
                <?php else: ?>
                    <div class="overflow-x-auto">
                        <table class="w-full text-left text-xs text-coffee-800">
                            <thead class="bg-coffee-100/80 text-coffee-900 uppercase font-bold text-[11px] border-b border-coffee-200 font-display">
                                <tr>
                                    <th class="py-3.5 px-4">Ref No. / Event</th>
                                    <th class="py-3.5 px-4">Borrower</th>
                                    <th class="py-3.5 px-4">Expected Return</th>
                                    <th class="py-3.5 px-4 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-coffee-100">
                                <?php foreach ($activeLoans as $al): ?>
                                    <tr class="hover:bg-coffee-50 transition-colors">
                                        <td class="py-3.5 px-4">
                                            <span class="font-mono font-bold text-coffee-950 block"><?= sanitize($al['booking_reference']) ?></span>
                                            <span class="font-medium text-coffee-700 block truncate max-w-[180px]"><?= sanitize($al['event_name']) ?></span>
                                        </td>
                                        <td class="py-3.5 px-4">
                                            <span class="font-bold text-coffee-900 block"><?= sanitize($al['applicant_name']) ?></span>
                                            <span class="text-[11px] text-coffee-600"><?= sanitize($al['applicant_phone']) ?></span>
                                        </td>
                                        <td class="py-3.5 px-4">
                                            <span class="font-bold text-caramel block"><?= formatDateTime($al['end_datetime'], 'd M Y, h:i A') ?></span>
                                        </td>
                                        <td class="py-3.5 px-4 text-right">
                                            <a href="<?= base_url('admin/returns.php?booking_id=' . $al['id']) ?>" class="px-3 py-1.5 rounded-xl text-xs font-bold bg-caramel/15 text-caramel border border-caramel/30 hover:bg-caramel hover:text-white transition-all">
                                                Process Return
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

        <!-- Right: Category Breakdown & Quick Actions -->
        <div class="lg:col-span-4 space-y-6">
            
            <!-- Category Distribution Widget -->
            <div class="bg-white rounded-3xl border border-coffee-200/90 p-6 shadow-warm">
                <h3 class="font-display font-bold text-coffee-950 text-base mb-4 flex items-center">
                    <i class="fa-solid fa-chart-pie mr-2 text-caramel"></i> Inventory by Category
                </h3>

                <div class="space-y-4 text-xs">
                    <?php foreach ($catBreakdown as $cb): ?>
                        <?php 
                            $pct = $totalEquipUnits > 0 ? ($cb['total_units'] / $totalEquipUnits) * 100 : 0;
                        ?>
                        <div>
                            <div class="flex items-center justify-between mb-1.5">
                                <span class="font-bold text-coffee-950"><?= sanitize($cb['name']) ?></span>
                                <span class="text-coffee-600 font-medium"><?= (int)$cb['available_units'] ?> / <?= (int)$cb['total_units'] ?> units</span>
                            </div>
                            <div class="w-full bg-coffee-100 rounded-full h-2.5 overflow-hidden">
                                <div class="bg-gradient-to-r from-caramel to-amber-gold h-2.5 rounded-full" style="width: <?= $pct ?>%"></div>
                            </div>
                        </div>
                    <?php endforeach; ?>
                </div>

                <div class="mt-6 pt-5 border-t border-coffee-100 text-center">
                    <a href="<?= base_url('admin/equipment.php') ?>" class="text-xs font-bold text-caramel hover:text-caramel-hover flex items-center justify-center">
                        Manage Full Equipment Inventory <i class="fa-solid fa-chevron-right ml-1.5 text-[10px]"></i>
                    </a>
                </div>
            </div>

            <!-- Quick FYP Packages Shortcut -->
            <div class="bg-coffee-100/80 rounded-3xl border border-coffee-200/90 p-6 shadow-warm text-xs">
                <span class="inline-block px-2.5 py-0.5 rounded-lg bg-caramel/20 text-caramel font-bold uppercase text-[10px] mb-2 font-display">
                    UPTM FYP Innovation Feature
                </span>
                <h4 class="font-display font-bold text-coffee-950 text-base">Smart Event Packages</h4>
                <p class="text-coffee-600 mt-1 leading-relaxed">
                    Manage curated equipment bundles for Seminars, Workshops, Meetings, and Media / Photography.
                </p>
                <div class="mt-4">
                    <a href="<?= base_url('admin/packages.php') ?>" class="w-full inline-flex items-center justify-center px-4 py-2.5 rounded-2xl font-bold bg-coffee-950 hover:bg-coffee-900 text-amber-gold shadow-warm transition-all">
                        <i class="fa-solid fa-cubes-stacked mr-2 text-caramel"></i> Manage Campus Event Packages
                    </a>
                </div>
            </div>

        </div>

    </div>

</div>

<?php include __DIR__ . '/../includes/footer.php'; ?>
