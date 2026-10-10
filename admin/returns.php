<?php
// Administrator Equipment Return Desk & Inspection - PinjamGeng
// Smart Event Equipment Booking and Inventory Management System (UPTM)

require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../config/auth.php';
require_once __DIR__ . '/../config/helpers.php';

requireAdmin();
$user = currentUser();

$selectedBookingId = isset($_GET['booking_id']) ? (int)$_GET['booking_id'] : null;

// Handle Return Submission
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'process_return') {
    $token = $_POST['csrf_token'] ?? '';
    if (!verifyCsrfToken($token)) {
        setFlash('error', 'Security check failed (CSRF token expired).');
    } else {
        $bookingId = (int)$_POST['booking_id'];
        $generalNotes = trim($_POST['general_notes'] ?? '');
        $itemConditions = $_POST['condition'] ?? []; // [booking_item_id => condition]
        $itemNotes = $_POST['item_notes'] ?? [];      // [booking_item_id => notes]

        try {
            $pdo->beginTransaction();

            // 1. Fetch booking items to inspect
            $itemsStmt = $pdo->prepare("
                SELECT bi.*, e.name as equipment_name, e.available_qty, e.total_qty
                FROM booking_items bi
                JOIN equipment e ON bi.equipment_id = e.id
                WHERE bi.booking_id = ?
            ");
            $itemsStmt->execute([$bookingId]);
            $loanItems = $itemsStmt->fetchAll();

            $hasDamagedItem = false;
            $damagedEquipmentList = [];

            foreach ($loanItems as $item) {
                $biId = $item['id'];
                $eqId = $item['equipment_id'];
                $qty = $item['quantity'];

                $cond = $itemConditions[$biId] ?? 'Good';
                $note = trim($itemNotes[$biId] ?? '');

                // Update booking item
                $updItem = $pdo->prepare("UPDATE booking_items SET return_condition = ?, return_notes = ? WHERE id = ?");
                $updItem->execute([$cond, $note, $biId]);

                // Insert into returns_log
                $logStmt = $pdo->prepare("
                    INSERT INTO returns_log (booking_id, equipment_id, received_by, return_datetime, condition_on_return, notes)
                    VALUES (?, ?, ?, NOW(), ?, ?)
                ");
                $logStmt->execute([$bookingId, $eqId, $user['id'], $cond, $note]);

                // Restore equipment inventory availability
                if ($cond === 'Damaged') {
                    $hasDamagedItem = true;
                    $damagedEquipmentList[] = $item['equipment_name'];
                    // Update equipment status to damaged / maintenance
                    $pdo->prepare("UPDATE equipment SET condition_status = 'Damaged', item_status = 'Under Maintenance' WHERE id = ?")->execute([$eqId]);
                    // Automatically create maintenance record ticket!
                    $maint = $pdo->prepare("
                        INSERT INTO maintenance_records (equipment_id, reported_by, issue_description, start_date, status)
                        VALUES (?, ?, ?, CURDATE(), 'Pending')
                    ");
                    $maint->execute([$eqId, $user['id'], "Returned in damaged condition from loan #{$bookingId}: " . ($note ?: 'Physical/electrical damage detected during counter inspection.')]);
                } else {
                    // Return to available stock
                    $pdo->prepare("UPDATE equipment SET available_qty = LEAST(total_qty, available_qty + ?) WHERE id = ?")->execute([$qty, $eqId]);
                }
            }

            // 2. Update booking record
            $updBooking = $pdo->prepare("
                UPDATE bookings 
                SET status = 'Returned', 
                    returned_at = NOW(), 
                    admin_remarks = CONCAT(COALESCE(admin_remarks, ''), '\n[Return Note]: ', ?)
                WHERE id = ?
            ");
            $updBooking->execute([$generalNotes ?: 'Equipment inspected and confirmed returned.', $bookingId]);

            $pdo->commit();

            if ($hasDamagedItem) {
                setFlash('info', "Return processed successfully. Notice: Damaged equipment detected; a maintenance ticket was automatically created.");
            } else {
                setFlash('success', "Return process complete! All equipment quantities have been restored to available inventory.");
            }

            header('Location: ' . base_url('admin/returns.php'));
            exit;

        } catch (Exception $e) {
            $pdo->rollBack();
            setFlash('error', "Failed to process return: " . $e->getMessage());
        }
    }
}

// Fetch currently borrowed loans needing return
$borrowedLoans = $pdo->query("
    SELECT b.*, u.full_name as applicant_name, u.matric_staff_id, u.phone as applicant_phone,
           (SELECT COUNT(*) FROM booking_items WHERE booking_id = b.id) as item_count,
           (SELECT SUM(quantity) FROM booking_items WHERE booking_id = b.id) as total_units
    FROM bookings b
    JOIN users u ON b.user_id = u.id
    WHERE b.status = 'Borrowed'
    ORDER BY b.end_datetime ASC
")->fetchAll();

// If a specific booking was selected to return
$activeBookingToReturn = null;
$returnItems = [];
if ($selectedBookingId) {
    $bStmt = $pdo->prepare("
        SELECT b.*, u.full_name as applicant_name, u.matric_staff_id, u.phone as applicant_phone
        FROM bookings b
        JOIN users u ON b.user_id = u.id
        WHERE b.id = ? AND b.status = 'Borrowed'
    ");
    $bStmt->execute([$selectedBookingId]);
    $activeBookingToReturn = $bStmt->fetch();

    if ($activeBookingToReturn) {
        $itStmt = $pdo->prepare("
            SELECT bi.*, e.asset_tag, e.name as equipment_name, e.brand_model, e.location, c.name as category_name
            FROM booking_items bi
            JOIN equipment e ON bi.equipment_id = e.id
            JOIN categories c ON e.category_id = c.id
            WHERE bi.booking_id = ?
        ");
        $itStmt->execute([$selectedBookingId]);
        $returnItems = $itStmt->fetchAll();
    }
}

// Fetch recent returns history
$recentReturns = $pdo->query("
    SELECT rl.*, b.booking_reference, b.event_name, e.name as equipment_name, e.asset_tag, u.full_name as received_by_name
    FROM returns_log rl
    JOIN bookings b ON rl.booking_id = b.id
    JOIN equipment e ON rl.equipment_id = e.id
    JOIN users u ON rl.received_by = u.id
    ORDER BY rl.return_datetime DESC
    LIMIT 10
")->fetchAll();

$pageTitle = "Equipment Return Desk";
include __DIR__ . '/../includes/header.php';
?>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    
    <?php include __DIR__ . '/../includes/alerts.php'; ?>

    <div class="mb-8">
        <div class="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-caramel/15 text-caramel border border-caramel/30 text-xs font-bold uppercase tracking-wider mb-2 font-display">
            <i class="fa-solid fa-rotate-left"></i> Counter & Physical Condition Inspection
        </div>
        <h1 class="font-display text-2xl sm:text-3xl font-extrabold text-coffee-950 tracking-tight">
            Equipment Return Desk <span class="text-caramel">PinjamGeng</span>
        </h1>
        <p class="text-xs sm:text-sm text-coffee-600 mt-1">
            Receive returned equipment, inspect physical condition for any damages, and restore quantities to store inventory.
        </p>
    </div>

    <!-- Active Return Modal / Box if selected -->
    <?php if ($activeBookingToReturn): ?>
        <div class="bg-white rounded-3xl border-2 border-caramel shadow-warm p-6 sm:p-8 mb-8 animate-fade-in">
            <div class="flex items-center justify-between pb-4 border-b border-coffee-100 mb-6">
                <div>
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-lg text-[10px] font-bold uppercase bg-caramel/20 text-caramel mb-1 font-display">
                        Return Counter Inspection Form
                    </span>
                    <h2 class="font-display text-xl font-bold text-coffee-950">
                        Process Return for Booking Ref: <?= sanitize($activeBookingToReturn['booking_reference']) ?>
                    </h2>
                    <p class="text-xs text-coffee-600">
                        Event: <strong class="text-coffee-900"><?= sanitize($activeBookingToReturn['event_name']) ?></strong> • Borrower: <strong class="text-coffee-900"><?= sanitize($activeBookingToReturn['applicant_name']) ?></strong> (<?= sanitize($activeBookingToReturn['applicant_phone']) ?>)
                    </p>
                </div>
                <a href="<?= base_url('admin/returns.php') ?>" class="text-xs font-semibold text-coffee-400 hover:text-coffee-600 p-2">
                    <i class="fa-solid fa-xmark text-lg"></i>
                </a>
            </div>

            <form method="POST" action="" class="space-y-6">
                <?= csrfField() ?>
                <input type="hidden" name="action" value="process_return">
                <input type="hidden" name="booking_id" value="<?= $activeBookingToReturn['id'] ?>">

                <div>
                    <h3 class="text-xs font-bold uppercase tracking-wider text-coffee-800 mb-3 font-display">
                        Equipment Unit Inspection:
                    </h3>
                    <div class="space-y-3">
                        <?php foreach ($returnItems as $it): ?>
                            <div class="p-4 rounded-2xl bg-coffee-50/70 border border-coffee-200/70 flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div class="flex items-center space-x-3">
                                    <span class="font-mono text-xs font-bold text-coffee-900 bg-white px-2.5 py-1 rounded-xl border border-coffee-200 shadow-sm">
                                        <?= sanitize($it['asset_tag']) ?>
                                    </span>
                                    <div>
                                        <span class="font-bold text-coffee-950 text-sm block"><?= $it['quantity'] ?>x <?= sanitize($it['equipment_name']) ?></span>
                                        <span class="text-xs text-coffee-600"><?= sanitize($it['brand_model']) ?> • Location: <?= sanitize($it['location']) ?></span>
                                    </div>
                                </div>

                                <div class="flex flex-col sm:flex-row items-center gap-3">
                                    <div class="w-full sm:w-44">
                                        <label class="block text-[10px] font-bold text-coffee-600 uppercase mb-1">Return Condition</label>
                                        <select name="condition[<?= $it['id'] ?>]" class="w-full px-3 py-1.5 rounded-xl border border-coffee-200 text-xs font-bold bg-white text-coffee-950 focus:ring-2 focus:ring-caramel">
                                            <option value="Good">Good (Normal/Intact)</option>
                                            <option value="Fair">Fair (Normal Wear)</option>
                                            <option value="Damaged">Damaged (Needs Service)</option>
                                            <option value="Lost">Lost / Missing</option>
                                        </select>
                                    </div>
                                    <div class="w-full sm:w-60">
                                        <label class="block text-[10px] font-bold text-coffee-600 uppercase mb-1">Inspection Notes</label>
                                        <input type="text" name="item_notes[<?= $it['id'] ?>]" placeholder="e.g. All accessories present, tested working" class="w-full px-3 py-1.5 rounded-xl border border-coffee-200 text-xs bg-white text-coffee-950 focus:ring-2 focus:ring-caramel">
                                    </div>
                                </div>
                            </div>
                        <?php endforeach; ?>
                    </div>
                </div>

                <div>
                    <label class="block text-xs font-bold text-coffee-800 uppercase tracking-wider mb-1.5">
                        Store Receiving Officer General Remarks (Optional)
                    </label>
                    <textarea name="general_notes" rows="2" placeholder="Notes on equipment integrity, cleanliness, and completeness upon return..." class="w-full px-3.5 py-2.5 border border-coffee-200 rounded-2xl text-xs bg-white text-coffee-950 focus:ring-2 focus:ring-caramel"></textarea>
                </div>

                <div class="flex items-center justify-end space-x-3 pt-4 border-t border-coffee-100">
                    <a href="<?= base_url('admin/returns.php') ?>" class="px-4 py-2.5 rounded-2xl text-xs font-bold bg-coffee-100 text-coffee-700 hover:bg-coffee-200">
                        Cancel
                    </a>
                    <button type="submit" class="px-6 py-2.5 rounded-2xl text-xs font-bold bg-gradient-to-r from-caramel to-coffee-800 hover:from-caramel-hover hover:to-coffee-900 text-white shadow-warm flex items-center">
                        <i class="fa-solid fa-clipboard-check mr-2"></i> Confirm Return & Update Inventory Stock
                    </button>
                </div>
            </form>
        </div>
    <?php endif; ?>

    <!-- Table 1: Equipment Currently Borrowed -->
    <div class="bg-white rounded-3xl border border-coffee-200/90 shadow-warm overflow-hidden mb-8">
        <div class="p-6 border-b border-coffee-100 flex items-center justify-between">
            <div>
                <h2 class="font-display font-bold text-coffee-950 text-base flex items-center">
                    <i class="fa-solid fa-hand-holding-box mr-2 text-caramel"></i> Active Loans Awaiting Return (<?= count($borrowedLoans) ?>)
                </h2>
                <p class="text-xs text-coffee-600">Equipment currently checked out by event organizers</p>
            </div>
        </div>

        <?php if (empty($borrowedLoans)): ?>
            <div class="p-10 text-center text-coffee-400 text-xs">
                <i class="fa-solid fa-box-open text-4xl mb-2 text-caramel/40"></i>
                <p class="font-display font-bold text-coffee-900 text-sm">All equipment has been returned to storage!</p>
                <p class="text-coffee-500 mt-0.5">There are no active loans at this time.</p>
            </div>
        <?php else: ?>
            <div class="overflow-x-auto">
                <table class="w-full text-left text-xs text-coffee-800">
                    <thead class="bg-coffee-100/80 text-coffee-900 uppercase font-bold text-[11px] border-b border-coffee-200 font-display">
                        <tr>
                            <th class="py-3.5 px-4">Ref No. / Event</th>
                            <th class="py-3.5 px-4">Borrower Contact</th>
                            <th class="py-3.5 px-4">Date Issued</th>
                            <th class="py-3.5 px-4">Expected Return</th>
                            <th class="py-3.5 px-4 text-center">Total Units</th>
                            <th class="py-3.5 px-4 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-coffee-100">
                        <?php foreach ($borrowedLoans as $bl): ?>
                            <tr class="hover:bg-coffee-50 transition-colors">
                                <td class="py-3.5 px-4">
                                    <span class="font-mono font-bold text-coffee-950 block"><?= sanitize($bl['booking_reference']) ?></span>
                                    <span class="font-semibold text-coffee-800 block truncate max-w-xs"><?= sanitize($bl['event_name']) ?></span>
                                    <span class="text-[10px] text-coffee-500"><?= sanitize($bl['event_location']) ?></span>
                                </td>
                                <td class="py-3.5 px-4">
                                    <span class="font-bold text-coffee-950 block"><?= sanitize($bl['applicant_name']) ?></span>
                                    <span class="text-[11px] text-coffee-600"><?= sanitize($bl['applicant_phone']) ?></span>
                                </td>
                                <td class="py-3.5 px-4 whitespace-nowrap text-coffee-600">
                                    <?= formatDateTime($bl['issued_at']) ?>
                                </td>
                                <td class="py-3.5 px-4 whitespace-nowrap">
                                    <span class="font-bold text-caramel block"><?= formatDateTime($bl['end_datetime'], 'd M Y, h:i A') ?></span>
                                </td>
                                <td class="py-3.5 px-4 text-center whitespace-nowrap">
                                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-lg font-bold bg-coffee-100 text-coffee-900">
                                        <?= $bl['total_units'] ?> units
                                    </span>
                                </td>
                                <td class="py-3.5 px-4 text-right whitespace-nowrap">
                                    <a href="<?= base_url('admin/returns.php?booking_id=' . $bl['id']) ?>" class="px-4 py-2 rounded-xl text-xs font-bold bg-coffee-950 hover:bg-coffee-900 text-amber-gold shadow-warm transition-all inline-flex items-center active:scale-95">
                                        <i class="fa-solid fa-rotate-left mr-1.5 text-caramel"></i> Inspect & Return
                                    </a>
                                </td>
                            </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            </div>
        <?php endif; ?>
    </div>

    <!-- Table 2: Recent Returns Inspection Log -->
    <div class="bg-white rounded-3xl border border-coffee-200/90 shadow-warm overflow-hidden">
        <div class="p-6 border-b border-coffee-100">
            <h2 class="font-display font-bold text-coffee-950 text-base flex items-center">
                <i class="fa-solid fa-clipboard-check mr-2 text-caramel"></i> Recent Return Inspection Logs
            </h2>
            <p class="text-xs text-coffee-600">Audit trail of returned equipment along with physical condition assessments</p>
        </div>

        <div class="overflow-x-auto">
            <table class="w-full text-left text-xs text-coffee-800">
                <thead class="bg-coffee-100/80 text-coffee-900 uppercase font-bold text-[11px] border-b border-coffee-200 font-display">
                    <tr>
                        <th class="py-3.5 px-4">Return Date/Time</th>
                        <th class="py-3.5 px-4">Ref No.</th>
                        <th class="py-3.5 px-4">Equipment Inspected</th>
                        <th class="py-3.5 px-4">Condition</th>
                        <th class="py-3.5 px-4">Inspector Remarks</th>
                        <th class="py-3.5 px-4">Receiving Officer</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-coffee-100">
                    <?php foreach ($recentReturns as $rr): ?>
                        <tr class="hover:bg-coffee-50 transition-colors">
                            <td class="py-3.5 px-4 whitespace-nowrap text-coffee-600">
                                <?= formatDateTime($rr['return_datetime']) ?>
                            </td>
                            <td class="py-3.5 px-4 font-mono font-bold text-coffee-950 whitespace-nowrap">
                                <?= sanitize($rr['booking_reference']) ?>
                            </td>
                            <td class="py-3.5 px-4">
                                <span class="font-bold text-coffee-950 block"><?= sanitize($rr['equipment_name']) ?></span>
                                <span class="font-mono text-[10px] text-coffee-500"><?= sanitize($rr['asset_tag']) ?></span>
                            </td>
                            <td class="py-3.5 px-4 whitespace-nowrap">
                                <?= conditionBadge($rr['condition_on_return']) ?>
                            </td>
                            <td class="py-3.5 px-4 text-coffee-700 max-w-xs truncate">
                                <?= sanitize($rr['notes'] ?: '-') ?>
                            </td>
                            <td class="py-3.5 px-4 text-coffee-900 font-semibold whitespace-nowrap">
                                <?= sanitize($rr['received_by_name']) ?>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
    </div>

</div>

<?php include __DIR__ . '/../includes/footer.php'; ?>
