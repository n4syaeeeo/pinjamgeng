<?php
// Administrator Booking Review & Action Handler - PinjamGeng
// Smart Event Equipment Booking and Inventory Management System (UPTM)

require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../config/auth.php';
require_once __DIR__ . '/../config/helpers.php';

requireAdmin();
$user = currentUser();
$bookingId = (int)($_GET['id'] ?? 0);

// Fetch booking details
$stmt = $pdo->prepare("
    SELECT b.*, p.name as package_name,
           u_app.full_name as applicant_name, u_app.matric_staff_id as applicant_matric, 
           u_app.email as applicant_email, u_app.phone as applicant_phone, u_app.faculty_department as applicant_faculty,
           u_adm.full_name as approved_by_name
    FROM bookings b
    JOIN users u_app ON b.user_id = u_app.id
    LEFT JOIN packages p ON b.package_id = p.id
    LEFT JOIN users u_adm ON b.approved_by = u_adm.id
    WHERE b.id = ?
");
$stmt->execute([$bookingId]);
$booking = $stmt->fetch();

if (!$booking) {
    setFlash('error', 'Booking record not found.');
    header('Location: ' . base_url('admin/bookings.php'));
    exit;
}

// Fetch items
$itemsStmt = $pdo->prepare("
    SELECT bi.*, e.asset_tag, e.name as equipment_name, e.brand_model, e.location, e.available_qty, e.total_qty, c.name as category_name
    FROM booking_items bi
    JOIN equipment e ON bi.equipment_id = e.id
    JOIN categories c ON e.category_id = c.id
    WHERE bi.booking_id = ?
    ORDER BY c.name ASC, e.name ASC
");
$itemsStmt->execute([$bookingId]);
$items = $itemsStmt->fetchAll();

// Handle Admin Decisions (Approve, Reject, Issue)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $token = $_POST['csrf_token'] ?? '';
    if (!verifyCsrfToken($token)) {
        setFlash('error', 'Security check failed (CSRF token expired).');
    } else {
        $action = $_POST['admin_action'] ?? '';
        $remarks = trim($_POST['admin_remarks'] ?? '');

        if ($action === 'approve') {
            try {
                $pdo->beginTransaction();

                // Verify stock and deduct
                foreach ($items as $it) {
                    if ($it['available_qty'] < $it['quantity']) {
                        throw new Exception("Approval failed: Insufficient stock for '{$it['equipment_name']}'. Only {$it['available_qty']} units available.");
                    }
                    // Deduct from available quantity
                    $deductStmt = $pdo->prepare("UPDATE equipment SET available_qty = available_qty - ? WHERE id = ?");
                    $deductStmt->execute([$it['quantity'], $it['equipment_id']]);
                }

                // Update booking status
                $upd = $pdo->prepare("
                    UPDATE bookings 
                    SET status = 'Approved', 
                        approved_by = ?, 
                        approved_at = NOW(), 
                        admin_remarks = ?
                    WHERE id = ?
                ");
                $upd->execute([$user['id'], $remarks, $bookingId]);

                $pdo->commit();
                setFlash('success', "Booking {$booking['booking_reference']} has been APPROVED and inventory stock has been allocated.");
                header("Location: " . base_url('admin/booking_view.php?id=' . $bookingId));
                exit;

            } catch (Exception $e) {
                $pdo->rollBack();
                setFlash('error', $e->getMessage());
            }

        } elseif ($action === 'reject') {
            $upd = $pdo->prepare("
                UPDATE bookings 
                SET status = 'Rejected', 
                    approved_by = ?, 
                    approved_at = NOW(), 
                    admin_remarks = ?
                WHERE id = ?
            ");
            $upd->execute([$user['id'], $remarks ?: 'Request rejected by lab administrator.', $bookingId]);

            setFlash('info', "Booking {$booking['booking_reference']} has been rejected.");
            header("Location: " . base_url('admin/booking_view.php?id=' . $bookingId));
            exit;

        } elseif ($action === 'issue') {
            // Equipment handed over to borrower
            $upd = $pdo->prepare("UPDATE bookings SET status = 'Borrowed', issued_at = NOW() WHERE id = ?");
            $upd->execute([$bookingId]);

            setFlash('success', "Equipment officially handed over to {$booking['applicant_name']}. Loan status is now ACTIVE.");
            header("Location: " . base_url('admin/booking_view.php?id=' . $bookingId));
            exit;
        }
    }
}

$pageTitle = "Review Booking #" . $booking['booking_reference'];
include __DIR__ . '/../includes/header.php';
?>

<div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    
    <?php include __DIR__ . '/../includes/alerts.php'; ?>

    <div class="flex items-center justify-between mb-6">
        <a href="<?= base_url('admin/bookings.php') ?>" class="text-xs font-bold text-coffee-600 hover:text-caramel transition-colors flex items-center">
            <i class="fa-solid fa-arrow-left mr-2"></i> Back to Booking Requests
        </a>
        <div class="flex items-center space-x-2.5">
            <a href="<?= base_url('user/print_slip.php?id=' . $booking['id']) ?>" target="_blank" class="inline-flex items-center px-4 py-2 rounded-2xl text-xs font-bold bg-coffee-950 text-amber-gold hover:bg-coffee-900 shadow-warm transition-all">
                <i class="fa-solid fa-print mr-2 text-caramel"></i> Print Official Slip
            </a>
            <?php if ($booking['status'] === 'Borrowed'): ?>
                <a href="<?= base_url('admin/returns.php?booking_id=' . $booking['id']) ?>" class="inline-flex items-center px-4 py-2 rounded-2xl text-xs font-bold bg-caramel hover:bg-caramel-hover text-white shadow-warm transition-all">
                    <i class="fa-solid fa-rotate-left mr-1.5"></i> Return Desk
                </a>
            <?php endif; ?>
        </div>
    </div>

    <!-- Booking Overview Card -->
    <div class="bg-white rounded-3xl border border-coffee-200/90 shadow-warm p-6 sm:p-8 mb-6">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-coffee-100 gap-4">
            <div>
                <div class="flex items-center space-x-2">
                    <span class="font-mono text-xs font-bold text-coffee-900 bg-coffee-100 px-2.5 py-0.5 rounded-xl border border-coffee-200">
                        <?= sanitize($booking['booking_reference']) ?>
                    </span>
                    <span class="text-xs text-coffee-500">Submitted: <?= formatDateTime($booking['created_at']) ?></span>
                </div>
                <h1 class="font-display text-2xl font-bold text-coffee-950 mt-2">
                    <?= sanitize($booking['event_name']) ?>
                </h1>
                <p class="text-xs text-coffee-600 mt-1">
                    <i class="fa-solid fa-location-dot mr-1 text-caramel"></i> Location: <strong class="text-coffee-900"><?= sanitize($booking['event_location']) ?></strong> • Event: <strong class="text-coffee-900"><?= sanitize($booking['event_type']) ?></strong>
                </p>
            </div>
            <div>
                <?= statusBadge($booking['status']) ?>
            </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 py-6 border-b border-coffee-100 text-xs">
            <div>
                <span class="text-coffee-500 uppercase tracking-wider font-bold block mb-1 font-display">Loan Duration</span>
                <span class="font-semibold text-coffee-950 block">Start: <?= formatDateTime($booking['start_datetime'], 'd M Y, h:i A') ?></span>
                <span class="text-coffee-600 block">End: <?= formatDateTime($booking['end_datetime'], 'd M Y, h:i A') ?></span>
            </div>
            <div>
                <span class="text-coffee-500 uppercase tracking-wider font-bold block mb-1 font-display">Expected Attendees</span>
                <span class="font-semibold text-coffee-950 block text-sm"><?= (int)$booking['expected_attendees'] ?> pax</span>
                <span class="text-coffee-500 block">UPTM Campus Activity</span>
            </div>
            <div>
                <span class="text-coffee-500 uppercase tracking-wider font-bold block mb-1 font-display">Booking Mode</span>
                <?php if ($booking['package_name']): ?>
                    <span class="inline-flex items-center px-2.5 py-1 rounded-xl text-xs font-bold bg-caramel/15 text-caramel border border-caramel/30">
                        <i class="fa-solid fa-cubes-stacked mr-1.5 text-amber-gold"></i> <?= sanitize($booking['package_name']) ?>
                    </span>
                <?php else: ?>
                    <span class="text-coffee-700 font-semibold">Custom Item Selection</span>
                <?php endif; ?>
            </div>
        </div>

        <!-- Purpose -->
        <div class="py-5 border-b border-coffee-100 text-xs">
            <span class="text-coffee-500 uppercase tracking-wider font-bold block mb-1 font-display">Purpose & Event Description</span>
            <p class="text-coffee-800 leading-relaxed bg-coffee-50/70 p-4 rounded-2xl border border-coffee-200/60">
                <?= nl2br(sanitize($booking['purpose'])) ?>
            </p>
        </div>

        <!-- Applicant Details -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-5 text-xs text-coffee-700">
            <div>
                <span class="text-coffee-500 block font-bold mb-0.5">Applicant Name:</span>
                <span class="font-bold text-coffee-950"><?= sanitize($booking['applicant_name']) ?></span>
                <span class="block text-coffee-600 text-[11px] font-mono"><?= sanitize($booking['applicant_matric']) ?></span>
            </div>
            <div>
                <span class="text-coffee-500 block font-bold mb-0.5">Contact Details:</span>
                <span class="block font-semibold text-coffee-900"><?= sanitize($booking['applicant_phone']) ?></span>
                <span class="block text-coffee-600 text-[11px]"><?= sanitize($booking['applicant_email']) ?></span>
            </div>
            <div>
                <span class="text-coffee-500 block font-bold mb-0.5">Faculty / Club / Dept:</span>
                <span class="block font-medium text-coffee-900"><?= sanitize($booking['applicant_faculty']) ?></span>
            </div>
        </div>
    </div>

    <!-- Administrative Decision Box (if Pending or Approved) -->
    <?php if ($booking['status'] === 'Pending'): ?>
        <div class="bg-coffee-100/90 rounded-3xl border border-coffee-300 p-6 sm:p-7 shadow-warm mb-6">
            <h3 class="font-display text-base font-bold text-coffee-950 flex items-center mb-2">
                <i class="fa-solid fa-gavel text-caramel mr-2.5"></i> Lab Administrator Decision
            </h3>
            <p class="text-xs text-coffee-700 mb-4">
                Please verify stock availability in the table below before making a decision. Approving will automatically allocate and deduct the requested quantities from available inventory.
            </p>

            <form method="POST" action="" class="space-y-4">
                <?= csrfField() ?>
                <div>
                    <label class="block text-xs font-bold text-coffee-800 uppercase tracking-wider mb-1.5">
                        Officer Remarks / Pickup Instructions (Optional)
                    </label>
                    <textarea name="admin_remarks" rows="2" placeholder="e.g., Approved. Please pick up equipment at the Level 2 AV Lab Store, 15 minutes before the event starts..." class="w-full px-4 py-2.5 border border-coffee-200 rounded-2xl text-xs bg-white text-coffee-950 focus:ring-2 focus:ring-caramel focus:outline-none"></textarea>
                </div>

                <div class="flex items-center space-x-3 pt-2">
                    <button type="submit" name="admin_action" value="approve" class="px-5 py-2.5 rounded-2xl font-bold text-xs bg-emerald-700 hover:bg-emerald-800 text-white shadow-warm transition-all flex items-center">
                        <i class="fa-solid fa-check mr-2"></i> Approve Request & Allocate Stock
                    </button>
                    <button type="submit" name="admin_action" value="reject" onclick="return confirm('Are you sure you want to reject this booking request?');" class="px-5 py-2.5 rounded-2xl font-bold text-xs bg-rose-700 hover:bg-rose-800 text-white shadow-warm transition-all flex items-center">
                        <i class="fa-solid fa-xmark mr-2"></i> Reject Request
                    </button>
                </div>
            </form>
        </div>
    <?php elseif ($booking['status'] === 'Approved'): ?>
        <div class="bg-emerald-50 rounded-3xl border border-emerald-200 p-6 shadow-warm mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-lg text-[10px] font-bold uppercase bg-emerald-200 text-emerald-950 mb-1 font-display">
                    Booking Approved
                </span>
                <h4 class="font-display font-bold text-emerald-950 text-base">Ready for Equipment Handover (Checkout)</h4>
                <p class="text-xs text-emerald-800 mt-0.5">
                    When the borrower arrives at the counter, click "Issue / Handover Equipment" to activate this loan.
                </p>
                <?php if ($booking['admin_remarks']): ?>
                    <p class="text-xs text-emerald-900 font-medium mt-2.5 bg-emerald-100/70 p-3 rounded-2xl border border-emerald-200">
                        <strong>Officer Remarks:</strong> <?= sanitize($booking['admin_remarks']) ?>
                    </p>
                <?php endif; ?>
            </div>
            <form method="POST" action="">
                <?= csrfField() ?>
                <button type="submit" name="admin_action" value="issue" class="px-5 py-3 rounded-2xl font-bold text-xs bg-coffee-950 hover:bg-coffee-900 text-amber-gold shadow-warm transition-all whitespace-nowrap flex items-center active:scale-95">
                    <i class="fa-solid fa-hand-holding-box mr-2 text-caramel"></i> Issue / Handover Equipment
                </button>
            </form>
        </div>
    <?php elseif ($booking['status'] === 'Borrowed'): ?>
        <div class="bg-coffee-100/80 rounded-3xl border border-coffee-200 p-6 shadow-warm mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-lg text-[10px] font-bold uppercase bg-caramel text-white mb-1 font-display">
                    Active Loan
                </span>
                <h4 class="font-display font-bold text-coffee-950 text-base">Equipment Currently in Use by Borrower</h4>
                <p class="text-xs text-coffee-700 mt-0.5">
                    Handover time: <strong><?= formatDateTime($booking['issued_at']) ?></strong> • Expected return: <strong class="text-caramel"><?= formatDateTime($booking['end_datetime']) ?></strong>
                </p>
            </div>
            <a href="<?= base_url('admin/returns.php?booking_id=' . $booking['id']) ?>" class="px-5 py-3 rounded-2xl font-bold text-xs bg-gradient-to-r from-caramel to-coffee-800 hover:from-caramel-hover hover:to-coffee-900 text-white shadow-warm transition-all whitespace-nowrap flex items-center">
                <i class="fa-solid fa-rotate-left mr-2"></i> Inspect & Process Return
            </a>
        </div>
    <?php endif; ?>

    <!-- Reserved Equipment Table -->
    <div class="bg-white rounded-3xl border border-coffee-200/90 shadow-warm overflow-hidden">
        <div class="p-6 border-b border-coffee-100 flex items-center justify-between">
            <h3 class="font-display text-sm font-bold text-coffee-950 flex items-center">
                <i class="fa-solid fa-boxes-stacked text-caramel mr-2"></i> Reserved Equipment & Inventory Verification
            </h3>
            <span class="text-xs text-coffee-600">Total requested quantity: <strong class="text-coffee-950"><?= array_sum(array_column($items, 'quantity')) ?> units</strong></span>
        </div>

        <div class="overflow-x-auto">
            <table class="w-full text-left text-xs text-coffee-800">
                <thead class="bg-coffee-100/80 text-coffee-900 uppercase font-bold text-[11px] border-b border-coffee-200 font-display">
                    <tr>
                        <th class="py-3 px-4">Asset Tag</th>
                        <th class="py-3 px-4">Equipment Name</th>
                        <th class="py-3 px-4">Storage Location</th>
                        <th class="py-3 px-4 text-center">Qty Requested</th>
                        <th class="py-3 px-4 text-center">Available Stock</th>
                        <th class="py-3 px-4">Return Condition</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-coffee-100">
                    <?php foreach ($items as $it): ?>
                        <tr class="hover:bg-coffee-50 transition-colors">
                            <td class="py-3 px-4 font-mono font-bold text-coffee-950">
                                <?= sanitize($it['asset_tag']) ?>
                            </td>
                            <td class="py-3 px-4">
                                <span class="font-bold text-coffee-950 block"><?= sanitize($it['equipment_name']) ?></span>
                                <span class="text-[11px] text-coffee-600"><?= sanitize($it['brand_model']) ?> • <span class="text-caramel"><?= sanitize($it['category_name']) ?></span></span>
                            </td>
                            <td class="py-3 px-4 text-coffee-600">
                                <?= sanitize($it['location']) ?>
                            </td>
                            <td class="py-3 px-4 text-center">
                                <span class="inline-flex items-center px-2.5 py-0.5 rounded-lg font-black bg-coffee-100 text-coffee-900">
                                    <?= $it['quantity'] ?>
                                </span>
                            </td>
                            <td class="py-3 px-4 text-center">
                                <?php if ($it['available_qty'] >= $it['quantity']): ?>
                                    <span class="font-bold text-emerald-700">
                                        <?= $it['available_qty'] ?> units ready
                                    </span>
                                <?php else: ?>
                                    <span class="font-bold text-rose-600">
                                        <i class="fa-solid fa-triangle-exclamation mr-1"></i> Only <?= $it['available_qty'] ?> left
                                    </span>
                                <?php endif; ?>
                            </td>
                            <td class="py-3 px-4">
                                <?= $it['return_condition'] ? conditionBadge($it['return_condition']) : '<span class="text-coffee-400 italic">Not returned yet</span>' ?>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
    </div>

</div>

<?php include __DIR__ . '/../includes/footer.php'; ?>
