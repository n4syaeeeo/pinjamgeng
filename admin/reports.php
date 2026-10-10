<?php
// Administrator Analytics & Reports - PinjamGeng
// Smart Event Equipment Booking and Inventory Management System (UPTM)

require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../config/auth.php';
require_once __DIR__ . '/../config/helpers.php';

requireAdmin();
$user = currentUser();

// 1. Overall Metrics
$totalUnits = (int)$pdo->query("SELECT SUM(total_qty) FROM equipment")->fetchColumn();
$totalBookings = (int)$pdo->query("SELECT COUNT(*) FROM bookings")->fetchColumn();
$totalReturns = (int)$pdo->query("SELECT COUNT(*) FROM bookings WHERE status = 'Returned'")->fetchColumn();
$totalRepairCost = (float)$pdo->query("SELECT SUM(cost) FROM maintenance_records WHERE status = 'Completed'")->fetchColumn();

// 2. Condition Breakdown
$condStmt = $pdo->query("
    SELECT condition_status, COUNT(*) as model_count, SUM(total_qty) as unit_count
    FROM equipment
    GROUP BY condition_status
");
$conditions = $condStmt->fetchAll();

// 3. Event Type Popularity
$eventStmt = $pdo->query("
    SELECT event_type, COUNT(*) as booking_count
    FROM bookings
    GROUP BY event_type
    ORDER BY booking_count DESC
");
$eventTypes = $eventStmt->fetchAll();

// 4. Most Borrowed Equipment
$topEquip = $pdo->query("
    SELECT e.name, e.asset_tag, c.name as category_name, SUM(bi.quantity) as times_borrowed
    FROM booking_items bi
    JOIN equipment e ON bi.equipment_id = e.id
    JOIN categories c ON e.category_id = c.id
    GROUP BY e.id
    ORDER BY times_borrowed DESC
    LIMIT 5
")->fetchAll();

// 5. Booking Status Breakdown
$statusStmt = $pdo->query("
    SELECT status, COUNT(*) as count
    FROM bookings
    GROUP BY status
");
$statuses = $statusStmt->fetchAll();

$pageTitle = "Analytics & Inventory Reports";
include __DIR__ . '/../includes/header.php';
?>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
            <div class="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-caramel/15 text-caramel border border-caramel/30 text-xs font-bold uppercase tracking-wider mb-2 font-display">
                <i class="fa-solid fa-chart-column"></i> Data Analytics & Equipment Telemetry
            </div>
            <h1 class="font-display text-2xl sm:text-3xl font-extrabold text-coffee-950 tracking-tight">
                Reports & Analytics <span class="text-caramel">PinjamGeng</span>
            </h1>
            <p class="text-xs sm:text-sm text-coffee-600 mt-1">
                Lab asset health assessment, campus activity demand patterns, and UPTM maintenance expenditure records.
            </p>
        </div>
        <button onclick="window.print()" class="inline-flex items-center px-5 py-2.5 rounded-2xl text-xs font-bold bg-coffee-950 text-amber-gold hover:bg-coffee-900 shadow-warm transition-all">
            <i class="fa-solid fa-print mr-2 text-caramel"></i> Print Report Summary
        </button>
    </div>

    <!-- Quick Stats Grid -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        <div class="bg-white p-5 sm:p-6 rounded-3xl border border-coffee-200/90 shadow-warm">
            <span class="text-[11px] font-bold text-coffee-500 uppercase tracking-wider block font-display">Total Catalog Units</span>
            <span class="font-display text-3xl font-extrabold text-coffee-950 mt-1 block"><?= $totalUnits ?></span>
            <span class="text-[11px] text-coffee-600 mt-1 block">Across 5 UPTM campus categories</span>
        </div>
        <div class="bg-white p-5 sm:p-6 rounded-3xl border border-coffee-200/90 shadow-warm">
            <span class="text-[11px] font-bold text-coffee-500 uppercase tracking-wider block font-display">Total Booking Requests</span>
            <span class="font-display text-3xl font-extrabold text-caramel mt-1 block"><?= $totalBookings ?></span>
            <span class="text-[11px] text-coffee-600 mt-1 block">Club, student & staff activities</span>
        </div>
        <div class="bg-white p-5 sm:p-6 rounded-3xl border border-coffee-200/90 shadow-warm">
            <span class="text-[11px] font-bold text-coffee-500 uppercase tracking-wider block font-display">Successfully Returned</span>
            <span class="font-display text-3xl font-extrabold text-emerald-700 mt-1 block"><?= $totalReturns ?></span>
            <span class="text-[11px] text-coffee-600 mt-1 block">Inspected at store counter</span>
        </div>
        <div class="bg-white p-5 sm:p-6 rounded-3xl border border-coffee-200/90 shadow-warm">
            <span class="text-[11px] font-bold text-coffee-500 uppercase tracking-wider block font-display">Total Repair Cost</span>
            <span class="font-display text-3xl font-extrabold text-amber-600 mt-1 block">RM <?= number_format($totalRepairCost, 2) ?></span>
            <span class="text-[11px] text-coffee-600 mt-1 block">Restoration services & replacement parts</span>
        </div>
    </div>

    <!-- Detailed Analytics Grids -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        
        <!-- Condition Assessment -->
        <div class="bg-white rounded-3xl border border-coffee-200/90 shadow-warm p-6 sm:p-7">
            <h3 class="font-display text-sm font-bold text-coffee-950 mb-4 flex items-center">
                <i class="fa-solid fa-heart-pulse mr-2 text-rose-500"></i> Equipment Physical Health & Condition
            </h3>
            <div class="space-y-4 text-xs">
                <?php foreach ($conditions as $c): ?>
                    <?php $pct = $totalUnits > 0 ? ($c['unit_count'] / $totalUnits) * 100 : 0; ?>
                    <div>
                        <div class="flex items-center justify-between mb-1.5">
                            <span class="font-bold text-coffee-950"><?= conditionBadge($c['condition_status']) ?></span>
                            <span class="font-semibold text-coffee-700"><?= $c['unit_count'] ?> units (<?= round($pct, 1) ?>%)</span>
                        </div>
                        <div class="w-full bg-coffee-100 rounded-full h-2.5 overflow-hidden">
                            <div class="h-2.5 rounded-full <?= $c['condition_status'] === 'Good' ? 'bg-emerald-500' : ($c['condition_status'] === 'Fair' ? 'bg-amber-400' : 'bg-rose-500') ?>" style="width: <?= $pct ?>%"></div>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>

        <!-- Demand by Event Type -->
        <div class="bg-white rounded-3xl border border-coffee-200/90 shadow-warm p-6 sm:p-7">
            <h3 class="font-display text-sm font-bold text-coffee-950 mb-4 flex items-center">
                <i class="fa-solid fa-chart-column mr-2 text-caramel"></i> Loan Demand by Event Type
            </h3>
            <div class="space-y-4 text-xs">
                <?php foreach ($eventTypes as $et): ?>
                    <?php $pct = $totalBookings > 0 ? ($et['booking_count'] / $totalBookings) * 100 : 0; ?>
                    <div>
                        <div class="flex items-center justify-between mb-1.5">
                            <span class="font-bold text-coffee-950"><?= sanitize($et['event_type']) ?></span>
                            <span class="font-semibold text-coffee-700"><?= $et['booking_count'] ?> bookings (<?= round($pct, 1) ?>%)</span>
                        </div>
                        <div class="w-full bg-coffee-100 rounded-full h-2.5 overflow-hidden">
                            <div class="bg-gradient-to-r from-caramel to-amber-gold h-2.5 rounded-full" style="width: <?= $pct ?>%"></div>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>

    </div>

    <!-- Top Borrowed Items Table -->
    <div class="bg-white rounded-3xl border border-coffee-200/90 shadow-warm overflow-hidden">
        <div class="p-6 border-b border-coffee-100">
            <h3 class="font-display font-bold text-coffee-950 text-sm flex items-center">
                <i class="fa-solid fa-fire text-amber-500 mr-2"></i> Top 5 Most Borrowed Equipment
            </h3>
        </div>
        <div class="overflow-x-auto">
            <table class="w-full text-left text-xs text-coffee-800">
                <thead class="bg-coffee-100/80 text-coffee-900 uppercase font-bold text-[11px] border-b border-coffee-200 font-display">
                    <tr>
                        <th class="py-3.5 px-4">Asset Tag No.</th>
                        <th class="py-3.5 px-4">Equipment Name</th>
                        <th class="py-3.5 px-4">Category</th>
                        <th class="py-3.5 px-4 text-center">Total Times Loaned</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-coffee-100">
                    <?php foreach ($topEquip as $te): ?>
                        <tr class="hover:bg-coffee-50 transition-colors">
                            <td class="py-3.5 px-4 font-mono font-bold text-coffee-950"><?= sanitize($te['asset_tag']) ?></td>
                            <td class="py-3.5 px-4 font-bold text-coffee-950"><?= sanitize($te['name']) ?></td>
                            <td class="py-3.5 px-4 text-coffee-700"><?= sanitize($te['category_name']) ?></td>
                            <td class="py-3.5 px-4 text-center">
                                <span class="inline-flex items-center px-3 py-1 rounded-xl font-black bg-coffee-100 text-coffee-950 border border-coffee-200">
                                    <?= $te['times_borrowed'] ?> units
                                </span>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
    </div>

</div>

<?php include __DIR__ . '/../includes/footer.php'; ?>
