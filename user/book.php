<?php
// Equipment Booking Wizard
// PinjamGeng - Smart Event Equipment Booking and Inventory Management System (UPTM)

require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../config/auth.php';
require_once __DIR__ . '/../config/helpers.php';

requireLogin();
$user = currentUser();
$userId = $user['id'];

$error = '';
$preselectedPackageId = isset($_GET['package_id']) ? (int)$_GET['package_id'] : null;
$preselectedEquipmentId = isset($_GET['equipment_id']) ? (int)$_GET['equipment_id'] : null;

// Fetch all available equipment for the selection list
$allEquipment = $pdo->query("
    SELECT e.*, c.name as category_name 
    FROM equipment e 
    JOIN categories c ON e.category_id = c.id 
    WHERE e.item_status != 'Damaged'
    ORDER BY c.name ASC, e.name ASC
")->fetchAll();

// Fetch all active packages for quick-select dropdown
$allPackages = $pdo->query("SELECT * FROM packages WHERE is_active = 1 ORDER BY id ASC")->fetchAll();

// Package details if pre-selected
$selectedPackage = null;
$packageItems = [];
if ($preselectedPackageId) {
    $pkgStmt = $pdo->prepare("SELECT * FROM packages WHERE id = ? AND is_active = 1");
    $pkgStmt->execute([$preselectedPackageId]);
    $selectedPackage = $pkgStmt->fetch();

    if ($selectedPackage) {
        $pItemsStmt = $pdo->prepare("SELECT pi.*, e.name as equipment_name, e.available_qty FROM package_items pi JOIN equipment e ON pi.equipment_id = e.id WHERE pi.package_id = ?");
        $pItemsStmt->execute([$preselectedPackageId]);
        $packageItems = $pItemsStmt->fetchAll();
    }
}

// Handle Form Submission
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $token = $_POST['csrf_token'] ?? '';
    if (!verifyCsrfToken($token)) {
        $error = "Security validation failed (Invalid or expired CSRF token). Please submit your request again.";
    } else {
        $event_name = trim($_POST['event_name'] ?? '');
        $event_type = trim($_POST['event_type'] ?? 'Seminar');
        $event_location = trim($_POST['event_location'] ?? '');
        $expected_attendees = (int)($_POST['expected_attendees'] ?? 0);
        $start_datetime = trim($_POST['start_datetime'] ?? '');
        $end_datetime = trim($_POST['end_datetime'] ?? '');
        $purpose = trim($_POST['purpose'] ?? '');
        $package_id = !empty($_POST['package_id']) ? (int)$_POST['package_id'] : null;
        
        // Equipment selection from form: array of [equipment_id => qty]
        $selectedItems = $_POST['items'] ?? []; // format: items[equipment_id] = qty

        // Basic Validation
        if (empty($event_name) || empty($event_location) || empty($start_datetime) || empty($end_datetime) || empty($purpose)) {
            $error = "Please fill in all mandatory event details marked with (*).";
        } elseif (strtotime($end_datetime) <= strtotime($start_datetime)) {
            $error = "End date & time must be after the start date & time.";
        } elseif (strtotime($start_datetime) < time() - 300) {
            $error = "Start date & time cannot be in the past.";
        } else {
            // Filter out items with quantity <= 0
            $validItems = [];
            foreach ($selectedItems as $eqId => $qty) {
                $qty = (int)$qty;
                if ($qty > 0) {
                    $validItems[(int)$eqId] = $qty;
                }
            }

            if (empty($validItems)) {
                $error = "Please select at least ONE equipment item with quantity greater than 0.";
            } else {
                // Check availability of each item
                $stockIssue = false;
                foreach ($validItems as $eqId => $qty) {
                    $chkStmt = $pdo->prepare("SELECT name, available_qty FROM equipment WHERE id = ?");
                    $chkStmt->execute([$eqId]);
                    $itemInfo = $chkStmt->fetch();
                    if (!$itemInfo || $itemInfo['available_qty'] < $qty) {
                        $error = "Requested quantity for '{$itemInfo['name']}' exceeds available stock ({$itemInfo['available_qty']} units available).";
                        $stockIssue = true;
                        break;
                    }
                }

                if (!$stockIssue) {
                    try {
                        $pdo->beginTransaction();

                        // Generate Reference Number
                        $refNo = generateBookingRef($pdo);

                        // Insert Booking Record
                        $insStmt = $pdo->prepare("
                            INSERT INTO bookings (
                                booking_reference, user_id, package_id, event_name, event_type, 
                                event_location, expected_attendees, start_datetime, end_datetime, purpose, status
                            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Pending')
                        ");
                        $insStmt->execute([
                            $refNo,
                            $userId,
                            $package_id,
                            $event_name,
                            $event_type,
                            $event_location,
                            $expected_attendees,
                            $start_datetime,
                            $end_datetime,
                            $purpose
                        ]);
                        $bookingId = $pdo->lastInsertId();

                        // Insert Booking Items
                        $insItemStmt = $pdo->prepare("INSERT INTO booking_items (booking_id, equipment_id, quantity) VALUES (?, ?, ?)");
                        foreach ($validItems as $eqId => $qty) {
                            $insItemStmt->execute([$bookingId, $eqId, $qty]);
                        }

                        $pdo->commit();

                        setFlash('success', "Equipment booking request submitted successfully! Your Reference No. is {$refNo}. PinjamGeng administrators will review your application.");
                        header("Location: " . base_url('user/booking_details.php?id=' . $bookingId));
                        exit;

                    } catch (Exception $e) {
                        $pdo->rollBack();
                        $error = "Failed to process application: " . $e->getMessage();
                    }
                }
            }
        }
    }
}

// Pre-fill defaults
$defaultEventType = $selectedPackage ? $selectedPackage['event_type'] : 'Seminar';
$defaultEventName = $selectedPackage ? "UPTM {$selectedPackage['event_type']} Program" : '';
$defaultAttendees = $selectedPackage ? (int)filter_var($selectedPackage['suggested_attendees'], FILTER_SANITIZE_NUMBER_INT) : 50;

$pageTitle = "Booking Application Form";
include __DIR__ . '/../includes/header.php';
?>

<div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    
    <?php include __DIR__ . '/../includes/alerts.php'; ?>

    <!-- Title Banner -->
    <div class="mb-8">
        <div class="flex items-center space-x-2 text-xs font-bold text-caramel uppercase tracking-wider mb-1 font-display">
            <i class="fa-solid fa-calendar-plus"></i>
            <span>Campus Equipment Loan Application Form</span>
        </div>
        <h1 class="font-display text-2xl sm:text-3xl font-extrabold text-coffee-950 tracking-tight">
            Loan Application <span class="text-caramel">PinjamGeng</span>
        </h1>
        <p class="text-xs sm:text-sm text-coffee-600 mt-1">
            Complete event details and specify equipment quantities. If a preset package was selected, items are pre-loaded automatically.
        </p>
    </div>

    <!-- Package Notification Card if Package was chosen -->
    <?php if ($selectedPackage): ?>
        <div class="mb-6 p-5 rounded-3xl bg-coffee-100/80 border border-coffee-200/90 shadow-warm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div class="flex items-center space-x-4">
                <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-caramel to-coffee-800 text-amber-gold flex items-center justify-center text-xl flex-shrink-0 shadow-sm">
                    <i class="fa-solid <?= sanitize($selectedPackage['icon']) ?>"></i>
                </div>
                <div>
                    <span class="inline-flex items-center px-2 py-0.5 rounded-lg text-[10px] font-extrabold uppercase bg-caramel/20 text-caramel border border-caramel/30 font-display">
                        Selected Event Package (Star FYP)
                    </span>
                    <h3 class="font-display font-bold text-coffee-950 text-base mt-0.5">
                        <?= sanitize($selectedPackage['name']) ?>
                    </h3>
                    <p class="text-xs text-coffee-600">
                        <?= count($packageItems) ?> equipment types in this package have been pre-filled in the checklist below.
                    </p>
                </div>
            </div>
            <a href="<?= base_url('user/packages.php') ?>" class="text-xs font-bold text-caramel hover:text-caramel-hover whitespace-nowrap flex items-center">
                Change Package <i class="fa-solid fa-arrow-right ml-1.5 text-xs"></i>
            </a>
        </div>
    <?php endif; ?>

    <?php if (!empty($error)): ?>
        <div class="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center">
            <i class="fa-solid fa-circle-exclamation text-lg mr-2.5 text-rose-500 flex-shrink-0"></i>
            <span><?= sanitize($error) ?></span>
        </div>
    <?php endif; ?>

    <form method="POST" action="" id="bookingForm" class="space-y-8">
        <?= csrfField() ?>
        <input type="hidden" name="package_id" value="<?= $selectedPackage ? $selectedPackage['id'] : '' ?>">

        <!-- Section 1: Event Information -->
        <div class="bg-white rounded-3xl border border-coffee-200/90 shadow-warm p-6 sm:p-8">
            <h2 class="font-display text-base font-bold text-coffee-950 flex items-center pb-4 border-b border-coffee-100 mb-6">
                <i class="fa-solid fa-circle-info text-caramel mr-2.5"></i> 1. Event Information & Schedule (Event Schedule)
            </h2>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                
                <div class="sm:col-span-2">
                    <label class="block text-xs font-bold text-coffee-800 uppercase tracking-wider mb-1.5">
                        Event Name / Program Title <span class="text-rose-500">*</span>
                    </label>
                    <input type="text" name="event_name" required 
                           value="<?= sanitize($_POST['event_name'] ?? $defaultEventName) ?>" 
                           placeholder="e.g. UPTM Artificial Intelligence (AI) Innovation Seminar 2026" 
                           class="w-full px-4 py-2.5 border border-coffee-200 rounded-2xl text-sm bg-coffee-50/40 text-coffee-950 focus:bg-white focus:ring-2 focus:ring-caramel focus:border-caramel focus:outline-none transition-all">
                </div>

                <div>
                    <label class="block text-xs font-bold text-coffee-800 uppercase tracking-wider mb-1.5">
                        Event Category <span class="text-rose-500">*</span>
                    </label>
                    <select name="event_type" id="eventTypeSelect" class="w-full px-4 py-2.5 border border-coffee-200 rounded-2xl text-sm bg-coffee-50/40 text-coffee-950 focus:bg-white focus:ring-2 focus:ring-caramel focus:border-caramel focus:outline-none transition-all">
                        <option value="Seminar" <?= (($_POST['event_type'] ?? $defaultEventType) === 'Seminar') ? 'selected' : '' ?>>Seminar / Guest Lecture</option>
                        <option value="Workshop" <?= (($_POST['event_type'] ?? $defaultEventType) === 'Workshop') ? 'selected' : '' ?>>Workshop / Hands-on Lab</option>
                        <option value="Meeting" <?= (($_POST['event_type'] ?? $defaultEventType) === 'Meeting') ? 'selected' : '' ?>>Formal Meeting / Conference</option>
                        <option value="Photography" <?= (($_POST['event_type'] ?? $defaultEventType) === 'Photography') ? 'selected' : '' ?>>Photography & Media Coverage</option>
                        <option value="Sports" <?= (($_POST['event_type'] ?? $defaultEventType) === 'Sports') ? 'selected' : '' ?>>Sports Activity & Outdoor Carnival</option>
                        <option value="Other" <?= (($_POST['event_type'] ?? $defaultEventType) === 'Other') ? 'selected' : '' ?>>Other Event</option>
                    </select>
                </div>

                <div>
                    <label class="block text-xs font-bold text-coffee-800 uppercase tracking-wider mb-1.5">
                        Campus Location / Room <span class="text-rose-500">*</span>
                    </label>
                    <input type="text" name="event_location" required 
                           value="<?= sanitize($_POST['event_location'] ?? '') ?>" 
                           placeholder="e.g. Dewan Gemilang Level 2 / Multimedia Lab Block C" 
                           class="w-full px-4 py-2.5 border border-coffee-200 rounded-2xl text-sm bg-coffee-50/40 text-coffee-950 focus:bg-white focus:ring-2 focus:ring-caramel focus:border-caramel focus:outline-none transition-all">
                </div>

                <div>
                    <label class="block text-xs font-bold text-coffee-800 uppercase tracking-wider mb-1.5">
                        Estimated Attendees (Pax)
                    </label>
                    <input type="number" name="expected_attendees" min="1" max="2000" 
                           value="<?= (int)($_POST['expected_attendees'] ?? $defaultAttendees) ?>" 
                           class="w-full px-4 py-2.5 border border-coffee-200 rounded-2xl text-sm bg-coffee-50/40 text-coffee-950 focus:bg-white focus:ring-2 focus:ring-caramel focus:border-caramel focus:outline-none transition-all">
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:col-span-2">
                    <div>
                        <label class="block text-xs font-bold text-coffee-800 uppercase tracking-wider mb-1.5">
                            Pickup Date & Time (Start DateTime) <span class="text-rose-500">*</span>
                        </label>
                        <input type="datetime-local" name="start_datetime" required 
                               value="<?= sanitize($_POST['start_datetime'] ?? date('Y-m-d\TH:i', strtotime('+1 day 09:00'))) ?>" 
                               class="w-full px-4 py-2.5 border border-coffee-200 rounded-2xl text-sm bg-coffee-50/40 text-coffee-950 focus:bg-white focus:ring-2 focus:ring-caramel focus:border-caramel focus:outline-none transition-all">
                    </div>
                    <div>
                        <label class="block text-xs font-bold text-coffee-800 uppercase tracking-wider mb-1.5">
                            Return Date & Time (End DateTime) <span class="text-rose-500">*</span>
                        </label>
                        <input type="datetime-local" name="end_datetime" required 
                               value="<?= sanitize($_POST['end_datetime'] ?? date('Y-m-d\TH:i', strtotime('+1 day 17:00'))) ?>" 
                               class="w-full px-4 py-2.5 border border-coffee-200 rounded-2xl text-sm bg-coffee-50/40 text-coffee-950 focus:bg-white focus:ring-2 focus:ring-caramel focus:border-caramel focus:outline-none transition-all">
                    </div>
                </div>

                <div class="sm:col-span-2">
                    <label class="block text-xs font-bold text-coffee-800 uppercase tracking-wider mb-1.5">
                        Application Purpose & Brief Description <span class="text-rose-500">*</span>
                    </label>
                    <textarea name="purpose" rows="3" required placeholder="State the purpose of the equipment loan, target audience, and organizing club / faculty..." class="w-full px-4 py-2.5 border border-coffee-200 rounded-2xl text-sm bg-coffee-50/40 text-coffee-950 focus:bg-white focus:ring-2 focus:ring-caramel focus:border-caramel focus:outline-none transition-all"><?= sanitize($_POST['purpose'] ?? '') ?></textarea>
                </div>

            </div>
        </div>

        <!-- Section 2: Equipment Selection -->
        <div class="bg-white rounded-3xl border border-coffee-200/90 shadow-warm p-6 sm:p-8">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-coffee-100 mb-6 gap-2">
                <div>
                    <h2 class="font-display text-base font-bold text-coffee-950 flex items-center">
                        <i class="fa-solid fa-boxes-stacked text-caramel mr-2.5"></i> 2. Equipment Selection & Quantities (Equipment Selection)
                    </h2>
                    <p class="text-xs text-coffee-600 mt-0.5">Specify the quantity of each equipment unit you wish to reserve.</p>
                </div>
                <div class="text-xs text-coffee-600">
                    <span class="inline-flex items-center px-3 py-1 rounded-xl bg-coffee-100 font-bold text-coffee-900 border border-coffee-200">
                        <i class="fa-solid fa-check text-emerald-600 mr-1.5"></i> Real-time stock verified
                    </span>
                </div>
            </div>

            <div class="space-y-3">
                <?php 
                    $prefilledQtys = [];
                    if (!empty($_POST['items'])) {
                        $prefilledQtys = $_POST['items'];
                    } elseif ($selectedPackage && !empty($packageItems)) {
                        foreach ($packageItems as $pi) {
                            $prefilledQtys[$pi['equipment_id']] = $pi['quantity'];
                        }
                    } elseif ($preselectedEquipmentId) {
                        $prefilledQtys[$preselectedEquipmentId] = 1;
                    }
                ?>

                <div class="overflow-x-auto rounded-2xl border border-coffee-200">
                    <table class="w-full text-left text-xs text-coffee-800">
                        <thead class="bg-coffee-100/80 text-coffee-900 uppercase font-bold text-[11px] border-b border-coffee-200 font-display">
                            <tr>
                                <th class="py-3.5 px-4">Equipment Details</th>
                                <th class="py-3.5 px-4">Store Location</th>
                                <th class="py-3.5 px-4">Current Stock</th>
                                <th class="py-3.5 px-4 text-center w-36">Requested Qty</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-coffee-100">
                            <?php foreach ($allEquipment as $eq): ?>
                                <?php 
                                    $eqId = $eq['id'];
                                    $currentQty = isset($prefilledQtys[$eqId]) ? (int)$prefilledQtys[$eqId] : 0;
                                    $isPreselected = ($currentQty > 0);
                                ?>
                                <tr class="hover:bg-coffee-50 transition-colors <?= $isPreselected ? 'bg-coffee-100/60' : '' ?>">
                                    <td class="py-3 px-4">
                                        <div class="flex items-center space-x-2.5">
                                            <span class="font-mono text-[10px] text-coffee-700 bg-coffee-100 px-2 py-0.5 rounded-lg border border-coffee-200">
                                                <?= sanitize($eq['asset_tag']) ?>
                                            </span>
                                            <div>
                                                <span class="font-bold text-coffee-950 block"><?= sanitize($eq['name']) ?></span>
                                                <span class="text-[11px] text-coffee-600"><?= sanitize($eq['brand_model']) ?> • <span class="text-caramel font-semibold"><?= sanitize($eq['category_name']) ?></span></span>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="py-3 px-4 whitespace-nowrap text-coffee-600">
                                        <i class="fa-solid fa-location-dot mr-1 text-caramel text-[10px]"></i> <?= sanitize($eq['location']) ?>
                                    </td>
                                    <td class="py-3 px-4 whitespace-nowrap">
                                        <?php if ($eq['available_qty'] > 0): ?>
                                            <span class="font-bold text-emerald-700">
                                                <?= $eq['available_qty'] ?> units in stock
                                            </span>
                                        <?php else: ?>
                                            <span class="font-bold text-rose-600">
                                                Fully borrowed
                                            </span>
                                        <?php endif; ?>
                                    </td>
                                    <td class="py-3 px-4 text-center">
                                        <div class="flex items-center justify-center space-x-1.5">
                                            <button type="button" onclick="decrementQty(<?= $eqId ?>)" class="w-8 h-8 rounded-xl bg-coffee-100 hover:bg-coffee-200 text-coffee-900 flex items-center justify-center font-bold text-xs transition-colors">-</button>
                                            <input type="number" 
                                                   id="qty_<?= $eqId ?>" 
                                                   name="items[<?= $eqId ?>]" 
                                                   value="<?= $currentQty ?>" 
                                                   min="0" 
                                                   max="<?= $eq['available_qty'] ?>" 
                                                   class="w-14 py-1 text-center font-bold text-coffee-950 border border-coffee-300 rounded-xl text-xs bg-white focus:ring-2 focus:ring-caramel focus:outline-none">
                                            <button type="button" onclick="incrementQty(<?= $eqId ?>, <?= $eq['available_qty'] ?>)" class="w-8 h-8 rounded-xl bg-coffee-100 hover:bg-coffee-200 text-coffee-900 flex items-center justify-center font-bold text-xs transition-colors">+</button>
                                        </div>
                                    </td>
                                </tr>
                            <?php endforeach; ?>
                        </tbody>
                    </table>
                </div>

            </div>
        </div>

        <!-- Section 3: Applicant Terms & Submit -->
        <div class="bg-white rounded-3xl border border-coffee-200/90 shadow-warm p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div class="text-xs text-coffee-600 space-y-1 max-w-xl">
                <span class="font-bold text-coffee-950 font-display block text-sm">UPTM Borrower Responsibility Agreement</span>
                <p class="leading-relaxed">
                    By submitting this application, the borrower agrees to handle all equipment with care, inspect condition upon collection at the store, and return all items in good working condition by the agreed return time.
                </p>
            </div>
            <div class="flex-shrink-0">
                <button type="submit" class="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 rounded-2xl font-bold bg-gradient-to-r from-caramel to-coffee-800 hover:from-caramel-hover hover:to-coffee-900 text-white shadow-warm transition-all active:scale-[0.98]">
                    <i class="fa-solid fa-paper-plane mr-2 text-amber-gold"></i> Submit PinjamGeng Application
                </button>
            </div>
        </div>

    </form>

</div>

<script>
    function incrementQty(id, max) {
        const input = document.getElementById('qty_' + id);
        let val = parseInt(input.value) || 0;
        if (val < max) {
            input.value = val + 1;
            highlightRow(input);
        }
    }

    function decrementQty(id) {
        const input = document.getElementById('qty_' + id);
        let val = parseInt(input.value) || 0;
        if (val > 0) {
            input.value = val - 1;
            highlightRow(input);
        }
    }

    function highlightRow(input) {
        const row = input.closest('tr');
        if (parseInt(input.value) > 0) {
            row.classList.add('bg-coffee-100/60');
        } else {
            row.classList.remove('bg-coffee-100/60');
        }
    }
</script>

<?php include __DIR__ . '/../includes/footer.php'; ?>
