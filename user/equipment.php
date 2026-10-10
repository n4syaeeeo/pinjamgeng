<?php
// Equipment Catalog & Availability Check
// PinjamGeng - Smart Event Equipment Booking and Inventory Management System (UPTM)

require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../config/auth.php';
require_once __DIR__ . '/../config/helpers.php';

$search = trim($_GET['search'] ?? '');
$catFilter = trim($_GET['category'] ?? '');
$statusFilter = trim($_GET['status'] ?? '');

$query = "SELECT e.*, c.name as category_name, c.icon as category_icon, c.color_class as category_color 
          FROM equipment e 
          JOIN categories c ON e.category_id = c.id 
          WHERE 1=1";
$params = [];

if (!empty($search)) {
    $query .= " AND (e.name LIKE ? OR e.brand_model LIKE ? OR e.asset_tag LIKE ? OR e.description LIKE ?)";
    $term = "%{$search}%";
    $params = array_merge($params, [$term, $term, $term, $term]);
}

if (!empty($catFilter) && is_numeric($catFilter)) {
    $query .= " AND e.category_id = ?";
    $params[] = $catFilter;
}

if (!empty($statusFilter)) {
    if ($statusFilter === 'available') {
        $query .= " AND e.available_qty > 0 AND e.item_status = 'Available'";
    } elseif ($statusFilter === 'unavailable') {
        $query .= " AND (e.available_qty <= 0 OR e.item_status != 'Available')";
    }
}

$query .= " ORDER BY c.name ASC, e.name ASC";
$stmt = $pdo->prepare($query);
$stmt->execute($params);
$equipmentList = $stmt->fetchAll();

// Fetch categories for filter dropdown
$categories = $pdo->query("SELECT * FROM categories ORDER BY name ASC")->fetchAll();

$pageTitle = "Equipment Catalog & Stock Availability";
include __DIR__ . '/../includes/header.php';
?>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    
    <?php include __DIR__ . '/../includes/alerts.php'; ?>

    <!-- Header & Quick Actions -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
            <div class="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-caramel/15 text-caramel border border-caramel/30 text-xs font-bold uppercase tracking-wider mb-2">
                <i class="fa-solid fa-boxes-stacked"></i> UPTM Campus Inventory
            </div>
            <h1 class="font-display text-2xl sm:text-3xl font-extrabold text-coffee-950 tracking-tight">
                Event Equipment Catalog (<span class="text-caramel">Equipment Catalog</span>)
            </h1>
            <p class="text-xs sm:text-sm text-coffee-600 mt-1">
                Check real-time stock availability, technical specifications, and store locations across campus.
            </p>
        </div>
        <div class="flex items-center space-x-2.5">
            <a href="<?= base_url('user/packages.php') ?>" class="inline-flex items-center px-4 py-2.5 rounded-2xl text-xs font-bold bg-coffee-900 text-amber-gold hover:bg-coffee-800 shadow-warm transition-all">
                <i class="fa-solid fa-cubes-stacked mr-1.5 text-caramel"></i> View Event Packages
            </a>
            <a href="<?= base_url('user/book.php') ?>" class="inline-flex items-center px-4 py-2.5 rounded-2xl text-xs font-bold bg-gradient-to-r from-caramel to-coffee-700 hover:from-caramel-hover hover:to-coffee-800 text-white shadow-warm transition-all">
                <i class="fa-solid fa-calendar-plus mr-1.5"></i> Manual Booking
            </a>
        </div>
    </div>

    <!-- Search & Filter Bar -->
    <div class="bg-white p-4 sm:p-5 rounded-3xl border border-coffee-200/90 shadow-warm mb-8">
        <form method="GET" action="" class="grid grid-cols-1 sm:grid-cols-12 gap-3">
            
            <div class="sm:col-span-5 relative">
                <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-coffee-400">
                    <i class="fa-solid fa-magnifying-glass"></i>
                </div>
                <input type="text" name="search" value="<?= sanitize($search) ?>" placeholder="Search name, brand/model, asset tag (e.g. UPTM/AV/001)..." class="w-full pl-10 pr-3.5 py-2.5 rounded-2xl border border-coffee-200 text-xs sm:text-sm bg-coffee-50/40 text-coffee-950 focus:bg-white focus:ring-2 focus:ring-caramel focus:border-caramel focus:outline-none transition-all">
            </div>

            <div class="sm:col-span-3">
                <select name="category" class="w-full px-3.5 py-2.5 rounded-2xl border border-coffee-200 text-xs sm:text-sm bg-coffee-50/40 text-coffee-950 focus:bg-white focus:ring-2 focus:ring-caramel focus:border-caramel focus:outline-none transition-all">
                    <option value="">All Categories</option>
                    <?php foreach ($categories as $cat): ?>
                        <option value="<?= $cat['id'] ?>" <?= $catFilter == $cat['id'] ? 'selected' : '' ?>>
                            <?= sanitize($cat['name']) ?>
                        </option>
                    <?php endforeach; ?>
                </select>
            </div>

            <div class="sm:col-span-2">
                <select name="status" class="w-full px-3.5 py-2.5 rounded-2xl border border-coffee-200 text-xs sm:text-sm bg-coffee-50/40 text-coffee-950 focus:bg-white focus:ring-2 focus:ring-caramel focus:border-caramel focus:outline-none transition-all">
                    <option value="">All Statuses</option>
                    <option value="available" <?= $statusFilter === 'available' ? 'selected' : '' ?>>In Stock Only</option>
                    <option value="unavailable" <?= $statusFilter === 'unavailable' ? 'selected' : '' ?>>Out of Stock / Maintenance</option>
                </select>
            </div>

            <div class="sm:col-span-2 flex space-x-2">
                <button type="submit" class="w-full py-2.5 px-4 bg-coffee-950 hover:bg-coffee-900 text-amber-gold rounded-2xl text-xs font-bold shadow-warm transition-all flex items-center justify-center">
                    <i class="fa-solid fa-filter mr-1.5"></i> Filter
                </button>
                <?php if (!empty($search) || !empty($catFilter) || !empty($statusFilter)): ?>
                    <a href="<?= base_url('user/equipment.php') ?>" class="p-2.5 bg-coffee-100 hover:bg-coffee-200 text-coffee-700 rounded-2xl text-xs transition-colors flex items-center justify-center" title="Reset Filters">
                        <i class="fa-solid fa-rotate-left"></i>
                    </a>
                <?php endif; ?>
            </div>

        </form>
    </div>

    <!-- Equipment Results Count -->
    <div class="mb-5 flex items-center justify-between text-xs text-coffee-600 font-medium">
        <span>Showing <strong class="text-coffee-900"><?= count($equipmentList) ?></strong> equipment records at UPTM</span>
        <?php if (!empty($search)): ?>
            <span>Search: <code class="bg-coffee-100 text-caramel px-2 py-0.5 rounded-lg font-mono">"<?= sanitize($search) ?>"</code></span>
        <?php endif; ?>
    </div>

    <!-- Equipment Cards Grid -->
    <?php if (empty($equipmentList)): ?>
        <div class="bg-white rounded-3xl border border-coffee-200 p-12 text-center text-coffee-400 shadow-warm">
            <div class="w-16 h-16 mx-auto rounded-3xl bg-coffee-100 flex items-center justify-center text-caramel mb-4 text-2xl">
                <i class="fa-solid fa-box-open"></i>
            </div>
            <h3 class="font-display text-base font-bold text-coffee-900">No equipment found</h3>
            <p class="text-xs text-coffee-500 mt-1">Try modifying your search keywords or resetting your filter options.</p>
            <a href="<?= base_url('user/equipment.php') ?>" class="inline-flex items-center px-4 py-2 mt-4 rounded-2xl text-xs font-bold bg-caramel text-white hover:bg-caramel-hover shadow-sm">
                Reset All Filters
            </a>
        </div>
    <?php else: ?>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <?php foreach ($equipmentList as $item): ?>
                <?php 
                    $isAvailable = ($item['available_qty'] > 0 && $item['item_status'] === 'Available');
                    $qtyPercentage = $item['total_qty'] > 0 ? ($item['available_qty'] / $item['total_qty']) * 100 : 0;
                ?>
                <div class="bg-white rounded-3xl border border-coffee-200/90 shadow-warm hover:shadow-warm-lg hover:border-caramel/40 transition-all flex flex-col justify-between overflow-hidden">
                    
                    <div class="p-6">
                        <!-- Top Tag & Condition -->
                        <div class="flex items-center justify-between gap-2 mb-3">
                            <span class="inline-flex items-center text-[10px] font-mono font-bold bg-coffee-100 text-coffee-800 px-2.5 py-0.5 rounded-xl border border-coffee-200">
                                <?= sanitize($item['asset_tag']) ?>
                            </span>
                            <?= conditionBadge($item['condition_status']) ?>
                        </div>

                        <!-- Category & Title -->
                        <span class="text-[10px] font-extrabold text-caramel uppercase tracking-wider block mb-1">
                            <i class="fa-solid <?= sanitize($item['category_icon']) ?> mr-1 text-coffee-400"></i> <?= sanitize($item['category_name']) ?>
                        </span>
                        
                        <h3 class="font-display font-bold text-coffee-950 text-base leading-snug">
                            <?= sanitize($item['name']) ?>
                        </h3>

                        <p class="text-xs font-medium text-coffee-600 mt-0.5">
                            <?= sanitize($item['brand_model']) ?>
                        </p>

                        <p class="text-xs text-coffee-600 mt-2.5 line-clamp-3 leading-relaxed">
                            <?= sanitize($item['description']) ?>
                        </p>

                        <!-- Storage Location -->
                        <div class="mt-4 pt-3.5 border-t border-coffee-100 flex items-center text-xs text-coffee-600">
                            <i class="fa-solid fa-location-dot mr-2 text-caramel"></i>
                            <span class="truncate">Storage Location: <strong class="text-coffee-900"><?= sanitize($item['location']) ?></strong></span>
                        </div>

                        <!-- Stock Progress Indicator -->
                        <div class="mt-3.5">
                            <div class="flex items-center justify-between text-[11px] mb-1.5 font-medium">
                                <span class="text-coffee-600">Stock Availability:</span>
                                <span class="font-bold <?= $item['available_qty'] > 0 ? 'text-emerald-700' : 'text-rose-600' ?>">
                                    <?= $item['available_qty'] ?> of <?= $item['total_qty'] ?> units
                                </span>
                            </div>
                            <div class="w-full bg-coffee-100 rounded-full h-2 overflow-hidden">
                                <div class="h-2 rounded-full <?= $item['available_qty'] > 0 ? 'bg-gradient-to-r from-emerald-500 to-teal-500' : 'bg-rose-500' ?>" style="width: <?= $qtyPercentage ?>%"></div>
                            </div>
                        </div>

                    </div>

                    <!-- Bottom Action Bar -->
                    <div class="p-4 bg-coffee-50/70 border-t border-coffee-100 flex items-center justify-between">
                        <?= equipmentStatusBadge($item['item_status'], (int)$item['available_qty']) ?>

                        <?php if ($isAvailable): ?>
                            <a href="<?= base_url('user/book.php?equipment_id=' . $item['id']) ?>" class="inline-flex items-center px-3.5 py-1.5 rounded-xl text-xs font-bold bg-coffee-950 hover:bg-coffee-900 text-amber-gold shadow-sm transition-all active:scale-95">
                                <i class="fa-solid fa-calendar-plus mr-1.5 text-caramel"></i> Book Item
                            </a>
                        <?php else: ?>
                            <button disabled class="inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-semibold bg-coffee-200 text-coffee-400 cursor-not-allowed">
                                Out of Stock
                            </button>
                        <?php endif; ?>
                    </div>

                </div>
            <?php endforeach; ?>
        </div>
    <?php endif; ?>

</div>

<?php include __DIR__ . '/../includes/footer.php'; ?>
