<?php
// Administrator Bookings Management - PinjamGeng
// Smart Event Equipment Booking and Inventory Management System (UPTM)

require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../config/auth.php';
require_once __DIR__ . '/../config/helpers.php';

requireAdmin();
$user = currentUser();

$statusFilter = trim($_GET['status'] ?? 'All');
$search = trim($_GET['search'] ?? '');

$query = "
    SELECT b.*, u.full_name as applicant_name, u.matric_staff_id, u.phone as applicant_phone, u.email as applicant_email,
           p.name as package_name,
           (SELECT COUNT(*) FROM booking_items WHERE booking_id = b.id) as item_count,
           u_adm.full_name as approved_by_name
    FROM bookings b
    JOIN users u ON b.user_id = u.id
    LEFT JOIN packages p ON b.package_id = p.id
    LEFT JOIN users u_adm ON b.approved_by = u_adm.id
    WHERE 1=1
";
$params = [];

if ($statusFilter !== 'All' && !empty($statusFilter)) {
    $query .= " AND b.status = ?";
    $params[] = $statusFilter;
}

if (!empty($search)) {
    $query .= " AND (b.booking_reference LIKE ? OR b.event_name LIKE ? OR b.event_location LIKE ? OR u.full_name LIKE ? OR u.matric_staff_id LIKE ?)";
    $term = "%{$search}%";
    $params = array_merge($params, [$term, $term, $term, $term, $term]);
}

$query .= " ORDER BY b.created_at DESC";

$stmt = $pdo->prepare($query);
$stmt->execute($params);
$bookings = $stmt->fetchAll();

// Counts for filter tabs
$counts = [];
$counts['All'] = (int)$pdo->query("SELECT COUNT(*) FROM bookings")->fetchColumn();
$counts['Pending'] = (int)$pdo->query("SELECT COUNT(*) FROM bookings WHERE status = 'Pending'")->fetchColumn();
$counts['Approved'] = (int)$pdo->query("SELECT COUNT(*) FROM bookings WHERE status = 'Approved'")->fetchColumn();
$counts['Borrowed'] = (int)$pdo->query("SELECT COUNT(*) FROM bookings WHERE status = 'Borrowed'")->fetchColumn();
$counts['Returned'] = (int)$pdo->query("SELECT COUNT(*) FROM bookings WHERE status = 'Returned'")->fetchColumn();
$counts['Rejected'] = (int)$pdo->query("SELECT COUNT(*) FROM bookings WHERE status = 'Rejected'")->fetchColumn();

$pageTitle = "Booking Management";
include __DIR__ . '/../includes/header.php';
?>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    
    <?php include __DIR__ . '/../includes/alerts.php'; ?>

    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
            <div class="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-caramel/15 text-caramel border border-caramel/30 text-xs font-bold uppercase tracking-wider mb-2 font-display">
                <i class="fa-solid fa-calendar-check"></i> Booking Records & Approval Management
            </div>
            <h1 class="font-display text-2xl sm:text-3xl font-extrabold text-coffee-950 tracking-tight">
                Reservation Requests <span class="text-caramel">PinjamGeng</span>
            </h1>
            <p class="text-xs sm:text-sm text-coffee-600 mt-1">
                Review event equipment booking requests, grant official approvals, and monitor active loans across UPTM campus.
            </p>
        </div>
        <div>
            <a href="<?= base_url('admin/returns.php') ?>" class="inline-flex items-center px-4 py-2.5 rounded-2xl text-xs font-bold bg-coffee-950 text-amber-gold hover:bg-coffee-900 shadow-warm transition-all">
                <i class="fa-solid fa-rotate-left mr-1.5 text-caramel"></i> Return Desk
            </a>
        </div>
    </div>

    <!-- Status Tabs -->
    <div class="flex flex-wrap items-center gap-2 mb-6 border-b border-coffee-200 pb-3">
        <a href="<?= base_url('admin/bookings.php?status=All') ?>" class="px-3.5 py-2 rounded-2xl text-xs font-bold transition-all <?= $statusFilter === 'All' ? 'bg-coffee-950 text-amber-gold shadow-warm' : 'text-coffee-700 hover:bg-coffee-100' ?>">
            All (<?= $counts['All'] ?>)
        </a>
        <a href="<?= base_url('admin/bookings.php?status=Pending') ?>" class="px-3.5 py-2 rounded-2xl text-xs font-bold transition-all <?= $statusFilter === 'Pending' ? 'bg-amber-600 text-white shadow-warm' : 'text-coffee-700 hover:bg-coffee-100' ?>">
            Pending Review
            <?php if ($counts['Pending'] > 0): ?>
                <span class="ml-1.5 px-2 py-0.5 rounded-full text-[10px] <?= $statusFilter === 'Pending' ? 'bg-amber-800 text-white' : 'bg-rose-500 text-white' ?> font-black"><?= $counts['Pending'] ?></span>
            <?php endif; ?>
        </a>
        <a href="<?= base_url('admin/bookings.php?status=Approved') ?>" class="px-3.5 py-2 rounded-2xl text-xs font-bold transition-all <?= $statusFilter === 'Approved' ? 'bg-emerald-700 text-white shadow-warm' : 'text-coffee-700 hover:bg-coffee-100' ?>">
            Approved (<?= $counts['Approved'] ?>)
        </a>
        <a href="<?= base_url('admin/bookings.php?status=Borrowed') ?>" class="px-3.5 py-2 rounded-2xl text-xs font-bold transition-all <?= $statusFilter === 'Borrowed' ? 'bg-coffee-800 text-amber-gold shadow-warm' : 'text-coffee-700 hover:bg-coffee-100' ?>">
            Active Loans (<?= $counts['Borrowed'] ?>)
        </a>
        <a href="<?= base_url('admin/bookings.php?status=Returned') ?>" class="px-3.5 py-2 rounded-2xl text-xs font-bold transition-all <?= $statusFilter === 'Returned' ? 'bg-coffee-950 text-white shadow-warm' : 'text-coffee-700 hover:bg-coffee-100' ?>">
            Returned (<?= $counts['Returned'] ?>)
        </a>
        <a href="<?= base_url('admin/bookings.php?status=Rejected') ?>" class="px-3.5 py-2 rounded-2xl text-xs font-bold transition-all <?= $statusFilter === 'Rejected' ? 'bg-rose-700 text-white shadow-warm' : 'text-coffee-700 hover:bg-coffee-100' ?>">
            Rejected (<?= $counts['Rejected'] ?>)
        </a>
    </div>

    <!-- Search Form -->
    <div class="bg-white p-4 rounded-3xl border border-coffee-200/90 shadow-warm mb-6">
        <form method="GET" action="" class="flex flex-col sm:flex-row gap-3">
            <input type="hidden" name="status" value="<?= sanitize($statusFilter) ?>">
            <div class="relative flex-1">
                <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-coffee-400">
                    <i class="fa-solid fa-magnifying-glass"></i>
                </div>
                <input type="text" name="search" value="<?= sanitize($search) ?>" placeholder="Search ref no., event name, applicant name, or ID..." class="w-full pl-10 pr-3.5 py-2.5 rounded-2xl border border-coffee-200 text-xs sm:text-sm bg-coffee-50/40 text-coffee-950 focus:bg-white focus:ring-2 focus:ring-caramel focus:border-caramel focus:outline-none transition-all">
            </div>
            <button type="submit" class="px-5 py-2.5 bg-coffee-950 hover:bg-coffee-900 text-amber-gold rounded-2xl text-xs font-bold shadow-warm transition-all">
                Search
            </button>
            <?php if (!empty($search)): ?>
                <a href="<?= base_url('admin/bookings.php?status=' . $statusFilter) ?>" class="px-4 py-2.5 bg-coffee-100 hover:bg-coffee-200 text-coffee-700 rounded-2xl text-xs font-bold flex items-center justify-center transition-colors">
                    Clear
                </a>
            <?php endif; ?>
        </form>
    </div>

    <!-- Bookings Table -->
    <div class="bg-white rounded-3xl border border-coffee-200/90 shadow-warm overflow-hidden">
        <?php if (empty($bookings)): ?>
            <div class="p-12 text-center text-coffee-400 text-xs">
                <div class="w-16 h-16 mx-auto rounded-3xl bg-coffee-100 flex items-center justify-center text-caramel mb-4 text-2xl">
                    <i class="fa-solid fa-calendar-xmark"></i>
                </div>
                <p class="font-display font-bold text-coffee-900 text-sm">No booking records found.</p>
                <p class="mt-1 text-coffee-500">Try selecting another status tab or reset your search query.</p>
            </div>
        <?php else: ?>
            <div class="overflow-x-auto">
                <table class="w-full text-left text-xs text-coffee-800">
                    <thead class="bg-coffee-100/80 text-coffee-900 uppercase font-bold text-[11px] border-b border-coffee-200 font-display">
                        <tr>
                            <th class="py-3.5 px-4">Ref No.</th>
                            <th class="py-3.5 px-4">Applicant</th>
                            <th class="py-3.5 px-4">Event Details</th>
                            <th class="py-3.5 px-4">Event Schedule</th>
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
                                    <span class="text-[10px] text-coffee-500"><?= formatDateOnly($b['created_at']) ?></span>
                                </td>

                                <td class="py-3.5 px-4 whitespace-nowrap">
                                    <span class="font-bold text-coffee-950 block"><?= sanitize($b['applicant_name']) ?></span>
                                    <span class="text-[10px] text-coffee-600 font-mono"><?= sanitize($b['matric_staff_id']) ?></span>
                                    <span class="block text-[10px] text-coffee-500"><?= sanitize($b['applicant_phone']) ?></span>
                                </td>

                                <td class="py-3.5 px-4">
                                    <span class="font-bold text-coffee-950 block truncate max-w-[200px]" title="<?= sanitize($b['event_name']) ?>"><?= sanitize($b['event_name']) ?></span>
                                    <span class="text-[11px] text-coffee-600 block">
                                        <i class="fa-solid fa-location-dot mr-1 text-caramel text-[10px]"></i> <?= sanitize($b['event_location']) ?>
                                    </span>
                                    <span class="inline-flex items-center px-2 py-0.5 rounded-lg text-[10px] font-bold bg-coffee-100 text-coffee-800 border border-coffee-200 mt-0.5">
                                        <?= sanitize($b['event_type']) ?>
                                    </span>
                                </td>

                                <td class="py-3.5 px-4 whitespace-nowrap">
                                    <span class="font-semibold text-coffee-900 block"><?= formatDateTime($b['start_datetime'], 'd M Y, h:i A') ?></span>
                                    <span class="text-coffee-600 text-[11px] block">to <?= formatDateTime($b['end_datetime'], 'd M Y, h:i A') ?></span>
                                </td>

                                <td class="py-3.5 px-4 whitespace-nowrap">
                                    <span class="inline-flex items-center px-2.5 py-1 rounded-xl bg-coffee-100 font-bold text-coffee-900 border border-coffee-200">
                                        <i class="fa-solid fa-box text-caramel mr-1.5"></i> <?= $b['item_count'] ?> items
                                    </span>
                                    <?php if ($b['package_name']): ?>
                                        <span class="block text-[10px] text-caramel font-semibold truncate max-w-[120px] mt-0.5">
                                            <i class="fa-solid fa-sparkles text-[9px] mr-1 text-amber-gold"></i><?= sanitize($b['package_name']) ?>
                                        </span>
                                    <?php endif; ?>
                                </td>

                                <td class="py-3.5 px-4 whitespace-nowrap">
                                    <?= statusBadge($b['status']) ?>
                                </td>

                                <td class="py-3.5 px-4 text-right whitespace-nowrap">
                                    <div class="flex items-center justify-end space-x-1.5">
                                        <a href="<?= base_url('admin/booking_view.php?id=' . $b['id']) ?>" class="px-3.5 py-1.5 rounded-xl text-xs font-bold <?= $b['status'] === 'Pending' ? 'bg-gradient-to-r from-caramel to-coffee-800 text-white shadow-warm' : 'bg-coffee-100 text-coffee-900 hover:bg-coffee-200' ?> transition-colors">
                                            <?= $b['status'] === 'Pending' ? 'Review & Approve' : 'View' ?>
                                        </a>
                                        <a href="<?= base_url('user/print_slip.php?id=' . $b['id']) ?>" target="_blank" class="p-2 rounded-xl text-xs font-semibold text-coffee-500 hover:text-caramel hover:bg-coffee-100 transition-colors" title="Print Loan Slip">
                                            <i class="fa-solid fa-print"></i>
                                        </a>
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
