<?php
// Booking Details View
// PinjamGeng - Smart Event Equipment Booking and Inventory Management System (UPTM)

require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../config/auth.php';
require_once __DIR__ . '/../config/helpers.php';

requireLogin();
$user = currentUser();
$bookingId = (int)($_GET['id'] ?? 0);

// Fetch booking
$stmt = $pdo->prepare("
    SELECT b.*, p.name as package_name, p.event_type as package_event_type,
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
    header('Location: ' . base_url('user/my_bookings.php'));
    exit;
}

// Ensure normal users can only view their own bookings (Admins can view all)
if (!isAdmin() && $booking['user_id'] != $user['id']) {
    setFlash('error', 'Unauthorized access.');
    header('Location: ' . base_url('user/my_bookings.php'));
    exit;
}

// Fetch booking items
$itemsStmt = $pdo->prepare("
    SELECT bi.*, e.asset_tag, e.name as equipment_name, e.brand_model, e.location, c.name as category_name
    FROM booking_items bi
    JOIN equipment e ON bi.equipment_id = e.id
    JOIN categories c ON e.category_id = c.id
    WHERE bi.booking_id = ?
    ORDER BY c.name ASC, e.name ASC
");
$itemsStmt->execute([$bookingId]);
$items = $itemsStmt->fetchAll();

// Handle cancellation
if (isset($_POST['cancel_booking'])) {
    $token = $_POST['csrf_token'] ?? '';
    if (!verifyCsrfToken($token)) {
        setFlash('error', 'Security validation failed (CSRF token expired).');
    } else {
        if ($booking['status'] === 'Pending') {
            $upd = $pdo->prepare("UPDATE bookings SET status = 'Cancelled' WHERE id = ?");
            $upd->execute([$bookingId]);
            setFlash('success', 'Booking request has been cancelled successfully.');
            header("Location: " . base_url('user/booking_details.php?id=' . $bookingId));
            exit;
        }
    }
}

$pageTitle = "Booking Details #" . $booking['booking_reference'];
include __DIR__ . '/../includes/header.php';
?>

<div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    
    <?php include __DIR__ . '/../includes/alerts.php'; ?>

    <!-- Top Action / Back Link -->
    <div class="flex items-center justify-between mb-6">
        <a href="<?= isAdmin() ? base_url('admin/bookings.php') : base_url('user/my_bookings.php') ?>" class="text-xs font-bold text-coffee-600 hover:text-caramel transition-colors flex items-center">
            <i class="fa-solid fa-arrow-left mr-2"></i> Back to <?= isAdmin() ? 'Bookings Management' : 'My Booking Records' ?>
        </a>
        <div class="flex items-center space-x-2.5">
            <a href="<?= base_url('user/print_slip.php?id=' . $booking['id']) ?>" target="_blank" class="inline-flex items-center px-4 py-2 rounded-2xl text-xs font-bold bg-coffee-950 text-amber-gold hover:bg-coffee-900 shadow-warm transition-all">
                <i class="fa-solid fa-print mr-2 text-caramel"></i> Print Official Slip
            </a>
            <?php if ($booking['status'] === 'Pending' && !isAdmin()): ?>
                <form method="POST" action="" onsubmit="return confirm('Are you sure you want to cancel this booking request?');">
                    <?= csrfField() ?>
                    <button type="submit" name="cancel_booking" class="px-4 py-2 rounded-2xl text-xs font-bold bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 transition-colors">
                        <i class="fa-solid fa-ban mr-1.5"></i> Cancel Request
                    </button>
                </form>
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
                    <i class="fa-solid fa-location-dot mr-1 text-caramel"></i> Location: <strong class="text-coffee-900"><?= sanitize($booking['event_location']) ?></strong> • Event Type: <strong class="text-coffee-900"><?= sanitize($booking['event_type']) ?></strong>
                </p>
            </div>
            <div>
                <?= statusBadge($booking['status']) ?>
            </div>
        </div>

        <!-- Event Details Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 py-6 border-b border-coffee-100 text-xs">
            <div>
                <span class="text-coffee-500 uppercase tracking-wider font-bold block mb-1 font-display">Loan Duration</span>
                <span class="font-semibold text-coffee-950 block">Start: <?= formatDateTime($booking['start_datetime'], 'd M Y, h:i A') ?></span>
                <span class="text-coffee-600 block">End: <?= formatDateTime($booking['end_datetime'], 'd M Y, h:i A') ?></span>
            </div>
            <div>
                <span class="text-coffee-500 uppercase tracking-wider font-bold block mb-1 font-display">Target Audience</span>
                <span class="font-semibold text-coffee-950 block text-sm"><?= (int)$booking['expected_attendees'] ?> pax</span>
                <span class="text-coffee-500 block">UPTM Campus Activity</span>
            </div>
            <div>
                <span class="text-coffee-500 uppercase tracking-wider font-bold block mb-1 font-display">Booking Mode</span>
                <?php if ($booking['package_name']): ?>
                    <span class="inline-flex items-center px-2.5 py-1 rounded-xl text-xs font-bold bg-caramel/15 text-caramel border border-caramel/30">
                        <i class="fa-solid fa-sparkles mr-1.5 text-amber-gold"></i> <?= sanitize($booking['package_name']) ?>
                    </span>
                <?php else: ?>
                    <span class="text-coffee-700 font-semibold">Custom Equipment Selection</span>
                <?php endif; ?>
            </div>
        </div>

        <!-- Purpose -->
        <div class="py-5 border-b border-coffee-100 text-xs">
            <span class="text-coffee-500 uppercase tracking-wider font-bold block mb-1.5 font-display">Application Purpose & Event Description</span>
            <p class="text-coffee-800 leading-relaxed bg-coffee-50/70 p-4 rounded-2xl border border-coffee-200/60">
                <?= nl2br(sanitize($booking['purpose'])) ?>
            </p>
        </div>

        <!-- Applicant Info -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-5 text-xs text-coffee-700">
            <div>
                <span class="text-coffee-500 block font-bold mb-0.5">Applicant:</span>
                <span class="font-bold text-coffee-950"><?= sanitize($booking['applicant_name']) ?></span>
                <span class="block text-coffee-600 text-[11px] font-mono"><?= sanitize($booking['applicant_matric']) ?></span>
            </div>
            <div>
                <span class="text-coffee-500 block font-bold mb-0.5">Contact Info:</span>
                <span class="font-semibold text-coffee-900"><?= sanitize($booking['applicant_phone']) ?></span>
                <span class="block text-coffee-600 text-[11px]"><?= sanitize($booking['applicant_email']) ?></span>
            </div>
            <div>
                <span class="text-coffee-500 block font-bold mb-0.5">Faculty / Organization:</span>
                <span class="font-medium text-coffee-900"><?= sanitize($booking['applicant_faculty']) ?></span>
            </div>
        </div>
    </div>

    <!-- Approval & Return Workflow Status Card -->
    <?php if ($booking['status'] !== 'Pending'): ?>
        <div class="bg-white rounded-3xl border border-coffee-200/90 shadow-warm p-6 mb-6">
            <h3 class="font-display text-sm font-bold text-coffee-950 flex items-center mb-3">
                <i class="fa-solid fa-shield-halved text-caramel mr-2"></i> Review Log & Loan Status (Audit Log)
            </h3>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div class="p-3.5 bg-coffee-50/70 rounded-2xl border border-coffee-200/60">
                    <span class="text-coffee-500 block text-[10px] uppercase font-bold">Approved By</span>
                    <span class="font-bold text-coffee-950"><?= sanitize($booking['approved_by_name'] ?: 'UPTM Officer on Duty') ?></span>
                    <span class="text-[10px] text-coffee-500 block"><?= formatDateTime($booking['approved_at']) ?></span>
                </div>
                <div class="p-3.5 bg-coffee-50/70 rounded-2xl border border-coffee-200/60">
                    <span class="text-coffee-500 block text-[10px] uppercase font-bold">Issued / Collected At</span>
                    <span class="font-bold text-coffee-950"><?= $booking['issued_at'] ? formatDateTime($booking['issued_at']) : 'Awaiting store collection' ?></span>
                </div>
                <div class="p-3.5 bg-coffee-50/70 rounded-2xl border border-coffee-200/60">
                    <span class="text-coffee-500 block text-[10px] uppercase font-bold">Returned At</span>
                    <span class="font-bold text-coffee-950"><?= $booking['returned_at'] ? formatDateTime($booking['returned_at']) : 'Not returned yet' ?></span>
                </div>
            </div>
            <?php if (!empty($booking['admin_remarks'])): ?>
                <div class="mt-3.5 p-3.5 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900">
                    <strong class="font-bold">Officer Remarks:</strong> <?= sanitize($booking['admin_remarks']) ?>
                </div>
            <?php endif; ?>
        </div>
    <?php endif; ?>

    <!-- Reserved Equipment Table -->
    <div class="bg-white rounded-3xl border border-coffee-200/90 shadow-warm overflow-hidden">
        <div class="p-6 border-b border-coffee-100 flex items-center justify-between">
            <h3 class="font-display text-sm font-bold text-coffee-950 flex items-center">
                <i class="fa-solid fa-boxes-packing text-caramel mr-2"></i> Reserved Equipment List (<?= count($items) ?> items)
            </h3>
            <span class="text-xs text-coffee-600">Total quantity: <strong class="text-coffee-950"><?= array_sum(array_column($items, 'quantity')) ?> units</strong></span>
        </div>

        <div class="overflow-x-auto">
            <table class="w-full text-left text-xs text-coffee-800">
                <thead class="bg-coffee-100/80 text-coffee-900 uppercase font-bold text-[11px] border-b border-coffee-200 font-display">
                    <tr>
                        <th class="py-3 px-4">Asset Tag</th>
                        <th class="py-3 px-4">Equipment Name & Model</th>
                        <th class="py-3 px-4">Category</th>
                        <th class="py-3 px-4">Store Location</th>
                        <th class="py-3 px-4 text-center">Quantity</th>
                        <th class="py-3 px-4">Return Inspection</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-coffee-100">
                    <?php foreach ($items as $it): ?>
                        <tr class="hover:bg-coffee-50 transition-colors">
                            <td class="py-3 px-4 font-mono font-bold text-coffee-900">
                                <?= sanitize($it['asset_tag']) ?>
                            </td>
                            <td class="py-3 px-4">
                                <span class="font-bold text-coffee-950 block"><?= sanitize($it['equipment_name']) ?></span>
                                <span class="text-[11px] text-coffee-600"><?= sanitize($it['brand_model']) ?></span>
                            </td>
                            <td class="py-3 px-4 text-coffee-700">
                                <?= sanitize($it['category_name']) ?>
                            </td>
                            <td class="py-3 px-4 text-coffee-600">
                                <?= sanitize($it['location']) ?>
                            </td>
                            <td class="py-3 px-4 text-center">
                                <span class="inline-flex items-center px-2.5 py-0.5 rounded-lg font-black bg-coffee-100 text-coffee-900">
                                    <?= $it['quantity'] ?>
                                </span>
                            </td>
                            <td class="py-3 px-4">
                                <?php if ($it['return_condition']): ?>
                                    <?= conditionBadge($it['return_condition']) ?>
                                    <?php if ($it['return_notes']): ?>
                                        <span class="block text-[10px] text-coffee-600 mt-0.5 italic"><?= sanitize($it['return_notes']) ?></span>
                                    <?php endif; ?>
                                <?php else: ?>
                                    <span class="text-coffee-400 italic">Awaiting counter inspection</span>
                                <?php endif; ?>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
    </div>

</div>

<?php include __DIR__ . '/../includes/footer.php'; ?>
