<?php
// Administrator Equipment Categories Management - PinjamGeng
// Smart Event Equipment Booking and Inventory Management System (UPTM)

require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../config/auth.php';
require_once __DIR__ . '/../config/helpers.php';

requireAdmin();
$user = currentUser();

// Handle Form Submissions
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $token = $_POST['csrf_token'] ?? '';
    if (!verifyCsrfToken($token)) {
        setFlash('error', 'Security validation failed (CSRF token expired).');
    } else {
        $action = $_POST['action'] ?? '';

        if ($action === 'create') {
            $name = trim($_POST['name'] ?? '');
            $description = trim($_POST['description'] ?? '');
            $icon = trim($_POST['icon'] ?? 'fa-box');

            if (empty($name)) {
                setFlash('error', 'Category name is required.');
            } else {
                $chk = $pdo->prepare("SELECT COUNT(*) FROM categories WHERE name = ?");
                $chk->execute([$name]);
                if ($chk->fetchColumn() > 0) {
                    setFlash('error', 'A category with this name already exists.');
                } else {
                    $ins = $pdo->prepare("INSERT INTO categories (name, description, icon) VALUES (?, ?, ?)");
                    $ins->execute([$name, $description, $icon]);
                    setFlash('success', "Category '{$name}' created successfully.");
                    header('Location: ' . base_url('admin/categories.php'));
                    exit;
                }
            }

        } elseif ($action === 'update') {
            $id = (int)$_POST['id'];
            $name = trim($_POST['name'] ?? '');
            $description = trim($_POST['description'] ?? '');
            $icon = trim($_POST['icon'] ?? 'fa-box');

            $upd = $pdo->prepare("UPDATE categories SET name = ?, description = ?, icon = ? WHERE id = ?");
            $upd->execute([$name, $description, $icon, $id]);
            setFlash('success', 'Category updated successfully.');
            header('Location: ' . base_url('admin/categories.php'));
            exit;

        } elseif ($action === 'delete') {
            $id = (int)$_POST['id'];
            // Check if items exist
            $chk = $pdo->prepare("SELECT COUNT(*) FROM equipment WHERE category_id = ?");
            $chk->execute([$id]);
            if ($chk->fetchColumn() > 0) {
                setFlash('error', 'Cannot delete category: equipment items are still assigned to this category.');
            } else {
                $del = $pdo->prepare("DELETE FROM categories WHERE id = ?");
                $del->execute([$id]);
                setFlash('success', 'Category deleted successfully.');
                header('Location: ' . base_url('admin/categories.php'));
                exit;
            }
        }
    }
}

// Fetch categories with equipment counts
$categories = $pdo->query("
    SELECT c.*, COUNT(e.id) as item_count, COALESCE(SUM(e.total_qty), 0) as total_units
    FROM categories c
    LEFT JOIN equipment e ON c.id = e.category_id
    GROUP BY c.id
    ORDER BY c.name ASC
")->fetchAll();

$pageTitle = "Equipment Categories Management";
include __DIR__ . '/../includes/header.php';
?>

<div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    
    <?php include __DIR__ . '/../includes/alerts.php'; ?>

    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
            <div class="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-caramel/15 text-caramel border border-caramel/30 text-xs font-bold uppercase tracking-wider mb-2 font-display">
                <i class="fa-solid fa-tags"></i> Campus Inventory Classification
            </div>
            <h1 class="font-display text-2xl sm:text-3xl font-extrabold text-coffee-950 tracking-tight">
                Equipment Categories <span class="text-caramel">PinjamGeng</span>
            </h1>
            <p class="text-xs sm:text-sm text-coffee-600 mt-1">
                Organize campus event equipment into structured categories (Audio, Visual, Computing, Photography & Staging).
            </p>
        </div>
        <button onclick="document.getElementById('addCatModal').classList.remove('hidden')" class="px-5 py-2.5 rounded-2xl text-xs font-bold bg-gradient-to-r from-caramel to-coffee-800 hover:from-caramel-hover hover:to-coffee-900 text-white shadow-warm flex items-center transition-all">
            <i class="fa-solid fa-plus mr-2 text-amber-gold"></i> Add New Category
        </button>
    </div>

    <!-- Category Table -->
    <div class="bg-white rounded-3xl border border-coffee-200/90 shadow-warm overflow-hidden">
        <table class="w-full text-left text-xs text-coffee-800">
            <thead class="bg-coffee-100/80 text-coffee-900 uppercase font-bold text-[11px] border-b border-coffee-200 font-display">
                <tr>
                    <th class="py-3.5 px-4 w-12 text-center">Icon</th>
                    <th class="py-3.5 px-4">Category Name</th>
                    <th class="py-3.5 px-4">Description</th>
                    <th class="py-3.5 px-4 text-center">Equipment Models</th>
                    <th class="py-3.5 px-4 text-center">Total Units</th>
                    <th class="py-3.5 px-4 text-right">Actions</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-coffee-100">
                <?php foreach ($categories as $c): ?>
                    <tr class="hover:bg-coffee-50 transition-colors">
                        <td class="py-3.5 px-4 text-center">
                            <div class="w-9 h-9 rounded-2xl bg-coffee-100 text-caramel flex items-center justify-center text-sm mx-auto shadow-sm">
                                <i class="fa-solid <?= sanitize($c['icon'] ?: 'fa-box') ?>"></i>
                            </div>
                        </td>
                        <td class="py-3.5 px-4 font-bold text-coffee-950 font-display text-sm">
                            <?= sanitize($c['name']) ?>
                        </td>
                        <td class="py-3.5 px-4 text-coffee-600">
                            <?= sanitize($c['description']) ?>
                        </td>
                        <td class="py-3.5 px-4 text-center">
                            <span class="inline-flex items-center px-2.5 py-0.5 rounded-lg font-bold bg-coffee-100 text-coffee-900">
                                <?= $c['item_count'] ?> models
                            </span>
                        </td>
                        <td class="py-3.5 px-4 text-center font-bold text-coffee-950 font-display">
                            <?= $c['total_units'] ?> units
                        </td>
                        <td class="py-3.5 px-4 text-right whitespace-nowrap">
                            <div class="flex items-center justify-end space-x-1.5">
                                <button type="button" onclick='openEditModal(<?= json_encode($c) ?>)' class="p-2 rounded-xl text-xs font-semibold bg-coffee-100 hover:bg-caramel/20 hover:text-caramel text-coffee-800 transition-colors" title="Edit">
                                    <i class="fa-solid fa-pen-to-square"></i>
                                </button>
                                <?php if ($c['item_count'] == 0): ?>
                                    <form method="POST" action="" onsubmit="return confirm('Are you sure you want to delete this category?');" class="inline">
                                        <?= csrfField() ?>
                                        <input type="hidden" name="action" value="delete">
                                        <input type="hidden" name="id" value="<?= $c['id'] ?>">
                                        <button type="submit" class="p-2 rounded-xl text-xs font-semibold bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors" title="Delete">
                                            <i class="fa-solid fa-trash-can"></i>
                                        </button>
                                    </form>
                                <?php endif; ?>
                            </div>
                        </td>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>

</div>

<!-- Modal: Add Category -->
<div id="addCatModal" class="hidden fixed inset-0 z-50 bg-coffee-950/70 backdrop-blur-sm flex items-center justify-center p-4">
    <div class="bg-white rounded-3xl border border-coffee-200 shadow-2xl max-w-md w-full p-6 sm:p-8">
        <div class="flex items-center justify-between pb-4 border-b border-coffee-100 mb-5">
            <h3 class="font-display text-lg font-bold text-coffee-950">Add New Category</h3>
            <button type="button" onclick="document.getElementById('addCatModal').classList.add('hidden')" class="text-coffee-400 hover:text-coffee-600 p-1">
                <i class="fa-solid fa-xmark text-lg"></i>
            </button>
        </div>

        <form method="POST" action="" class="space-y-4">
            <?= csrfField() ?>
            <input type="hidden" name="action" value="create">
            <div>
                <label class="block text-xs font-bold text-coffee-800 uppercase tracking-wider mb-1">Category Name <span class="text-rose-500">*</span></label>
                <input type="text" name="name" required placeholder="e.g. Stage Equipment & Special Effects" class="w-full px-3.5 py-2.5 border border-coffee-200 rounded-2xl text-xs bg-coffee-50/50 text-coffee-950 focus:bg-white focus:ring-2 focus:ring-caramel focus:border-caramel focus:outline-none">
            </div>
            <div>
                <label class="block text-xs font-bold text-coffee-800 uppercase tracking-wider mb-1">FontAwesome Icon Class</label>
                <input type="text" name="icon" value="fa-box" placeholder="e.g. fa-video, fa-microphone, fa-laptop" class="w-full px-3.5 py-2.5 border border-coffee-200 rounded-2xl text-xs bg-coffee-50/50 text-coffee-950 focus:bg-white focus:ring-2 focus:ring-caramel focus:border-caramel focus:outline-none">
            </div>
            <div>
                <label class="block text-xs font-bold text-coffee-800 uppercase tracking-wider mb-1">Category Description</label>
                <textarea name="description" rows="3" placeholder="Describe the scope of equipment under this category..." class="w-full px-3.5 py-2.5 border border-coffee-200 rounded-2xl text-xs bg-coffee-50/50 text-coffee-950 focus:bg-white focus:ring-2 focus:ring-caramel focus:border-caramel focus:outline-none"></textarea>
            </div>
            <div class="pt-4 flex items-center justify-end space-x-3 border-t border-coffee-100">
                <button type="button" onclick="document.getElementById('addCatModal').classList.add('hidden')" class="px-4 py-2 rounded-2xl text-xs font-bold bg-coffee-100 text-coffee-700 hover:bg-coffee-200">
                    Cancel
                </button>
                <button type="submit" class="px-5 py-2 rounded-2xl text-xs font-bold bg-gradient-to-r from-caramel to-coffee-800 hover:from-caramel-hover hover:to-coffee-900 text-white shadow-warm">
                    Save Category
                </button>
            </div>
        </form>
    </div>
</div>

<!-- Modal: Edit Category -->
<div id="editCatModal" class="hidden fixed inset-0 z-50 bg-coffee-950/70 backdrop-blur-sm flex items-center justify-center p-4">
    <div class="bg-white rounded-3xl border border-coffee-200 shadow-2xl max-w-md w-full p-6 sm:p-8">
        <div class="flex items-center justify-between pb-4 border-b border-coffee-100 mb-5">
            <h3 class="font-display text-lg font-bold text-coffee-950">Edit Category</h3>
            <button type="button" onclick="document.getElementById('editCatModal').classList.add('hidden')" class="text-coffee-400 hover:text-coffee-600 p-1">
                <i class="fa-solid fa-xmark text-lg"></i>
            </button>
        </div>

        <form method="POST" action="" class="space-y-4">
            <?= csrfField() ?>
            <input type="hidden" name="action" value="update">
            <input type="hidden" name="id" id="edit_id">
            <div>
                <label class="block text-xs font-bold text-coffee-800 uppercase tracking-wider mb-1">Category Name</label>
                <input type="text" name="name" id="edit_name" required class="w-full px-3.5 py-2.5 border border-coffee-200 rounded-2xl text-xs bg-coffee-50/50 text-coffee-950 focus:bg-white focus:ring-2 focus:ring-caramel focus:border-caramel focus:outline-none">
            </div>
            <div>
                <label class="block text-xs font-bold text-coffee-800 uppercase tracking-wider mb-1">FontAwesome Icon Class</label>
                <input type="text" name="icon" id="edit_icon" class="w-full px-3.5 py-2.5 border border-coffee-200 rounded-2xl text-xs bg-coffee-50/50 text-coffee-950 focus:bg-white focus:ring-2 focus:ring-caramel focus:border-caramel focus:outline-none">
            </div>
            <div>
                <label class="block text-xs font-bold text-coffee-800 uppercase tracking-wider mb-1">Description</label>
                <textarea name="description" id="edit_desc" rows="3" class="w-full px-3.5 py-2.5 border border-coffee-200 rounded-2xl text-xs bg-coffee-50/50 text-coffee-950 focus:bg-white focus:ring-2 focus:ring-caramel focus:border-caramel focus:outline-none"></textarea>
            </div>
            <div class="pt-4 flex items-center justify-end space-x-3 border-t border-coffee-100">
                <button type="button" onclick="document.getElementById('editCatModal').classList.add('hidden')" class="px-4 py-2 rounded-2xl text-xs font-bold bg-coffee-100 text-coffee-700 hover:bg-coffee-200">
                    Cancel
                </button>
                <button type="submit" class="px-5 py-2 rounded-2xl text-xs font-bold bg-gradient-to-r from-caramel to-coffee-800 hover:from-caramel-hover hover:to-coffee-900 text-white shadow-warm">
                    Update Category
                </button>
            </div>
        </form>
    </div>
</div>

<script>
    function openEditModal(c) {
        document.getElementById('edit_id').value = c.id;
        document.getElementById('edit_name').value = c.name;
        document.getElementById('edit_icon').value = c.icon || 'fa-box';
        document.getElementById('edit_desc').value = c.description || '';
        document.getElementById('editCatModal').classList.remove('hidden');
    }
</script>

<?php include __DIR__ . '/../includes/footer.php'; ?>
