<?php
// User Bookings History & Status Tracker
// PinjamGeng - Smart Event Equipment Booking and Inventory Management System (UPTM)

require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../config/auth.php';
require_once __DIR__ . '/../config/helpers.php';

requireLogin();
$user = currentUser();
$userId = $user['id'];

$tab = trim($_GET['tab'] ?? 'all');
$search = trim($_GET['search'] ?? '');

// Handle Cancel Action for Pending Bookings
if (isset($_POST['cancel_booking_id'])) {
    $token = $_POST['csrf_token'] ?? '';
    if (!verifyCsrfToken($token)) {
        setFlash('error', "Security validation failed (CSRF token expired).");
    } else {
        $cancelId = (int)$_POST['cancel_booking_id'];
        $chkStmt = $pdo->prepare("SELECT * FROM bookings WHERE id = ? AND user_id = ? AND status = 'Pending'");
        $chkStmt->execute([$cancelId, $userId]);
        $booking = $chkStmt->fetch();

        if ($booking) {
            $updStmt = $pdo->prepare("UPDATE bookings SET status = 'Cancelled' WHERE id = ?");
            $updStmt->execute([$cancelId]);
            setFlash('success', "Booking request {$booking['booking_reference']} has been cancelled successfully.");
            header("Location: " . base_url('user/my_bookings.php?tab=' . $tab));
            exit;
        } else {
            setFlash('error', "Failed to cancel request. Only 'Pending' requests can be cancelled.");
        }
    }
}

// Build query
$query = "
    SELECT b.*, p.name as package_name,
           (SELECT COUNT(*) FROM booking_items WHERE booking_id = b.id) as item_count,
           u_admin.full_name as approved_by_name
    FROM bookings b
    LEFT JOIN packages p ON b.package_id = p.id
    LEFT JOIN users u_admin ON b.approved_by = u_admin.id
    WHERE b.user_id = ?
";
$params = [$userId];

if ($tab === 'pending') {
    $query .= " AND b.status = 'Pending'";
} elseif ($tab === 'approved') {
    $query .= " AND b.status = 'Approved'";
} elseif ($tab === 'borrowed') {
    $query .= " AND b.status = 'Borrowed'";
} elseif ($tab === 'returned') {
    $query .= " AND b.status = 'Returned'";
} elseif ($tab === 'history') {
    $query .= " AND b.status IN ('Returned', 'Rejected', 'Cancelled')";
}

if (!empty($search)) {
    $query .= " AND (b.booking_reference LIKE ? OR b.event_name LIKE ? OR b.event_location LIKE ?)";
    $term = "%{$search}%";
    $params = array_merge($params, [$term, $term, $term]);
}

$query .= " ORDER BY b.created_at DESC";

$stmt = $pdo->prepare($query);
$stmt->execute($params);
$bookings = $stmt->fetchAll();

// Counts for tabs
$counts = [];
$counts['all'] = (int)$pdo->query("SELECT COUNT(*) FROM bookings WHERE user_id = {$userId}")->fetchColumn();
$counts['pending'] = (int)$pdo->query("SELECT COUNT(*) FROM bookings WHERE user_id = {$userId} AND status = 'Pending'")->fetchColumn();
$counts['approved'] = (int)$pdo->query("SELECT COUNT(*) FROM bookings WHERE user_id = {$userId} AND status = 'Approved'")->fetchColumn();
$counts['borrowed'] = (int)$pdo->query("SELECT COUNT(*) FROM bookings WHERE user_id = {$userId} AND status = 'Borrowed'")->fetchColumn();
$counts['returned'] = (int)$pdo->query("SELECT COUNT(*) FROM bookings WHERE user_id = {$userId} AND status = 'Returned'")->fetchColumn();

$pageTitle = "My Booking Records";
include __DIR__ . '/../includes/header.php';
?>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    
    <?php include __DIR__ . '/../includes/alerts.php'; ?>

    <!-- Title & CTA -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
            <div class="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-caramel/15 text-caramel border border-caramel/30 text-xs font-bold uppercase tracking-wider mb-2">
                <i class="fa-solid fa-clock-rotate-left"></i> Track Loan Status
            </div>
            <h1 class="font-display text-2xl sm:text-3xl font-extrabold text-coffee-950 tracking-tight">
                Booking Records <span class="text-caramel">PinjamGeng</span>
            </h1>
            <p class="text-xs sm:text-sm text-coffee-600 mt-1">
                Check administrator approval status, print official UPTM loan slips, and track return schedules.
            </p>
        </div>
        <div class="flex items-center space-x-2.5">
            <a href="<?= base_url('user/packages.php') ?>" class="inline-flex items-center px-4 py-2.5 rounded-2xl text-xs font-bold bg-coffee-900 text-amber-gold hover:bg-coffee-800 shadow-warm transition-all">
                <i class="fa-solid fa-cubes-stacked mr-1.5 text-caramel"></i> Event Packages
            </a>
            <a href="<?= base_url('user/book.php') ?>" class="inline-flex items-center px-4 py-2.5 rounded-2xl text-xs font-bold bg-gradient-to-r from-caramel to-coffee-700 hover:from-caramel-hover hover:to-coffee-800 text-white shadow-warm transition-all">
                <i class="fa-solid fa-plus mr-1.5"></i> New Booking
            </a>
        </div>
    </div>

    <!-- Filter Tabs -->
    <div class="flex flex-wrap items-center gap-2 mb-6 border-b border-coffee-200 pb-3">
        <a href="<?= base_url('user/my_bookings.php?tab=all') ?>" class="px-4 py-2 rounded-2xl text-xs font-bold transition-all <?= $tab === 'all' ? 'bg-coffee-950 text-amber-gold shadow-warm' : 'text-coffee-700 hover:bg-coffee-100' ?>">
            All (<?= $counts['all'] ?>)
        </a>
        <a href="<?= base_url('user/my_bookings.php?tab=pending') ?>" class="px-4 py-2 rounded-2xl text-xs font-bold transition-all <?= $tab === 'pending' ? 'bg-amber-600 text-white shadow-warm' : 'text-coffee-700 hover:bg-coffee-100' ?>">
            Pending Review (<?= $counts['pending'] ?>)
        </a>
        <a href="<?= base_url('user/my_bookings.php?tab=approved') ?>" class="px-4 py-2 rounded-2xl text-xs font-bold transition-all <?= $tab === 'approved' ? 'bg-emerald-700 text-white shadow-warm' : 'text-coffee-700 hover:bg-coffee-100' ?>">
            Approved (<?= $counts['approved'] ?>)
        </a>
        <a href="<?= base_url('user/my_bookings.php?tab=borrowed') ?>" class="px-4 py-2 rounded-2xl text-xs font-bold transition-all <?= $tab === 'borrowed' ? 'bg-coffee-800 text-amber-gold shadow-warm' : 'text-coffee-700 hover:bg-coffee-100' ?>">
            Borrowed / Active (<?= $counts['borrowed'] ?>)
        </a>
        <a href="<?= base_url('user/my_bookings.php?tab=returned') ?>" class="px-4 py-2 rounded-2xl text-xs font-bold transition-all <?= $tab === 'returned' ? 'bg-coffee-950 text-white shadow-warm' : 'text-coffee-700 hover:bg-coffee-100' ?>">
            Returned (<?= $counts['returned'] ?>)
        </a>
    </div>

    <!-- Bookings Table / List -->
    <div class="bg-white rounded-3xl border border-coffee-200/90 shadow-warm overflow-hidden">
        <?php if (empty($bookings)): ?>
            <div class="p-12 text-center text-coffee-400">
                <div class="w-16 h-16 mx-auto rounded-3xl bg-coffee-100 flex items-center justify-center text-caramel mb-4 text-2xl">
                    <i class="fa-solid fa-clipboard-list"></i>
                </div>
                <h3 class="font-display text-base font-bold text-coffee-900">No booking records found</h3>
                <p class="text-xs text-coffee-500 mt-1">Submit an equipment loan request to track your records here.</p>
                <a href="<?= base_url('user/book.php') ?>" class="inline-flex items-center px-4 py-2 mt-4 rounded-2xl text-xs font-bold bg-caramel text-white hover:bg-caramel-hover shadow-sm">
                    Create Booking Now
                </a>
            </div>
        <?php else: ?>
            <div class="overflow-x-auto">
                <table class="w-full text-left text-xs text-coffee-800">
                    <thead class="bg-coffee-100/80 text-coffee-900 uppercase font-bold text-[11px] border-b border-coffee-200 font-display">
                        <tr>
                            <th class="py-3.5 px-4">Reference No.</th>
                            <th class="py-3.5 px-4">Event Details</th>
                            <th class="py-3.5 px-4">Loan Schedule</th>
                            <th class="py-3.5 px-4">Equipment</th>
                            <th class="py-3.5 px-4">Status</th>
                            <th class="py-3.5 px-4 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-coffee-100">
                        <?php foreach ($bookings as $b): ?>
                            <tr class="hover:bg-coffee-50 transition-colors">
                                <td class="py-3.5 px-4 whitespace-nowrap">
                                    <span class="font-mono font-bold text-coffee-950 block"><?= sanitize($b['booking_reference']) ?></span>
                                    <span class="text-[10px] text-coffee-500">Created: <?= formatDateOnly($b['created_at']) ?></span>
                                </td>

                                <td class="py-3.5 px-4">
                                    <span class="font-bold text-coffee-950 block"><?= sanitize($b['event_name']) ?></span>
                                    <span class="text-[11px] text-coffee-600 block">
                                        <i class="fa-solid fa-location-dot mr-1 text-caramel"></i> <?= sanitize($b['event_location']) ?>
                                    </span>
                                    <span class="inline-flex items-center px-2 py-0.5 rounded-lg text-[10px] font-bold bg-coffee-100 text-coffee-800 border border-coffee-200 mt-1">
                                        <?= sanitize($b['event_type']) ?>
                                    </span>
                                </td>

                                <td class="py-3.5 px-4 whitespace-nowrap">
                                    <span class="font-semibold text-coffee-900 block">Pickup: <?= formatDateTime($b['start_datetime'], 'd M Y, h:i A') ?></span>
                                    <span class="text-coffee-600 block text-[11px]">Return: <?= formatDateTime($b['end_datetime'], 'd M Y, h:i A') ?></span>
                                </td>

                                <td class="py-3.5 px-4 whitespace-nowrap">
                                    <span class="inline-flex items-center px-2.5 py-1 rounded-xl bg-coffee-100 font-bold text-coffee-900 border border-coffee-200">
                                        <i class="fa-solid fa-box text-caramel mr-1.5"></i> <?= $b['item_count'] ?> items
                                    </span>
                                    <?php if ($b['package_name']): ?>
                                        <span class="block text-[10px] text-caramel font-semibold mt-1 truncate max-w-[140px]" title="<?= sanitize($b['package_name']) ?>">
                                            <i class="fa-solid fa-sparkles text-[9px] mr-1 text-amber-gold"></i><?= sanitize($b['package_name']) ?>
                                        </span>
                                    <?php endif; ?>
                                </td>

                                <td class="py-3.5 px-4 whitespace-nowrap">
                                    <?= statusBadge($b['status']) ?>
                                </td>

                                <td class="py-3.5 px-4 text-right whitespace-nowrap">
                                    <div class="flex items-center justify-end space-x-1.5">
                                        <a href="<?= base_url('user/booking_details.php?id=' . $b['id']) ?>" class="px-3 py-1.5 rounded-xl text-xs font-bold bg-coffee-100 hover:bg-coffee-200 text-coffee-900 transition-colors">
                                            View
                                        </a>

                                        <?php if ($b['status'] === 'Approved' || $b['status'] === 'Borrowed'): ?>
                                            <a href="<?= base_url('user/print_slip.php?id=' . $b['id']) ?>" target="_blank" class="px-3 py-1.5 rounded-xl text-xs font-bold bg-caramel/15 text-caramel border border-caramel/30 hover:bg-caramel hover:text-white transition-all" title="Print Official UPTM Loan Slip">
                                                <i class="fa-solid fa-print mr-1"></i> Slip
                                            </a>
                                        <?php endif; ?>

                                        <?php if ($b['status'] === 'Pending'): ?>
                                            <form method="POST" action="" onsubmit="return confirm('Are you sure you want to cancel this booking request?');" class="inline">
                                                <?= csrfField() ?>
                                                <input type="hidden" name="cancel_booking_id" value="<?= $b['id'] ?>">
                                                <button type="submit" class="px-3 py-1.5 rounded-xl text-xs font-bold bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 transition-colors">
                                                    Cancel
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
        <?php endif; ?>
    </div>

</div>

<?php include __DIR__ . '/../includes/footer.php'; ?>
