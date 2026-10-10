<?php
// Administrator Event Packages Management (FYP Objective 2) - PinjamGeng
// Smart Event Equipment Booking and Inventory Management System (UPTM)

require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../config/auth.php';
require_once __DIR__ . '/../config/helpers.php';

requireAdmin();
$user = currentUser();

// Handle Package Form Submissions
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $token = $_POST['csrf_token'] ?? '';
    if (!verifyCsrfToken($token)) {
        setFlash('error', 'Security check failed (CSRF token expired).');
    } else {
        $action = $_POST['action'] ?? '';

        if ($action === 'create_package') {
            $name = trim($_POST['name'] ?? '');
            $event_type = trim($_POST['event_type'] ?? 'Seminar');
            $description = trim($_POST['description'] ?? '');
            $target_audience = trim($_POST['target_audience'] ?? 'Students & Staff');
            $suggested_attendees = trim($_POST['suggested_attendees'] ?? '50 pax');
            $icon = trim($_POST['icon'] ?? 'fa-boxes-stacked');
            $badge_color = trim($_POST['badge_color'] ?? 'blue');

            if (empty($name) || empty($description)) {
                setFlash('error', 'Package name and description are required.');
            } else {
                $stmt = $pdo->prepare("
                    INSERT INTO packages (name, event_type, description, target_audience, suggested_attendees, icon, badge_color)
                    VALUES (?, ?, ?, ?, ?, ?, ?)
                ");
                $stmt->execute([$name, $event_type, $description, $target_audience, $suggested_attendees, $icon, $badge_color]);
                $newPkgId = $pdo->lastInsertId();
                setFlash('success', "Event Package '{$name}' was created successfully. You can now add equipment to this package.");
                header('Location: ' . base_url('admin/packages.php'));
                exit;
            }

        } elseif ($action === 'update_package') {
            $id = (int)$_POST['id'];
            $name = trim($_POST['name'] ?? '');
            $event_type = trim($_POST['event_type'] ?? 'Seminar');
            $description = trim($_POST['description'] ?? '');
            $target_audience = trim($_POST['target_audience'] ?? '');
            $suggested_attendees = trim($_POST['suggested_attendees'] ?? '');
            $icon = trim($_POST['icon'] ?? 'fa-boxes-stacked');
            $badge_color = trim($_POST['badge_color'] ?? 'blue');
            $is_active = isset($_POST['is_active']) ? 1 : 0;

            $stmt = $pdo->prepare("
                UPDATE packages 
                SET name = ?, event_type = ?, description = ?, target_audience = ?, 
                    suggested_attendees = ?, icon = ?, badge_color = ?, is_active = ?
                WHERE id = ?
            ");
            $stmt->execute([$name, $event_type, $description, $target_audience, $suggested_attendees, $icon, $badge_color, $is_active, $id]);
            setFlash('success', "Package details were successfully updated.");
            header('Location: ' . base_url('admin/packages.php'));
            exit;

        } elseif ($action === 'add_item') {
            $package_id = (int)$_POST['package_id'];
            $equipment_id = (int)$_POST['equipment_id'];
            $quantity = max(1, (int)$_POST['quantity']);
            $notes = trim($_POST['notes'] ?? '');

            // Check if item already in package
            $chk = $pdo->prepare("SELECT id FROM package_items WHERE package_id = ? AND equipment_id = ?");
            $chk->execute([$package_id, $equipment_id]);
            $existing = $chk->fetch();

            if ($existing) {
                $upd = $pdo->prepare("UPDATE package_items SET quantity = quantity + ?, notes = ? WHERE id = ?");
                $upd->execute([$quantity, $notes, $existing['id']]);
            } else {
                $ins = $pdo->prepare("INSERT INTO package_items (package_id, equipment_id, quantity, notes) VALUES (?, ?, ?, ?)");
                $ins->execute([$package_id, $equipment_id, $quantity, $notes]);
            }
            setFlash('success', "Equipment was successfully added to the event package.");
            header('Location: ' . base_url('admin/packages.php'));
            exit;

        } elseif ($action === 'remove_item') {
            $item_id = (int)$_POST['item_id'];
            $del = $pdo->prepare("DELETE FROM package_items WHERE id = ?");
            $del->execute([$item_id]);
            setFlash('success', "Equipment was successfully removed from the event package.");
            header('Location: ' . base_url('admin/packages.php'));
            exit;
        }
    }
}

// Fetch all packages
$packages = $pdo->query("SELECT * FROM packages ORDER BY id ASC")->fetchAll();

// Fetch all equipment for item selector dropdown
$allEquipment = $pdo->query("SELECT * FROM equipment WHERE item_status != 'Damaged' ORDER BY name ASC")->fetchAll();

// Fetch items for each package
$packageItemsMap = [];
$pItemsStmt = $pdo->query("
    SELECT pi.*, e.name as equipment_name, e.brand_model, e.available_qty, e.asset_tag
    FROM package_items pi
    JOIN equipment e ON pi.equipment_id = e.id
    ORDER BY pi.id ASC
");
while ($row = $pItemsStmt->fetch()) {
    $packageItemsMap[$row['package_id']][] = $row;
}

$pageTitle = "Event Packages Management (Star FYP)";
include __DIR__ . '/../includes/header.php';
?>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    
    <?php include __DIR__ . '/../includes/alerts.php'; ?>

    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
            <div class="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-caramel/15 text-caramel border border-caramel/30 text-xs font-bold uppercase tracking-wider mb-2 font-display">
                <i class="fa-solid fa-sparkles text-amber-gold"></i> Key Innovation Feature • UPTM FYP Objective 2
            </div>
            <h1 class="font-display text-2xl sm:text-3xl font-extrabold text-coffee-950 tracking-tight">
                Smart Event Packages (<span class="text-caramel">Event Packages</span>)
            </h1>
            <p class="text-xs sm:text-sm text-coffee-600 mt-1">
                Manage curated equipment bundles for Seminars, Workshops, Meetings, Media Coverage & Sports.
            </p>
        </div>
        <button onclick="document.getElementById('createPackageModal').classList.remove('hidden')" class="px-5 py-2.5 rounded-2xl text-xs font-bold bg-gradient-to-r from-caramel to-coffee-800 hover:from-caramel-hover hover:to-coffee-900 text-white shadow-warm flex items-center transition-all">
            <i class="fa-solid fa-plus mr-2 text-amber-gold"></i> Create New Package
        </button>
    </div>

    <!-- Packages List Cards -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <?php foreach ($packages as $pkg): ?>
            <?php $items = $packageItemsMap[$pkg['id']] ?? []; ?>
            <div class="bg-white rounded-3xl border border-coffee-200/90 shadow-warm p-6 sm:p-7 flex flex-col justify-between hover:shadow-warm-lg hover:border-caramel/40 transition-all">
                <div>
                    <!-- Top Badge & Edit Button -->
                    <div class="flex items-center justify-between mb-3">
                        <span class="inline-flex items-center px-3 py-1 rounded-xl text-xs font-bold bg-coffee-100 text-coffee-900 border border-coffee-200">
                            <i class="fa-solid <?= sanitize($pkg['icon']) ?> mr-1.5 text-caramel"></i> <?= sanitize($pkg['event_type']) ?> Package
                        </span>
                        <div class="flex items-center space-x-2">
                            <span class="text-xs">
                                <?= $pkg['is_active'] ? '<span class="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200 text-[10px]">Active</span>' : '<span class="text-rose-600 font-bold bg-rose-50 px-2 py-0.5 rounded-lg border border-rose-200 text-[10px]">Inactive</span>' ?>
                            </span>
                            <button type="button" onclick='openEditPackageModal(<?= json_encode($pkg) ?>)' class="p-2 text-xs text-coffee-700 hover:text-caramel rounded-xl bg-coffee-100 hover:bg-coffee-200 transition-colors" title="Edit Package Details">
                                <i class="fa-solid fa-pen-to-square"></i>
                            </button>
                        </div>
                    </div>

                    <h3 class="font-display text-lg font-bold text-coffee-950">
                        <?= sanitize($pkg['name']) ?>
                    </h3>
                    
                    <p class="text-xs text-coffee-600 mt-1 leading-relaxed">
                        <?= sanitize($pkg['description']) ?>
                    </p>

                    <div class="mt-2 text-[11px] text-coffee-500">
                        <span>Target: <strong class="text-coffee-800"><?= sanitize($pkg['target_audience']) ?></strong> (<?= sanitize($pkg['suggested_attendees']) ?>)</span>
                    </div>

                    <!-- Included Items Table -->
                    <div class="mt-5 pt-4 border-t border-coffee-100">
                        <div class="flex items-center justify-between mb-2">
                            <span class="text-xs font-bold text-coffee-800 uppercase tracking-wider font-display">
                                Package Items (<?= count($items) ?> items):
                            </span>
                            <button type="button" onclick="openAddItemModal(<?= $pkg['id'] ?>, '<?= addslashes($pkg['name']) ?>')" class="text-xs font-bold text-caramel hover:text-caramel-hover flex items-center">
                                <i class="fa-solid fa-plus mr-1"></i> Add Item
                            </button>
                        </div>

                        <div class="space-y-2">
                            <?php if (empty($items)): ?>
                                <p class="text-xs text-coffee-400 italic py-2">No equipment bundled in this package yet.</p>
                            <?php else: ?>
                                <?php foreach ($items as $it): ?>
                                    <div class="p-2.5 rounded-2xl bg-coffee-50/70 border border-coffee-200/60 flex items-center justify-between text-xs">
                                        <div class="flex items-center space-x-2.5 truncate">
                                            <span class="font-bold text-coffee-950 bg-white px-2.5 py-0.5 rounded-xl border border-coffee-200 shadow-sm">
                                                <?= $it['quantity'] ?>x
                                            </span>
                                            <div class="truncate">
                                                <span class="font-bold text-coffee-950 block truncate"><?= sanitize($it['equipment_name']) ?></span>
                                                <span class="text-[10px] text-coffee-500 block truncate"><?= sanitize($it['brand_model']) ?> • <?= sanitize($it['notes']) ?></span>
                                            </div>
                                        </div>
                                        <form method="POST" action="" onsubmit="return confirm('Remove this item from the package?');" class="ml-2">
                                            <?= csrfField() ?>
                                            <input type="hidden" name="action" value="remove_item">
                                            <input type="hidden" name="item_id" value="<?= $it['id'] ?>">
                                            <button type="submit" class="text-coffee-400 hover:text-rose-600 p-1" title="Remove from package">
                                                <i class="fa-solid fa-xmark"></i>
                                            </button>
                                        </form>
                                    </div>
                                <?php endforeach; ?>
                            <?php endif; ?>
                        </div>
                    </div>
                </div>

                <div class="mt-6 pt-4 border-t border-coffee-100 flex items-center justify-between text-xs text-coffee-600">
                    <span>Total package items: <strong class="text-coffee-950"><?= array_sum(array_column($items, 'quantity')) ?> units</strong></span>
                    <a href="<?= base_url('user/book.php?package_id=' . $pkg['id']) ?>" target="_blank" class="text-caramel hover:text-caramel-hover font-bold flex items-center">
                        Preview Form <i class="fa-solid fa-arrow-up-right-from-square ml-1.5 text-[10px]"></i>
                    </a>
                </div>
            </div>
        <?php endforeach; ?>
    </div>

</div>

<!-- Modal 1: Create Package -->
<div id="createPackageModal" class="hidden fixed inset-0 z-50 bg-coffee-950/70 backdrop-blur-sm flex items-center justify-center p-4">
    <div class="bg-white rounded-3xl border border-coffee-200 shadow-2xl max-w-lg w-full p-6 sm:p-8">
        <div class="flex items-center justify-between pb-4 border-b border-coffee-100 mb-5">
            <h3 class="font-display text-lg font-bold text-coffee-950">Create New Event Package</h3>
            <button type="button" onclick="document.getElementById('createPackageModal').classList.add('hidden')" class="text-coffee-400 hover:text-coffee-600 p-1">
                <i class="fa-solid fa-xmark text-lg"></i>
            </button>
        </div>

        <form method="POST" action="" class="space-y-4">
            <?= csrfField() ?>
            <input type="hidden" name="action" value="create_package">
            <div>
                <label class="block text-xs font-bold text-coffee-800 uppercase tracking-wider mb-1">Package Name <span class="text-rose-500">*</span></label>
                <input type="text" name="name" required placeholder="e.g., Cultural Stage & Performance Bundle" class="w-full px-3.5 py-2.5 border border-coffee-200 rounded-2xl text-xs bg-coffee-50/50 text-coffee-950 focus:bg-white focus:ring-2 focus:ring-caramel focus:border-caramel focus:outline-none">
            </div>

            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block text-xs font-bold text-coffee-800 uppercase tracking-wider mb-1">Event Type</label>
                    <select name="event_type" class="w-full px-3.5 py-2.5 border border-coffee-200 rounded-2xl text-xs bg-coffee-50/50 text-coffee-950 focus:bg-white focus:ring-2 focus:ring-caramel focus:border-caramel focus:outline-none">
                        <option value="Seminar">Seminar</option>
                        <option value="Workshop">Workshop</option>
                        <option value="Meeting">Meeting</option>
                        <option value="Photography">Photography</option>
                        <option value="Sports">Sports</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div>
                    <label class="block text-xs font-bold text-coffee-800 uppercase tracking-wider mb-1">FontAwesome Icon</label>
                    <input type="text" name="icon" value="fa-boxes-stacked" class="w-full px-3.5 py-2.5 border border-coffee-200 rounded-2xl text-xs bg-coffee-50/50 text-coffee-950 focus:bg-white focus:ring-2 focus:ring-caramel focus:border-caramel focus:outline-none">
                </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block text-xs font-bold text-coffee-800 uppercase tracking-wider mb-1">Target Audience</label>
                    <input type="text" name="target_audience" value="UPTM Students & Staff" class="w-full px-3.5 py-2.5 border border-coffee-200 rounded-2xl text-xs bg-coffee-50/50 text-coffee-950 focus:bg-white focus:ring-2 focus:ring-caramel focus:border-caramel focus:outline-none">
                </div>
                <div>
                    <label class="block text-xs font-bold text-coffee-800 uppercase tracking-wider mb-1">Suggested Attendees</label>
                    <input type="text" name="suggested_attendees" value="50 - 200 pax" class="w-full px-3.5 py-2.5 border border-coffee-200 rounded-2xl text-xs bg-coffee-50/50 text-coffee-950 focus:bg-white focus:ring-2 focus:ring-caramel focus:border-caramel focus:outline-none">
                </div>
            </div>

            <div>
                <label class="block text-xs font-bold text-coffee-800 uppercase tracking-wider mb-1">Package Description</label>
                <textarea name="description" rows="3" required placeholder="Describe event suitability and bundle functionality..." class="w-full px-3.5 py-2.5 border border-coffee-200 rounded-2xl text-xs bg-coffee-50/50 text-coffee-950 focus:bg-white focus:ring-2 focus:ring-caramel focus:border-caramel focus:outline-none"></textarea>
            </div>

            <div class="pt-4 flex items-center justify-end space-x-3 border-t border-coffee-100">
                <button type="button" onclick="document.getElementById('createPackageModal').classList.add('hidden')" class="px-4 py-2 rounded-2xl text-xs font-bold bg-coffee-100 text-coffee-700 hover:bg-coffee-200">
                    Cancel
                </button>
                <button type="submit" class="px-5 py-2.5 rounded-2xl text-xs font-bold bg-gradient-to-r from-caramel to-coffee-800 hover:from-caramel-hover hover:to-coffee-900 text-white shadow-warm">
                    Save Package
                </button>
            </div>
        </form>
    </div>
</div>

<!-- Modal 2: Add Equipment to Package -->
<div id="addItemModal" class="hidden fixed inset-0 z-50 bg-coffee-950/70 backdrop-blur-sm flex items-center justify-center p-4">
    <div class="bg-white rounded-3xl border border-coffee-200 shadow-2xl max-w-md w-full p-6 sm:p-8">
        <div class="flex items-center justify-between pb-4 border-b border-coffee-100 mb-5">
            <div>
                <h3 class="font-display text-base font-bold text-coffee-950">Add Equipment to Package</h3>
                <p id="addItemModalPkgName" class="text-xs text-caramel font-semibold"></p>
            </div>
            <button type="button" onclick="document.getElementById('addItemModal').classList.add('hidden')" class="text-coffee-400 hover:text-coffee-600 p-1">
                <i class="fa-solid fa-xmark text-lg"></i>
            </button>
        </div>

        <form method="POST" action="" class="space-y-4">
            <?= csrfField() ?>
            <input type="hidden" name="action" value="add_item">
            <input type="hidden" name="package_id" id="add_item_package_id">

            <div>
                <label class="block text-xs font-bold text-coffee-800 uppercase tracking-wider mb-1">Select Equipment</label>
                <select name="equipment_id" required class="w-full px-3.5 py-2.5 border border-coffee-200 rounded-2xl text-xs bg-coffee-50/50 text-coffee-950 focus:bg-white focus:ring-2 focus:ring-caramel focus:border-caramel focus:outline-none">
                    <?php foreach ($allEquipment as $eq): ?>
                        <option value="<?= $eq['id'] ?>">
                            [<?= sanitize($eq['asset_tag']) ?>] <?= sanitize($eq['name']) ?> (<?= $eq['available_qty'] ?> available)
                        </option>
                    <?php endforeach; ?>
                </select>
            </div>

            <div>
                <label class="block text-xs font-bold text-coffee-800 uppercase tracking-wider mb-1">Quantity in Package</label>
                <input type="number" name="quantity" value="1" min="1" required class="w-full px-3.5 py-2.5 border border-coffee-200 rounded-2xl text-xs bg-coffee-50/50 text-coffee-950 focus:bg-white focus:ring-2 focus:ring-caramel focus:border-caramel focus:outline-none">
            </div>

            <div>
                <label class="block text-xs font-bold text-coffee-800 uppercase tracking-wider mb-1">Notes / Equipment Role</label>
                <input type="text" name="notes" placeholder="e.g., Primary speaker wireless microphone" class="w-full px-3.5 py-2.5 border border-coffee-200 rounded-2xl text-xs bg-coffee-50/50 text-coffee-950 focus:bg-white focus:ring-2 focus:ring-caramel focus:border-caramel focus:outline-none">
            </div>

            <div class="pt-4 flex items-center justify-end space-x-3 border-t border-coffee-100">
                <button type="button" onclick="document.getElementById('addItemModal').classList.add('hidden')" class="px-4 py-2 rounded-2xl text-xs font-bold bg-coffee-100 text-coffee-700 hover:bg-coffee-200">
                    Cancel
                </button>
                <button type="submit" class="px-5 py-2.5 rounded-2xl text-xs font-bold bg-gradient-to-r from-caramel to-coffee-800 hover:from-caramel-hover hover:to-coffee-900 text-white shadow-warm">
                    Add to Package
                </button>
            </div>
        </form>
    </div>
</div>

<!-- Modal 3: Edit Package Details -->
<div id="editPackageModal" class="hidden fixed inset-0 z-50 bg-coffee-950/70 backdrop-blur-sm flex items-center justify-center p-4">
    <div class="bg-white rounded-3xl border border-coffee-200 shadow-2xl max-w-lg w-full p-6 sm:p-8">
        <div class="flex items-center justify-between pb-4 border-b border-coffee-100 mb-5">
            <h3 class="font-display text-lg font-bold text-coffee-950">Update Package Details</h3>
            <button type="button" onclick="document.getElementById('editPackageModal').classList.add('hidden')" class="text-coffee-400 hover:text-coffee-600 p-1">
                <i class="fa-solid fa-xmark text-lg"></i>
            </button>
        </div>

        <form method="POST" action="" class="space-y-4">
            <?= csrfField() ?>
            <input type="hidden" name="action" value="update_package">
            <input type="hidden" name="id" id="edit_pkg_id">

            <div>
                <label class="block text-xs font-bold text-coffee-800 uppercase tracking-wider mb-1">Package Name</label>
                <input type="text" name="name" id="edit_pkg_name" required class="w-full px-3.5 py-2.5 border border-coffee-200 rounded-2xl text-xs bg-coffee-50/50 text-coffee-950 focus:bg-white focus:ring-2 focus:ring-caramel focus:border-caramel focus:outline-none">
            </div>

            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block text-xs font-bold text-coffee-800 uppercase tracking-wider mb-1">Event Type</label>
                    <select name="event_type" id="edit_pkg_event_type" class="w-full px-3.5 py-2.5 border border-coffee-200 rounded-2xl text-xs bg-coffee-50/50 text-coffee-950 focus:bg-white focus:ring-2 focus:ring-caramel focus:border-caramel focus:outline-none">
                        <option value="Seminar">Seminar</option>
                        <option value="Workshop">Workshop</option>
                        <option value="Meeting">Meeting</option>
                        <option value="Photography">Photography</option>
                        <option value="Sports">Sports</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div>
                    <label class="block text-xs font-bold text-coffee-800 uppercase tracking-wider mb-1">FontAwesome Icon</label>
                    <input type="text" name="icon" id="edit_pkg_icon" class="w-full px-3.5 py-2.5 border border-coffee-200 rounded-2xl text-xs bg-coffee-50/50 text-coffee-950 focus:bg-white focus:ring-2 focus:ring-caramel focus:border-caramel focus:outline-none">
                </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block text-xs font-bold text-coffee-800 uppercase tracking-wider mb-1">Target Audience</label>
                    <input type="text" name="target_audience" id="edit_pkg_target" class="w-full px-3.5 py-2.5 border border-coffee-200 rounded-2xl text-xs bg-coffee-50/50 text-coffee-950 focus:bg-white focus:ring-2 focus:ring-caramel focus:border-caramel focus:outline-none">
                </div>
                <div>
                    <label class="block text-xs font-bold text-coffee-800 uppercase tracking-wider mb-1">Suggested Attendees</label>
                    <input type="text" name="suggested_attendees" id="edit_pkg_attendees" class="w-full px-3.5 py-2.5 border border-coffee-200 rounded-2xl text-xs bg-coffee-50/50 text-coffee-950 focus:bg-white focus:ring-2 focus:ring-caramel focus:border-caramel focus:outline-none">
                </div>
            </div>

            <div>
                <label class="block text-xs font-bold text-coffee-800 uppercase tracking-wider mb-1">Description</label>
                <textarea name="description" id="edit_pkg_desc" rows="3" class="w-full px-3.5 py-2.5 border border-coffee-200 rounded-2xl text-xs bg-coffee-50/50 text-coffee-950 focus:bg-white focus:ring-2 focus:ring-caramel focus:border-caramel focus:outline-none"></textarea>
            </div>

            <div class="pt-2">
                <label class="inline-flex items-center text-xs font-bold text-coffee-800">
                    <input type="checkbox" name="is_active" id="edit_pkg_active" class="rounded text-caramel focus:ring-caramel mr-2">
                    Package Active & Visible to Borrowers
                </label>
            </div>

            <div class="pt-4 flex items-center justify-end space-x-3 border-t border-coffee-100">
                <button type="button" onclick="document.getElementById('editPackageModal').classList.add('hidden')" class="px-4 py-2 rounded-2xl text-xs font-bold bg-coffee-100 text-coffee-700 hover:bg-coffee-200">
                    Cancel
                </button>
                <button type="submit" class="px-5 py-2.5 rounded-2xl text-xs font-bold bg-gradient-to-r from-caramel to-coffee-800 hover:from-caramel-hover hover:to-coffee-900 text-white shadow-warm">
                    Update Package
                </button>
            </div>
        </form>
    </div>
</div>

<script>
    function openAddItemModal(pkgId, pkgName) {
        document.getElementById('add_item_package_id').value = pkgId;
        document.getElementById('addItemModalPkgName').innerText = pkgName;
        document.getElementById('addItemModal').classList.remove('hidden');
    }

    function openEditPackageModal(pkg) {
        document.getElementById('edit_pkg_id').value = pkg.id;
        document.getElementById('edit_pkg_name').value = pkg.name;
        document.getElementById('edit_pkg_event_type').value = pkg.event_type;
        document.getElementById('edit_pkg_icon').value = pkg.icon;
        document.getElementById('edit_pkg_target').value = pkg.target_audience;
        document.getElementById('edit_pkg_attendees').value = pkg.suggested_attendees;
        document.getElementById('edit_pkg_desc').value = pkg.description;
        document.getElementById('edit_pkg_active').checked = (pkg.is_active == 1);
        document.getElementById('editPackageModal').classList.remove('hidden');
    }
</script>

<?php include __DIR__ . '/../includes/footer.php'; ?>
