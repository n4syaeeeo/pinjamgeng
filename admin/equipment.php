<?php
// Administrator Equipment Inventory Management (CRUD) - PinjamGeng
// Smart Event Equipment Booking and Inventory Management System (UPTM)

require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../config/auth.php';
require_once __DIR__ . '/../config/helpers.php';

requireAdmin();
$user = currentUser();

$search = trim($_GET['search'] ?? '');
$categoryFilter = trim($_GET['category'] ?? '');

// Handle Form Submissions (Create, Update, Delete)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $token = $_POST['csrf_token'] ?? '';
    if (!verifyCsrfToken($token)) {
        setFlash('error', 'Security check failed (CSRF token expired).');
    } else {
        $action = $_POST['action'] ?? '';

        if ($action === 'create') {
            $category_id = (int)$_POST['category_id'];
            $asset_tag = trim($_POST['asset_tag'] ?? '');
            $name = trim($_POST['name'] ?? '');
            $brand_model = trim($_POST['brand_model'] ?? '');
            $description = trim($_POST['description'] ?? '');
            $total_qty = max(1, (int)$_POST['total_qty']);
            $available_qty = max(0, min($total_qty, (int)$_POST['available_qty']));
            $location = trim($_POST['location'] ?? 'Main IT Store / AV Lab');
            $condition_status = $_POST['condition_status'] ?? 'Good';
            $item_status = $_POST['item_status'] ?? 'Available';

            if (empty($asset_tag) || empty($name)) {
                setFlash('error', 'Asset Tag and Equipment Name are required.');
            } else {
                // Check tag uniqueness
                $chk = $pdo->prepare("SELECT COUNT(*) FROM equipment WHERE asset_tag = ?");
                $chk->execute([$asset_tag]);
                if ($chk->fetchColumn() > 0) {
                    setFlash('error', "Asset Tag '{$asset_tag}' already exists in the inventory database.");
                } else {
                    $ins = $pdo->prepare("
                        INSERT INTO equipment (category_id, asset_tag, name, brand_model, description, total_qty, available_qty, location, condition_status, item_status)
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    ");
                    $ins->execute([$category_id, $asset_tag, $name, $brand_model, $description, $total_qty, $available_qty, $location, $condition_status, $item_status]);
                    setFlash('success', "Equipment '{$name}' ({$asset_tag}) was successfully added to PinjamGeng.");
                    header('Location: ' . base_url('admin/equipment.php'));
                    exit;
                }
            }

        } elseif ($action === 'update') {
            $id = (int)$_POST['id'];
            $category_id = (int)$_POST['category_id'];
            $asset_tag = trim($_POST['asset_tag'] ?? '');
            $name = trim($_POST['name'] ?? '');
            $brand_model = trim($_POST['brand_model'] ?? '');
            $description = trim($_POST['description'] ?? '');
            $total_qty = max(1, (int)$_POST['total_qty']);
            $available_qty = max(0, (int)$_POST['available_qty']);
            $location = trim($_POST['location'] ?? 'Main IT Store / AV Lab');
            $condition_status = $_POST['condition_status'] ?? 'Good';
            $item_status = $_POST['item_status'] ?? 'Available';

            $upd = $pdo->prepare("
                UPDATE equipment 
                SET category_id = ?, asset_tag = ?, name = ?, brand_model = ?, description = ?, 
                    total_qty = ?, available_qty = ?, location = ?, condition_status = ?, item_status = ?
                WHERE id = ?
            ");
            $upd->execute([$category_id, $asset_tag, $name, $brand_model, $description, $total_qty, $available_qty, $location, $condition_status, $item_status, $id]);
            setFlash('success', "Equipment record '{$name}' was successfully updated.");
            header('Location: ' . base_url('admin/equipment.php'));
            exit;

        } elseif ($action === 'delete') {
            $id = (int)$_POST['id'];

            // Check if item has active loans
            $activeCheck = $pdo->prepare("
                SELECT COUNT(*) FROM booking_items bi
                JOIN bookings b ON bi.booking_id = b.id
                WHERE bi.equipment_id = ? AND b.status IN ('Approved', 'Borrowed')
            ");
            $activeCheck->execute([$id]);
            if ($activeCheck->fetchColumn() > 0) {
                setFlash('error', "Cannot delete equipment: There are approved requests or active loans currently using this item.");
            } else {
                $pdo->prepare("DELETE FROM package_items WHERE equipment_id = ?")->execute([$id]);
                $del = $pdo->prepare("DELETE FROM equipment WHERE id = ?");
                $del->execute([$id]);
                setFlash('success', "Equipment was successfully deleted from inventory records.");
                header('Location: ' . base_url('admin/equipment.php'));
                exit;
            }
        }
    }
}

// Fetch equipment list
$query = "
    SELECT e.*, c.name as category_name, c.icon as category_icon,
           (SELECT COUNT(*) FROM booking_items bi JOIN bookings b ON bi.booking_id = b.id WHERE bi.equipment_id = e.id AND b.status = 'Borrowed') as active_borrowed_count
    FROM equipment e
    JOIN categories c ON e.category_id = c.id
    WHERE 1=1
";
$params = [];

if (!empty($search)) {
    $query .= " AND (e.name LIKE ? OR e.asset_tag LIKE ? OR e.brand_model LIKE ? OR e.description LIKE ?)";
    $term = "%{$search}%";
    $params = array_merge($params, [$term, $term, $term, $term]);
}

if (!empty($categoryFilter)) {
    $query .= " AND e.category_id = ?";
    $params[] = $categoryFilter;
}

$query .= " ORDER BY c.name ASC, e.name ASC";
$stmt = $pdo->prepare($query);
$stmt->execute($params);
$equipmentList = $stmt->fetchAll();

// Fetch categories for modal dropdowns
$categories = $pdo->query("SELECT * FROM categories ORDER BY name ASC")->fetchAll();

$pageTitle = "Equipment Inventory Management";
include __DIR__ . '/../includes/header.php';
?>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    
    <?php include __DIR__ . '/../includes/alerts.php'; ?>

    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
            <div class="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-caramel/15 text-caramel border border-caramel/30 text-xs font-bold uppercase tracking-wider mb-2 font-display">
                <i class="fa-solid fa-boxes-stacked"></i> Asset Control & Store Inventory
            </div>
            <h1 class="font-display text-2xl sm:text-3xl font-extrabold text-coffee-950 tracking-tight">
                Inventory Management <span class="text-caramel">PinjamGeng</span>
            </h1>
            <p class="text-xs sm:text-sm text-coffee-600 mt-1">
                Register new equipment, update technical specs, review physical condition, and monitor stock availability on campus.
            </p>
        </div>
        <div class="flex items-center space-x-2.5">
            <button onclick="document.getElementById('addModal').classList.remove('hidden')" class="inline-flex items-center px-4 py-2.5 rounded-2xl text-xs font-bold bg-gradient-to-r from-caramel to-coffee-800 hover:from-caramel-hover hover:to-coffee-900 text-white shadow-warm transition-all">
                <i class="fa-solid fa-plus mr-1.5 text-amber-gold"></i> Add New Equipment
            </button>
            <a href="<?= base_url('admin/categories.php') ?>" class="inline-flex items-center px-4 py-2.5 rounded-2xl text-xs font-bold bg-white hover:bg-coffee-100 text-coffee-900 border border-coffee-200 shadow-sm transition-colors">
                <i class="fa-solid fa-tags mr-1.5 text-caramel"></i> Equipment Categories
            </a>
        </div>
    </div>

    <!-- Search & Filter Controls -->
    <div class="bg-white p-4 rounded-3xl border border-coffee-200/90 shadow-warm mb-6">
        <form method="GET" action="" class="flex flex-col sm:flex-row gap-3">
            <div class="relative flex-1">
                <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-coffee-400">
                    <i class="fa-solid fa-magnifying-glass"></i>
                </div>
                <input type="text" name="search" value="<?= sanitize($search) ?>" placeholder="Search equipment name, asset tag (e.g. UPTM/AV/001), or model..." class="w-full pl-10 pr-3.5 py-2.5 rounded-2xl border border-coffee-200 text-xs sm:text-sm bg-coffee-50/40 text-coffee-950 focus:bg-white focus:ring-2 focus:ring-caramel focus:border-caramel focus:outline-none transition-all">
            </div>

            <div class="w-full sm:w-64">
                <select name="category" class="w-full px-3.5 py-2.5 rounded-2xl border border-coffee-200 text-xs sm:text-sm bg-coffee-50/40 text-coffee-950 focus:bg-white focus:ring-2 focus:ring-caramel focus:border-caramel focus:outline-none transition-all">
                    <option value="">All Categories</option>
                    <?php foreach ($categories as $cat): ?>
                        <option value="<?= $cat['id'] ?>" <?= $categoryFilter == $cat['id'] ? 'selected' : '' ?>>
                            <?= sanitize($cat['name']) ?>
                        </option>
                    <?php endforeach; ?>
                </select>
            </div>

            <button type="submit" class="px-5 py-2.5 bg-coffee-950 hover:bg-coffee-900 text-amber-gold rounded-2xl text-xs font-bold shadow-warm transition-all">
                Filter
            </button>

            <?php if (!empty($search) || !empty($categoryFilter)): ?>
                <a href="<?= base_url('admin/equipment.php') ?>" class="px-4 py-2.5 bg-coffee-100 hover:bg-coffee-200 text-coffee-700 rounded-2xl text-xs font-bold flex items-center justify-center transition-colors">
                    Reset
                </a>
            <?php endif; ?>
        </form>
    </div>

    <!-- Equipment List Table -->
    <div class="bg-white rounded-3xl border border-coffee-200/90 shadow-warm overflow-hidden">
        <div class="p-5 border-b border-coffee-100 flex items-center justify-between text-xs text-coffee-600">
            <span>Total Equipment Records: <strong class="text-coffee-950"><?= count($equipmentList) ?></strong> items</span>
        </div>

        <div class="overflow-x-auto">
            <table class="w-full text-left text-xs text-coffee-800">
                <thead class="bg-coffee-100/80 text-coffee-900 uppercase font-bold text-[11px] border-b border-coffee-200 font-display">
                    <tr>
                        <th class="py-3.5 px-4">Tag No.</th>
                        <th class="py-3.5 px-4">Equipment Name & Model</th>
                        <th class="py-3.5 px-4">Category</th>
                        <th class="py-3.5 px-4 text-center">Stock (Available / Total)</th>
                        <th class="py-3.5 px-4">Physical Condition</th>
                        <th class="py-3.5 px-4">Status</th>
                        <th class="py-3.5 px-4">Storage Location</th>
                        <th class="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-coffee-100">
                    <?php foreach ($equipmentList as $eq): ?>
                        <tr class="hover:bg-coffee-50 transition-colors">
                            <td class="py-3.5 px-4 font-mono font-bold text-coffee-950 whitespace-nowrap">
                                <?= sanitize($eq['asset_tag']) ?>
                            </td>

                            <td class="py-3.5 px-4">
                                <span class="font-bold text-coffee-950 block"><?= sanitize($eq['name']) ?></span>
                                <span class="text-[11px] text-coffee-600 block truncate max-w-xs"><?= sanitize($eq['brand_model']) ?></span>
                            </td>

                            <td class="py-3.5 px-4 whitespace-nowrap">
                                <span class="inline-flex items-center text-coffee-800">
                                    <i class="fa-solid <?= sanitize($eq['category_icon']) ?> mr-1.5 text-caramel"></i>
                                    <?= sanitize($eq['category_name']) ?>
                                </span>
                            </td>

                            <td class="py-3.5 px-4 text-center whitespace-nowrap">
                                <span class="font-bold text-sm <?= $eq['available_qty'] > 0 ? 'text-emerald-700' : 'text-rose-600' ?>">
                                    <?= $eq['available_qty'] ?>
                                </span>
                                <span class="text-coffee-400">/ <?= $eq['total_qty'] ?></span>
                            </td>

                            <td class="py-3.5 px-4 whitespace-nowrap">
                                <?= conditionBadge($eq['condition_status']) ?>
                            </td>

                            <td class="py-3.5 px-4 whitespace-nowrap">
                                <?= equipmentStatusBadge($eq['item_status'], (int)$eq['available_qty']) ?>
                            </td>

                            <td class="py-3.5 px-4 whitespace-nowrap text-coffee-600">
                                <i class="fa-solid fa-location-dot mr-1 text-caramel text-[10px]"></i> <?= sanitize($eq['location']) ?>
                            </td>

                            <td class="py-3.5 px-4 text-right whitespace-nowrap">
                                <div class="flex items-center justify-end space-x-1.5">
                                    <button type="button" 
                                            onclick='openEditModal(<?= json_encode($eq) ?>)'
                                            class="p-2 rounded-xl text-xs font-semibold bg-coffee-100 hover:bg-caramel/20 hover:text-caramel text-coffee-800 transition-colors" title="Edit Equipment">
                                        <i class="fa-solid fa-pen-to-square"></i>
                                    </button>
                                    
                                    <form method="POST" action="" onsubmit="return confirm('Are you sure you want to delete this equipment from inventory?');" class="inline">
                                        <?= csrfField() ?>
                                        <input type="hidden" name="action" value="delete">
                                        <input type="hidden" name="id" value="<?= $eq['id'] ?>">
                                        <button type="submit" class="p-2 rounded-xl text-xs font-semibold bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors" title="Delete Equipment">
                                            <i class="fa-solid fa-trash-can"></i>
                                        </button>
                                    </form>
                                </div>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
    </div>

</div>

<!-- Modal 1: Add New Equipment -->
<div id="addModal" class="hidden fixed inset-0 z-50 bg-coffee-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
    <div class="bg-white rounded-3xl border border-coffee-200 shadow-2xl max-w-2xl w-full p-6 sm:p-8 my-8 max-h-[90vh] overflow-y-auto">
        <div class="flex items-center justify-between pb-4 border-b border-coffee-100 mb-5">
            <h3 class="font-display text-lg font-bold text-coffee-950 flex items-center">
                <i class="fa-solid fa-box-open mr-2 text-caramel"></i> Register New Equipment
            </h3>
            <button type="button" onclick="document.getElementById('addModal').classList.add('hidden')" class="text-coffee-400 hover:text-coffee-600 p-1">
                <i class="fa-solid fa-xmark text-lg"></i>
            </button>
        </div>

        <form method="POST" action="" class="space-y-4">
            <?= csrfField() ?>
            <input type="hidden" name="action" value="create">

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label class="block text-xs font-bold text-coffee-800 uppercase tracking-wider mb-1">Asset Tag / Serial No. <span class="text-rose-500">*</span></label>
                    <input type="text" name="asset_tag" required placeholder="e.g., UPTM/AV/008" class="w-full px-3.5 py-2.5 border border-coffee-200 rounded-2xl text-xs bg-coffee-50/50 text-coffee-950 focus:bg-white focus:ring-2 focus:ring-caramel focus:border-caramel focus:outline-none">
                </div>
                <div>
                    <label class="block text-xs font-bold text-coffee-800 uppercase tracking-wider mb-1">Equipment Category <span class="text-rose-500">*</span></label>
                    <select name="category_id" required class="w-full px-3.5 py-2.5 border border-coffee-200 rounded-2xl text-xs bg-coffee-50/50 text-coffee-950 focus:bg-white focus:ring-2 focus:ring-caramel focus:border-caramel focus:outline-none">
                        <?php foreach ($categories as $cat): ?>
                            <option value="<?= $cat['id'] ?>"><?= sanitize($cat['name']) ?></option>
                        <?php endforeach; ?>
                    </select>
                </div>
            </div>

            <div>
                <label class="block text-xs font-bold text-coffee-800 uppercase tracking-wider mb-1">Equipment Name <span class="text-rose-500">*</span></label>
                <input type="text" name="name" required placeholder="e.g., Sony Alpha 7 IV Mirrorless Camera" class="w-full px-3.5 py-2.5 border border-coffee-200 rounded-2xl text-xs bg-coffee-50/50 text-coffee-950 focus:bg-white focus:ring-2 focus:ring-caramel focus:border-caramel focus:outline-none">
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label class="block text-xs font-bold text-coffee-800 uppercase tracking-wider mb-1">Brand & Model</label>
                    <input type="text" name="brand_model" placeholder="e.g., Sony ILCE-7M4 / 33MP Full Frame" class="w-full px-3.5 py-2.5 border border-coffee-200 rounded-2xl text-xs bg-coffee-50/50 text-coffee-950 focus:bg-white focus:ring-2 focus:ring-caramel focus:border-caramel focus:outline-none">
                </div>
                <div>
                    <label class="block text-xs font-bold text-coffee-800 uppercase tracking-wider mb-1">Storage Location</label>
                    <input type="text" name="location" value="AV Lab Store Block C" placeholder="e.g., AV Lab Store Block C" class="w-full px-3.5 py-2.5 border border-coffee-200 rounded-2xl text-xs bg-coffee-50/50 text-coffee-950 focus:bg-white focus:ring-2 focus:ring-caramel focus:border-caramel focus:outline-none">
                </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div>
                    <label class="block text-xs font-bold text-coffee-800 uppercase tracking-wider mb-1">Total Units</label>
                    <input type="number" name="total_qty" value="1" min="1" required class="w-full px-3.5 py-2.5 border border-coffee-200 rounded-2xl text-xs bg-coffee-50/50 text-coffee-950 focus:bg-white focus:ring-2 focus:ring-caramel focus:border-caramel focus:outline-none">
                </div>
                <div>
                    <label class="block text-xs font-bold text-coffee-800 uppercase tracking-wider mb-1">Available Units</label>
                    <input type="number" name="available_qty" value="1" min="0" required class="w-full px-3.5 py-2.5 border border-coffee-200 rounded-2xl text-xs bg-coffee-50/50 text-coffee-950 focus:bg-white focus:ring-2 focus:ring-caramel focus:border-caramel focus:outline-none">
                </div>
                <div>
                    <label class="block text-xs font-bold text-coffee-800 uppercase tracking-wider mb-1">Condition</label>
                    <select name="condition_status" class="w-full px-3.5 py-2.5 border border-coffee-200 rounded-2xl text-xs bg-coffee-50/50 text-coffee-950 focus:bg-white focus:ring-2 focus:ring-caramel focus:border-caramel focus:outline-none">
                        <option value="Good">Good</option>
                        <option value="Fair">Fair Wear</option>
                        <option value="Needs Maintenance">Needs Maintenance</option>
                        <option value="Damaged">Damaged</option>
                    </select>
                </div>
                <div>
                    <label class="block text-xs font-bold text-coffee-800 uppercase tracking-wider mb-1">Status</label>
                    <select name="item_status" class="w-full px-3.5 py-2.5 border border-coffee-200 rounded-2xl text-xs bg-coffee-50/50 text-coffee-950 focus:bg-white focus:ring-2 focus:ring-caramel focus:border-caramel focus:outline-none">
                        <option value="Available">Available</option>
                        <option value="Borrowed">Borrowed</option>
                        <option value="Under Maintenance">Under Maintenance</option>
                        <option value="Damaged">Damaged</option>
                    </select>
                </div>
            </div>

            <div>
                <label class="block text-xs font-bold text-coffee-800 uppercase tracking-wider mb-1">Description & Specifications</label>
                <textarea name="description" rows="3" placeholder="Technical specs, included connection cables, carrying bag..." class="w-full px-3.5 py-2.5 border border-coffee-200 rounded-2xl text-xs bg-coffee-50/50 text-coffee-950 focus:bg-white focus:ring-2 focus:ring-caramel focus:border-caramel focus:outline-none"></textarea>
            </div>

            <div class="pt-4 flex items-center justify-end space-x-3 border-t border-coffee-100">
                <button type="button" onclick="document.getElementById('addModal').classList.add('hidden')" class="px-4 py-2.5 rounded-2xl text-xs font-bold bg-coffee-100 text-coffee-700 hover:bg-coffee-200">
                    Cancel
                </button>
                <button type="submit" class="px-5 py-2.5 rounded-2xl text-xs font-bold bg-gradient-to-r from-caramel to-coffee-800 hover:from-caramel-hover hover:to-coffee-900 text-white shadow-warm">
                    Save to PinjamGeng Inventory
                </button>
            </div>
        </form>
    </div>
</div>

<!-- Modal 2: Edit Equipment -->
<div id="editModal" class="hidden fixed inset-0 z-50 bg-coffee-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
    <div class="bg-white rounded-3xl border border-coffee-200 shadow-2xl max-w-2xl w-full p-6 sm:p-8 my-8 max-h-[90vh] overflow-y-auto">
        <div class="flex items-center justify-between pb-4 border-b border-coffee-100 mb-5">
            <h3 class="font-display text-lg font-bold text-coffee-950 flex items-center">
                <i class="fa-solid fa-pen-to-square mr-2 text-caramel"></i> Update Equipment Record
            </h3>
            <button type="button" onclick="document.getElementById('editModal').classList.add('hidden')" class="text-coffee-400 hover:text-coffee-600 p-1">
                <i class="fa-solid fa-xmark text-lg"></i>
            </button>
        </div>

        <form method="POST" action="" class="space-y-4">
            <?= csrfField() ?>
            <input type="hidden" name="action" value="update">
            <input type="hidden" name="id" id="edit_id">

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label class="block text-xs font-bold text-coffee-800 uppercase tracking-wider mb-1">Asset Tag No.</label>
                    <input type="text" name="asset_tag" id="edit_asset_tag" required class="w-full px-3.5 py-2.5 border border-coffee-200 rounded-2xl text-xs bg-coffee-50/50 text-coffee-950 focus:bg-white focus:ring-2 focus:ring-caramel focus:border-caramel focus:outline-none">
                </div>
                <div>
                    <label class="block text-xs font-bold text-coffee-800 uppercase tracking-wider mb-1">Category</label>
                    <select name="category_id" id="edit_category_id" required class="w-full px-3.5 py-2.5 border border-coffee-200 rounded-2xl text-xs bg-coffee-50/50 text-coffee-950 focus:bg-white focus:ring-2 focus:ring-caramel focus:border-caramel focus:outline-none">
                        <?php foreach ($categories as $cat): ?>
                            <option value="<?= $cat['id'] ?>"><?= sanitize($cat['name']) ?></option>
                        <?php endforeach; ?>
                    </select>
                </div>
            </div>

            <div>
                <label class="block text-xs font-bold text-coffee-800 uppercase tracking-wider mb-1">Equipment Name</label>
                <input type="text" name="name" id="edit_name" required class="w-full px-3.5 py-2.5 border border-coffee-200 rounded-2xl text-xs bg-coffee-50/50 text-coffee-950 focus:bg-white focus:ring-2 focus:ring-caramel focus:border-caramel focus:outline-none">
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label class="block text-xs font-bold text-coffee-800 uppercase tracking-wider mb-1">Brand & Model</label>
                    <input type="text" name="brand_model" id="edit_brand_model" class="w-full px-3.5 py-2.5 border border-coffee-200 rounded-2xl text-xs bg-coffee-50/50 text-coffee-950 focus:bg-white focus:ring-2 focus:ring-caramel focus:border-caramel focus:outline-none">
                </div>
                <div>
                    <label class="block text-xs font-bold text-coffee-800 uppercase tracking-wider mb-1">Storage Location</label>
                    <input type="text" name="location" id="edit_location" class="w-full px-3.5 py-2.5 border border-coffee-200 rounded-2xl text-xs bg-coffee-50/50 text-coffee-950 focus:bg-white focus:ring-2 focus:ring-caramel focus:border-caramel focus:outline-none">
                </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div>
                    <label class="block text-xs font-bold text-coffee-800 uppercase tracking-wider mb-1">Total Units</label>
                    <input type="number" name="total_qty" id="edit_total_qty" min="1" required class="w-full px-3.5 py-2.5 border border-coffee-200 rounded-2xl text-xs bg-coffee-50/50 text-coffee-950 focus:bg-white focus:ring-2 focus:ring-caramel focus:border-caramel focus:outline-none">
                </div>
                <div>
                    <label class="block text-xs font-bold text-coffee-800 uppercase tracking-wider mb-1">Available Units</label>
                    <input type="number" name="available_qty" id="edit_available_qty" min="0" required class="w-full px-3.5 py-2.5 border border-coffee-200 rounded-2xl text-xs bg-coffee-50/50 text-coffee-950 focus:bg-white focus:ring-2 focus:ring-caramel focus:border-caramel focus:outline-none">
                </div>
                <div>
                    <label class="block text-xs font-bold text-coffee-800 uppercase tracking-wider mb-1">Condition</label>
                    <select name="condition_status" id="edit_condition_status" class="w-full px-3.5 py-2.5 border border-coffee-200 rounded-2xl text-xs bg-coffee-50/50 text-coffee-950 focus:bg-white focus:ring-2 focus:ring-caramel focus:border-caramel focus:outline-none">
                        <option value="Good">Good</option>
                        <option value="Fair">Fair Wear</option>
                        <option value="Needs Maintenance">Needs Maintenance</option>
                        <option value="Damaged">Damaged</option>
                    </select>
                </div>
                <div>
                    <label class="block text-xs font-bold text-coffee-800 uppercase tracking-wider mb-1">Status</label>
                    <select name="item_status" id="edit_item_status" class="w-full px-3.5 py-2.5 border border-coffee-200 rounded-2xl text-xs bg-coffee-50/50 text-coffee-950 focus:bg-white focus:ring-2 focus:ring-caramel focus:border-caramel focus:outline-none">
                        <option value="Available">Available</option>
                        <option value="Borrowed">Borrowed</option>
                        <option value="Under Maintenance">Under Maintenance</option>
                        <option value="Damaged">Damaged</option>
                    </select>
                </div>
            </div>

            <div>
                <label class="block text-xs font-bold text-coffee-800 uppercase tracking-wider mb-1">Description & Specifications</label>
                <textarea name="description" id="edit_description" rows="3" class="w-full px-3.5 py-2.5 border border-coffee-200 rounded-2xl text-xs bg-coffee-50/50 text-coffee-950 focus:bg-white focus:ring-2 focus:ring-caramel focus:border-caramel focus:outline-none"></textarea>
            </div>

            <div class="pt-4 flex items-center justify-end space-x-3 border-t border-coffee-100">
                <button type="button" onclick="document.getElementById('editModal').classList.add('hidden')" class="px-4 py-2.5 rounded-2xl text-xs font-bold bg-coffee-100 text-coffee-700 hover:bg-coffee-200">
                    Cancel
                </button>
                <button type="submit" class="px-5 py-2.5 rounded-2xl text-xs font-bold bg-gradient-to-r from-caramel to-coffee-800 hover:from-caramel-hover hover:to-coffee-900 text-white shadow-warm">
                    Update Equipment
                </button>
            </div>
        </form>
    </div>
</div>

<script>
    function openEditModal(data) {
        document.getElementById('edit_id').value = data.id;
        document.getElementById('edit_asset_tag').value = data.asset_tag;
        document.getElementById('edit_category_id').value = data.category_id;
        document.getElementById('edit_name').value = data.name;
        document.getElementById('edit_brand_model').value = data.brand_model || '';
        document.getElementById('edit_location').value = data.location || '';
        document.getElementById('edit_total_qty').value = data.total_qty;
        document.getElementById('edit_available_qty').value = data.available_qty;
        document.getElementById('edit_condition_status').value = data.condition_status;
        document.getElementById('edit_item_status').value = data.item_status;
        document.getElementById('edit_description').value = data.description || '';
        
        document.getElementById('editModal').classList.remove('hidden');
    }
</script>

<?php include __DIR__ . '/../includes/footer.php'; ?>
