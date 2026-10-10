<?php
// Event-Based Equipment Packages (Core FYP Objective 2)
// PinjamGeng - Smart Event Equipment Booking and Inventory Management System (UPTM)

require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../config/auth.php';
require_once __DIR__ . '/../config/helpers.php';

$user = currentUser();

// Filter by event type
$selectedType = trim($_GET['type'] ?? 'All');
$query = "SELECT * FROM packages WHERE is_active = 1";
$params = [];

if ($selectedType !== 'All' && !empty($selectedType)) {
    $query .= " AND event_type = ?";
    $params[] = $selectedType;
}
$query .= " ORDER BY id ASC";

$stmt = $pdo->prepare($query);
$stmt->execute($params);
$packages = $stmt->fetchAll();

// Fetch items for each package with current equipment stock status
$pItemsStmt = $pdo->query("
    SELECT pi.*, e.name as equipment_name, e.brand_model, e.available_qty, e.total_qty, e.location, e.item_status, c.name as category_name
    FROM package_items pi
    JOIN equipment e ON pi.equipment_id = e.id
    JOIN categories c ON e.category_id = c.id
    ORDER BY pi.id ASC
");
$packageItemsMap = [];
while ($row = $pItemsStmt->fetch()) {
    $packageItemsMap[$row['package_id']][] = $row;
}

$pageTitle = "Campus Event Packages";
include __DIR__ . '/../includes/header.php';
?>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    
    <?php include __DIR__ . '/../includes/alerts.php'; ?>

    <!-- Title & Academic Context Banner -->
    <div class="relative bg-gradient-to-br from-coffee-950 via-coffee-900 to-coffee-800 text-white rounded-3xl p-6 sm:p-10 shadow-warm overflow-hidden mb-8 border border-coffee-800">
        <!-- Ambient Warm Glow -->
        <div class="absolute -right-16 -top-16 w-80 h-80 bg-caramel/20 rounded-full blur-3xl pointer-events-none"></div>
        <div class="absolute -left-16 -bottom-16 w-60 h-60 bg-amber-gold/15 rounded-full blur-2xl pointer-events-none"></div>

        <div class="relative z-10 max-w-3xl">
            <div class="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-caramel/25 text-amber-gold border border-caramel/40 text-xs font-bold uppercase tracking-wider mb-3">
                <i class="fa-solid fa-sparkles text-amber-gold"></i> Core Innovation • UPTM FYP Objective 2
            </div>
            <h1 class="font-display text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Smart Event Packages (<span class="text-amber-gold">Event Packages</span>)
            </h1>
            <p class="mt-2.5 text-xs sm:text-sm text-coffee-200 leading-relaxed font-light">
                Organize campus activities without the headache of picking equipment piece by piece! Under the <strong class="text-white font-semibold">PinjamGeng</strong> system, equipment is bundled into comprehensive event packages tailored to official UPTM event categories (Seminars, Hands-on Workshops, Formal Meetings, Media Coverage & Sports).
            </p>
        </div>
    </div>

    <!-- Event Type Filter Pills -->
    <div class="flex flex-wrap gap-2.5 mb-8">
        <a href="<?= base_url('user/packages.php') ?>" class="px-4 py-2 rounded-2xl text-xs font-bold transition-all flex items-center <?= $selectedType === 'All' ? 'bg-coffee-900 text-amber-gold shadow-warm' : 'bg-white text-coffee-700 hover:bg-coffee-100 border border-coffee-200' ?>">
            <i class="fa-solid fa-layer-group mr-2 text-caramel"></i> All Packages (<?= count($packageItemsMap) ?>)
        </a>
        <a href="<?= base_url('user/packages.php?type=Seminar') ?>" class="px-4 py-2 rounded-2xl text-xs font-bold transition-all flex items-center <?= $selectedType === 'Seminar' ? 'bg-coffee-900 text-amber-gold shadow-warm' : 'bg-white text-coffee-700 hover:bg-coffee-100 border border-coffee-200' ?>">
            <i class="fa-solid fa-chalkboard-user mr-2 text-amber-gold"></i> Seminars & Lectures
        </a>
        <a href="<?= base_url('user/packages.php?type=Workshop') ?>" class="px-4 py-2 rounded-2xl text-xs font-bold transition-all flex items-center <?= $selectedType === 'Workshop' ? 'bg-coffee-900 text-amber-gold shadow-warm' : 'bg-white text-coffee-700 hover:bg-coffee-100 border border-coffee-200' ?>">
            <i class="fa-solid fa-laptop-code mr-2 text-caramel"></i> Workshops & Labs
        </a>
        <a href="<?= base_url('user/packages.php?type=Meeting') ?>" class="px-4 py-2 rounded-2xl text-xs font-bold transition-all flex items-center <?= $selectedType === 'Meeting' ? 'bg-coffee-900 text-amber-gold shadow-warm' : 'bg-white text-coffee-700 hover:bg-coffee-100 border border-coffee-200' ?>">
            <i class="fa-solid fa-handshake mr-2 text-amber-700"></i> Meetings & Conventions
        </a>
        <a href="<?= base_url('user/packages.php?type=Photography') ?>" class="px-4 py-2 rounded-2xl text-xs font-bold transition-all flex items-center <?= $selectedType === 'Photography' ? 'bg-coffee-900 text-amber-gold shadow-warm' : 'bg-white text-coffee-700 hover:bg-coffee-100 border border-coffee-200' ?>">
            <i class="fa-solid fa-camera-retro mr-2 text-caramel"></i> Photography & Media
        </a>
        <a href="<?= base_url('user/packages.php?type=Sports') ?>" class="px-4 py-2 rounded-2xl text-xs font-bold transition-all flex items-center <?= $selectedType === 'Sports' ? 'bg-coffee-900 text-amber-gold shadow-warm' : 'bg-white text-coffee-700 hover:bg-coffee-100 border border-coffee-200' ?>">
            <i class="fa-solid fa-bullhorn mr-2 text-amber-gold"></i> Outdoor & Sports
        </a>
    </div>

    <!-- Package Cards Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <?php foreach ($packages as $pkg): ?>
            <?php 
                $items = $packageItemsMap[$pkg['id']] ?? [];
                
                // Check overall availability of package
                $allInStock = true;
                $lowestStock = 999;
                foreach ($items as $item) {
                    if ($item['available_qty'] < $item['quantity']) {
                        $allInStock = false;
                    }
                    $lowestStock = min($lowestStock, floor($item['available_qty'] / max(1, $item['quantity'])));
                }
            ?>
            
            <div class="bg-white rounded-3xl border border-coffee-200/90 shadow-warm hover:shadow-warm-lg hover:border-caramel/40 transition-all duration-300 overflow-hidden flex flex-col justify-between">
                
                <!-- Card Header -->
                <div class="p-6 sm:p-7">
                    <div class="flex items-center justify-between mb-4">
                        <span class="inline-flex items-center px-3 py-1 rounded-2xl text-xs font-bold bg-coffee-100 text-coffee-900 border border-coffee-200">
                            <i class="fa-solid <?= sanitize($pkg['icon']) ?> mr-1.5 text-caramel"></i> <?= sanitize($pkg['event_type']) ?> Package
                        </span>
                        
                        <?php if ($allInStock): ?>
                            <span class="inline-flex items-center px-2.5 py-1 rounded-2xl text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                                <i class="fa-solid fa-circle-check mr-1.5 text-emerald-600"></i> In Stock
                            </span>
                        <?php else: ?>
                            <span class="inline-flex items-center px-2.5 py-1 rounded-2xl text-[11px] font-bold bg-amber-50 text-amber-900 border border-amber-200">
                                <i class="fa-solid fa-triangle-exclamation mr-1.5 text-amber-600"></i> Limited Stock
                            </span>
                        <?php endif; ?>
                    </div>

                    <h2 class="font-display text-xl sm:text-2xl font-bold text-coffee-950 tracking-tight">
                        <?= sanitize($pkg['name']) ?>
                    </h2>

                    <div class="flex flex-wrap items-center gap-3 text-xs text-coffee-600 mt-2">
                        <span><i class="fa-solid fa-users mr-1 text-caramel"></i> Suggested Attendees: <strong class="text-coffee-900"><?= sanitize($pkg['suggested_attendees']) ?></strong></span>
                        <span class="text-coffee-300">•</span>
                        <span><i class="fa-solid fa-bullseye mr-1 text-caramel"></i> Target Audience: <strong class="text-coffee-900"><?= sanitize($pkg['target_audience']) ?></strong></span>
                    </div>

                    <p class="text-xs sm:text-sm text-coffee-700 mt-3 leading-relaxed">
                        <?= sanitize($pkg['description']) ?>
                    </p>

                    <!-- Constituent Equipment List -->
                    <div class="mt-6 pt-5 border-t border-coffee-100">
                        <div class="flex items-center justify-between mb-3">
                            <span class="text-[11px] font-bold uppercase tracking-wider text-coffee-700 font-display">
                                <i class="fa-solid fa-clipboard-check mr-1 text-caramel"></i> Package Contents (<?= count($items) ?> items):
                            </span>
                            <span class="text-[10px] text-coffee-500">UPTM Inventory Storage</span>
                        </div>

                        <div class="space-y-2">
                            <?php foreach ($items as $item): ?>
                                <div class="p-2.5 rounded-2xl bg-coffee-50/70 border border-coffee-200/60 flex items-center justify-between text-xs hover:bg-white transition-colors">
                                    <div class="flex items-center space-x-3 overflow-hidden">
                                        <div class="w-8 h-8 rounded-xl bg-white border border-coffee-200 flex items-center justify-center text-coffee-900 flex-shrink-0 font-bold text-xs shadow-sm">
                                            <?= $item['quantity'] ?>x
                                        </div>
                                        <div class="truncate">
                                            <span class="font-bold text-coffee-950 block truncate"><?= sanitize($item['equipment_name']) ?></span>
                                            <span class="text-[11px] text-coffee-600 block truncate">
                                                <?= sanitize($item['brand_model']) ?> • <span class="italic text-coffee-500"><?= sanitize($item['notes'] ?: $item['category_name']) ?></span>
                                            </span>
                                        </div>
                                    </div>
                                    <div class="text-right flex-shrink-0 ml-3">
                                        <?php if ($item['available_qty'] >= $item['quantity']): ?>
                                            <span class="text-[11px] font-bold text-emerald-700">
                                                <i class="fa-solid fa-check text-[10px]"></i> <?= $item['available_qty'] ?> units in stock
                                            </span>
                                        <?php else: ?>
                                            <span class="text-[11px] font-bold text-rose-600">
                                                <i class="fa-solid fa-triangle-exclamation text-[10px]"></i> Only <?= $item['available_qty'] ?> left
                                            </span>
                                        <?php endif; ?>
                                    </div>
                                </div>
                            <?php endforeach; ?>
                        </div>
                    </div>

                </div>

                <!-- Card Footer & Action -->
                <div class="p-5 sm:p-6 bg-coffee-100/60 border-t border-coffee-200/70 flex items-center justify-between">
                    <div class="text-xs text-coffee-700">
                        <i class="fa-solid fa-box text-caramel mr-1"></i> Total package items: <strong class="text-coffee-950"><?= array_sum(array_column($items, 'quantity')) ?> units</strong>
                    </div>
                    <a href="<?= base_url('user/book.php?package_id=' . $pkg['id']) ?>" class="inline-flex items-center px-5 py-2.5 rounded-2xl text-xs font-bold bg-gradient-to-r from-caramel to-coffee-700 hover:from-caramel-hover hover:to-coffee-800 text-white shadow-warm transition-all active:scale-[0.98]">
                        <i class="fa-solid fa-calendar-check mr-2"></i> Book This Package
                    </a>
                </div>

            </div>
        <?php endforeach; ?>
    </div>

</div>

<?php include __DIR__ . '/../includes/footer.php'; ?>
