<?php
// Administrator Equipment Maintenance & Repair Log - PinjamGeng
// Smart Event Equipment Booking and Inventory Management System (UPTM)

require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../config/auth.php';
require_once __DIR__ . '/../config/helpers.php';

requireAdmin();
$user = currentUser();

// Handle Maintenance Ticket Submissions
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $token = $_POST['csrf_token'] ?? '';
    if (!verifyCsrfToken($token)) {
        setFlash('error', 'Security check failed (CSRF token expired).');
    } else {
        $action = $_POST['action'] ?? '';

        if ($action === 'create_ticket') {
            $equipment_id = (int)$_POST['equipment_id'];
            $issue_description = trim($_POST['issue_description'] ?? '');
            $start_date = $_POST['start_date'] ?? date('Y-m-d');
            $service_vendor = trim($_POST['service_vendor'] ?? '');
            $cost = floatval($_POST['cost'] ?? 0);
            $status = $_POST['status'] ?? 'In Progress';

            if (empty($issue_description)) {
                setFlash('error', 'Issue description / service details are required.');
            } else {
                $stmt = $pdo->prepare("
                    INSERT INTO maintenance_records (equipment_id, reported_by, issue_description, start_date, service_vendor, cost, status)
                    VALUES (?, ?, ?, ?, ?, ?, ?)
                ");
                $stmt->execute([$equipment_id, $user['id'], $issue_description, $start_date, $service_vendor, $cost, $status]);

                // Update equipment status
                $pdo->prepare("UPDATE equipment SET item_status = 'Under Maintenance', condition_status = 'Needs Maintenance' WHERE id = ?")->execute([$equipment_id]);

                setFlash('success', 'Maintenance ticket successfully created.');
                header('Location: ' . base_url('admin/maintenance.php'));
                exit;
            }

        } elseif ($action === 'resolve_ticket') {
            $ticket_id = (int)$_POST['ticket_id'];
            $equipment_id = (int)$_POST['equipment_id'];
            $completion_date = $_POST['completion_date'] ?? date('Y-m-d');
            $final_cost = floatval($_POST['cost'] ?? 0);
            $resolution_notes = trim($_POST['resolution_notes'] ?? '');
            $status = $_POST['status'] ?? 'Completed';

            $upd = $pdo->prepare("
                UPDATE maintenance_records 
                SET completion_date = ?, cost = ?, resolution_notes = ?, status = ?
                WHERE id = ?
            ");
            $upd->execute([$completion_date, $final_cost, $resolution_notes, $status, $ticket_id]);

            if ($status === 'Completed') {
                // Restore equipment to active inventory
                $pdo->prepare("UPDATE equipment SET item_status = 'Available', condition_status = 'Good' WHERE id = ?")->execute([$equipment_id]);
                setFlash('success', 'Servicing complete! Equipment has been restored to Available status.');
            } else {
                setFlash('info', 'Maintenance record status has been updated.');
            }

            header('Location: ' . base_url('admin/maintenance.php'));
            exit;
        }
    }
}

// Fetch all maintenance records
$records = $pdo->query("
    SELECT mr.*, e.name as equipment_name, e.asset_tag, e.brand_model, e.location, u.full_name as reported_by_name
    FROM maintenance_records mr
    JOIN equipment e ON mr.equipment_id = e.id
    JOIN users u ON mr.reported_by = u.id
    ORDER BY FIELD(mr.status, 'Pending', 'In Progress', 'Completed', 'Scrapped'), mr.start_date DESC
")->fetchAll();

// Fetch equipment list for new ticket dropdown
$equipmentList = $pdo->query("SELECT id, name, asset_tag, brand_model FROM equipment ORDER BY name ASC")->fetchAll();

$pageTitle = "Equipment Maintenance Log";
include __DIR__ . '/../includes/header.php';
?>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    
    <?php include __DIR__ . '/../includes/alerts.php'; ?>

    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
            <div class="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-caramel/15 text-caramel border border-caramel/30 text-xs font-bold uppercase tracking-wider mb-2 font-display">
                <i class="fa-solid fa-wrench"></i> Servicing, Repairs & Asset Lifecycle
            </div>
            <h1 class="font-display text-2xl sm:text-3xl font-extrabold text-coffee-950 tracking-tight">
                Maintenance Log <span class="text-caramel">PinjamGeng</span>
            </h1>
            <p class="text-xs sm:text-sm text-coffee-600 mt-1">
                Track faulty equipment, registered repair vendors, servicing costs, and reactivate units back into campus inventory.
            </p>
        </div>
        <button onclick="document.getElementById('newTicketModal').classList.remove('hidden')" class="px-5 py-2.5 rounded-2xl text-xs font-bold bg-gradient-to-r from-caramel to-coffee-800 hover:from-caramel-hover hover:to-coffee-900 text-white shadow-warm flex items-center transition-all">
            <i class="fa-solid fa-wrench mr-2 text-amber-gold"></i> Open New Service Ticket
        </button>
    </div>

    <!-- Maintenance Records Table -->
    <div class="bg-white rounded-3xl border border-coffee-200/90 shadow-warm overflow-hidden">
        <div class="overflow-x-auto">
            <table class="w-full text-left text-xs text-coffee-800">
                <thead class="bg-coffee-100/80 text-coffee-900 uppercase font-bold text-[11px] border-b border-coffee-200 font-display">
                    <tr>
                        <th class="py-3.5 px-4">Ticket No. / Date</th>
                        <th class="py-3.5 px-4">Equipment</th>
                        <th class="py-3.5 px-4">Issue Description / Damage</th>
                        <th class="py-3.5 px-4">Vendor / Technician</th>
                        <th class="py-3.5 px-4 text-center">Service Cost (RM)</th>
                        <th class="py-3.5 px-4">Status</th>
                        <th class="py-3.5 px-4 text-right">Action</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-coffee-100">
                    <?php if (empty($records)): ?>
                        <tr>
                            <td colspan="7" class="p-10 text-center text-coffee-400">
                                No active equipment maintenance or repair records at this time.
                            </td>
                        </tr>
                    <?php else: ?>
                        <?php foreach ($records as $r): ?>
                            <tr class="hover:bg-coffee-50 transition-colors">
                                <td class="py-3.5 px-4 whitespace-nowrap">
                                    <span class="font-mono font-bold text-coffee-950 block">#MNT-<?= str_pad($r['id'], 3, '0', STR_PAD_LEFT) ?></span>
                                    <span class="text-[10px] text-coffee-500"><?= formatDateOnly($r['start_date']) ?></span>
                                </td>

                                <td class="py-3.5 px-4">
                                    <span class="font-bold text-coffee-950 block"><?= sanitize($r['equipment_name']) ?></span>
                                    <span class="font-mono text-[10px] text-coffee-500"><?= sanitize($r['asset_tag']) ?></span>
                                </td>

                                <td class="py-3.5 px-4 max-w-xs">
                                    <p class="text-coffee-900 font-medium line-clamp-2"><?= sanitize($r['issue_description']) ?></p>
                                    <?php if ($r['resolution_notes']): ?>
                                        <p class="text-[10px] text-emerald-700 mt-1 italic font-semibold">Action: <?= sanitize($r['resolution_notes']) ?></p>
                                    <?php endif; ?>
                                </td>

                                <td class="py-3.5 px-4 whitespace-nowrap text-coffee-700">
                                    <?= sanitize($r['service_vendor'] ?: 'UPTM AV Technical Support Unit') ?>
                                </td>

                                <td class="py-3.5 px-4 text-center whitespace-nowrap font-bold text-coffee-950 font-display">
                                    RM <?= number_format($r['cost'], 2) ?>
                                </td>

                                <td class="py-3.5 px-4 whitespace-nowrap">
                                    <?php if ($r['status'] === 'Completed'): ?>
                                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                                            <i class="fa-solid fa-check mr-1 text-emerald-600"></i> Completed
                                        </span>
                                    <?php elseif ($r['status'] === 'In Progress'): ?>
                                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
                                            <i class="fa-solid fa-gear fa-spin mr-1 text-caramel"></i> In Progress
                                        </span>
                                    <?php else: ?>
                                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-bold bg-rose-100 text-rose-800 border border-rose-300">
                                            <?= sanitize($r['status']) ?>
                                        </span>
                                    <?php endif; ?>
                                </td>

                                <td class="py-3.5 px-4 text-right whitespace-nowrap">
                                    <?php if ($r['status'] !== 'Completed' && $r['status'] !== 'Scrapped'): ?>
                                        <button type="button" onclick='openResolveModal(<?= json_encode($r) ?>)' class="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-coffee-950 hover:bg-coffee-900 text-amber-gold shadow-warm transition-all">
                                            Update / Complete
                                        </button>
                                    <?php else: ?>
                                        <span class="text-coffee-400 text-xs italic">Closed</span>
                                    <?php endif; ?>
                                </td>
                            </tr>
                        <?php endforeach; ?>
                    <?php endif; ?>
                </tbody>
            </table>
        </div>
    </div>

</div>

<!-- Modal: New Maintenance Ticket -->
<div id="newTicketModal" class="hidden fixed inset-0 z-50 bg-coffee-950/70 backdrop-blur-sm flex items-center justify-center p-4">
    <div class="bg-white rounded-3xl border border-coffee-200 shadow-2xl max-w-lg w-full p-6 sm:p-8">
        <div class="flex items-center justify-between pb-4 border-b border-coffee-100 mb-5">
            <h3 class="font-display text-lg font-bold text-coffee-950">Open New Maintenance Ticket</h3>
            <button type="button" onclick="document.getElementById('newTicketModal').classList.add('hidden')" class="text-coffee-400 hover:text-coffee-600 p-1">
                <i class="fa-solid fa-xmark text-lg"></i>
            </button>
        </div>

        <form method="POST" action="" class="space-y-4">
            <?= csrfField() ?>
            <input type="hidden" name="action" value="create_ticket">

            <div>
                <label class="block text-xs font-bold text-coffee-800 uppercase tracking-wider mb-1">Select Equipment <span class="text-rose-500">*</span></label>
                <select name="equipment_id" required class="w-full px-3.5 py-2.5 border border-coffee-200 rounded-2xl text-xs bg-coffee-50/50 text-coffee-950 focus:bg-white focus:ring-2 focus:ring-caramel focus:border-caramel focus:outline-none">
                    <?php foreach ($equipmentList as $eq): ?>
                        <option value="<?= $eq['id'] ?>">
                            [<?= sanitize($eq['asset_tag']) ?>] <?= sanitize($eq['name']) ?>
                        </option>
                    <?php endforeach; ?>
                </select>
            </div>

            <div>
                <label class="block text-xs font-bold text-coffee-800 uppercase tracking-wider mb-1">Issue Description / Damage Details <span class="text-rose-500">*</span></label>
                <textarea name="issue_description" rows="3" required placeholder="Describe symptoms of malfunction, broken components, or routine service requirements..." class="w-full px-3.5 py-2.5 border border-coffee-200 rounded-2xl text-xs bg-coffee-50/50 text-coffee-950 focus:bg-white focus:ring-2 focus:ring-caramel focus:border-caramel focus:outline-none"></textarea>
            </div>

            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block text-xs font-bold text-coffee-800 uppercase tracking-wider mb-1">Service Vendor / Technician</label>
                    <input type="text" name="service_vendor" placeholder="e.g., Epson Malaysia / Internal IT Team" class="w-full px-3.5 py-2.5 border border-coffee-200 rounded-2xl text-xs bg-coffee-50/50 text-coffee-950 focus:bg-white focus:ring-2 focus:ring-caramel focus:border-caramel focus:outline-none">
                </div>
                <div>
                    <label class="block text-xs font-bold text-coffee-800 uppercase tracking-wider mb-1">Estimated Cost (RM)</label>
                    <input type="number" step="0.01" name="cost" value="0.00" class="w-full px-3.5 py-2.5 border border-coffee-200 rounded-2xl text-xs bg-coffee-50/50 text-coffee-950 focus:bg-white focus:ring-2 focus:ring-caramel focus:border-caramel focus:outline-none">
                </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block text-xs font-bold text-coffee-800 uppercase tracking-wider mb-1">Start Date</label>
                    <input type="date" name="start_date" value="<?= date('Y-m-d') ?>" class="w-full px-3.5 py-2.5 border border-coffee-200 rounded-2xl text-xs bg-coffee-50/50 text-coffee-950 focus:bg-white focus:ring-2 focus:ring-caramel focus:border-caramel focus:outline-none">
                </div>
                <div>
                    <label class="block text-xs font-bold text-coffee-800 uppercase tracking-wider mb-1">Initial Status</label>
                    <select name="status" class="w-full px-3.5 py-2.5 border border-coffee-200 rounded-2xl text-xs bg-coffee-50/50 text-coffee-950 focus:bg-white focus:ring-2 focus:ring-caramel focus:border-caramel focus:outline-none">
                        <option value="In Progress">In Progress</option>
                        <option value="Pending">Pending (Awaiting Quotation)</option>
                    </select>
                </div>
            </div>

            <div class="pt-4 flex items-center justify-end space-x-3 border-t border-coffee-100">
                <button type="button" onclick="document.getElementById('newTicketModal').classList.add('hidden')" class="px-4 py-2 rounded-2xl text-xs font-bold bg-coffee-100 text-coffee-700 hover:bg-coffee-200">
                    Cancel
                </button>
                <button type="submit" class="px-5 py-2.5 rounded-2xl text-xs font-bold bg-gradient-to-r from-caramel to-coffee-800 hover:from-caramel-hover hover:to-coffee-900 text-white shadow-warm">
                    Create Service Ticket
                </button>
            </div>
        </form>
    </div>
</div>

<!-- Modal: Resolve Maintenance Ticket -->
<div id="resolveModal" class="hidden fixed inset-0 z-50 bg-coffee-950/70 backdrop-blur-sm flex items-center justify-center p-4">
    <div class="bg-white rounded-3xl border border-coffee-200 shadow-2xl max-w-lg w-full p-6 sm:p-8">
        <div class="flex items-center justify-between pb-4 border-b border-coffee-100 mb-5">
            <div>
                <h3 class="font-display text-lg font-bold text-coffee-950">Resolve / Update Maintenance</h3>
                <p id="resEquipName" class="text-xs text-caramel font-semibold"></p>
            </div>
            <button type="button" onclick="document.getElementById('resolveModal').classList.add('hidden')" class="text-coffee-400 hover:text-coffee-600 p-1">
                <i class="fa-solid fa-xmark text-lg"></i>
            </button>
        </div>

        <form method="POST" action="" class="space-y-4">
            <?= csrfField() ?>
            <input type="hidden" name="action" value="resolve_ticket">
            <input type="hidden" name="ticket_id" id="res_ticket_id">
            <input type="hidden" name="equipment_id" id="res_equipment_id">

            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block text-xs font-bold text-coffee-800 uppercase tracking-wider mb-1">Updated Status</label>
                    <select name="status" class="w-full px-3.5 py-2.5 border border-coffee-200 rounded-2xl text-xs bg-coffee-50/50 text-coffee-950 focus:bg-white focus:ring-2 focus:ring-caramel focus:border-caramel focus:outline-none">
                        <option value="Completed">Completed (Restored to Stock)</option>
                        <option value="In Progress">In Progress (Under Service)</option>
                        <option value="Scrapped">Scrapped (Decommissioned)</option>
                    </select>
                </div>
                <div>
                    <label class="block text-xs font-bold text-coffee-800 uppercase tracking-wider mb-1">Completion Date</label>
                    <input type="date" name="completion_date" value="<?= date('Y-m-d') ?>" class="w-full px-3.5 py-2.5 border border-coffee-200 rounded-2xl text-xs bg-coffee-50/50 text-coffee-950 focus:bg-white focus:ring-2 focus:ring-caramel focus:border-caramel focus:outline-none">
                </div>
            </div>

            <div>
                <label class="block text-xs font-bold text-coffee-800 uppercase tracking-wider mb-1">Final Repair Cost (RM)</label>
                <input type="number" step="0.01" name="cost" id="res_cost" class="w-full px-3.5 py-2.5 border border-coffee-200 rounded-2xl text-xs bg-coffee-50/50 text-coffee-950 focus:bg-white focus:ring-2 focus:ring-caramel focus:border-caramel focus:outline-none">
            </div>

            <div>
                <label class="block text-xs font-bold text-coffee-800 uppercase tracking-wider mb-1">Action Notes & Component Replacement</label>
                <textarea name="resolution_notes" rows="3" placeholder="Parts replaced, functionality test results..." class="w-full px-3.5 py-2.5 border border-coffee-200 rounded-2xl text-xs bg-coffee-50/50 text-coffee-950 focus:bg-white focus:ring-2 focus:ring-caramel focus:border-caramel focus:outline-none"></textarea>
            </div>

            <div class="pt-4 flex items-center justify-end space-x-3 border-t border-coffee-100">
                <button type="button" onclick="document.getElementById('resolveModal').classList.add('hidden')" class="px-4 py-2 rounded-2xl text-xs font-bold bg-coffee-100 text-coffee-700 hover:bg-coffee-200">
                    Cancel
                </button>
                <button type="submit" class="px-5 py-2.5 rounded-2xl text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white shadow-warm">
                    Save Resolution
                </button>
            </div>
        </form>
    </div>
</div>

<script>
    function openResolveModal(data) {
        document.getElementById('res_ticket_id').value = data.id;
        document.getElementById('res_equipment_id').value = data.equipment_id;
        document.getElementById('resEquipName').innerText = `[${data.asset_tag}] ${data.equipment_name}`;
        document.getElementById('res_cost').value = data.cost || 0.00;
        document.getElementById('resolveModal').classList.remove('hidden');
    }
</script>

<?php include __DIR__ . '/../includes/footer.php'; ?>
