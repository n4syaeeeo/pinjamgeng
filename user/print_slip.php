<?php
// Printable Official UPTM Equipment Loan Slip - PinjamGeng
// Smart Event Equipment Booking and Inventory Management System (UPTM)

require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../config/auth.php';
require_once __DIR__ . '/../config/helpers.php';

requireLogin();
$user = currentUser();
$bookingId = (int)($_GET['id'] ?? 0);

$stmt = $pdo->prepare("
    SELECT b.*, p.name as package_name,
           u_app.full_name as applicant_name, u_app.matric_staff_id as applicant_matric, 
           u_app.email as applicant_email, u_app.phone as applicant_phone, u_app.faculty_department as applicant_faculty,
           u_adm.full_name as approved_by_name, u_adm.matric_staff_id as approved_by_staff_id
    FROM bookings b
    JOIN users u_app ON b.user_id = u_app.id
    LEFT JOIN packages p ON b.package_id = p.id
    LEFT JOIN users u_adm ON b.approved_by = u_adm.id
    WHERE b.id = ?
");
$stmt->execute([$bookingId]);
$booking = $stmt->fetch();

if (!$booking) {
    die("Booking record not found.");
}

if (!isAdmin() && $booking['user_id'] != $user['id']) {
    die("Unauthorized access.");
}

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
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Equipment Loan Slip - <?= sanitize($booking['booking_reference']) ?> | PinjamGeng UPTM</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Plus Jakarta Sans', sans-serif; }
        .font-display { font-family: 'Outfit', sans-serif; }
        @media print {
            .no-print { display: none !important; }
            body { padding: 0; background: white; }
            .print-page { border: none !important; box-shadow: none !important; margin: 0 !important; width: 100% !important; }
        }
    </style>
</head>
<body class="bg-[#f7f2ea] py-8 text-slate-900 text-xs antialiased">

    <!-- Print Control Bar -->
    <div class="max-w-4xl mx-auto mb-6 px-4 no-print flex items-center justify-between">
        <a href="<?= base_url('user/booking_details.php?id=' . $booking['id']) ?>" class="inline-flex items-center text-xs font-bold text-amber-900 hover:text-amber-700">
            <i class="fa-solid fa-arrow-left mr-1.5"></i> Back to Booking Details
        </a>
        <div class="flex items-center space-x-2">
            <button onclick="window.print()" class="px-5 py-2.5 rounded-2xl text-xs font-bold bg-[#382112] text-amber-300 hover:bg-[#231308] shadow-md flex items-center transition-all">
                <i class="fa-solid fa-print mr-2 text-amber-400"></i> Print Official Slip (A4)
            </button>
        </div>
    </div>

    <!-- Printable Official Document Container (A4 layout) -->
    <div class="max-w-4xl mx-auto bg-white p-8 sm:p-12 rounded-3xl shadow-lg border border-amber-900/10 print-page space-y-6">
        
        <!-- Header Section with University & PinjamGeng Title -->
        <div class="border-b-2 border-slate-900 pb-5 flex items-start justify-between">
            <div class="flex items-center space-x-4">
                <div class="w-14 h-14 rounded-2xl bg-[#231308] text-amber-400 flex flex-col items-center justify-center font-black shadow">
                    <span class="text-xs tracking-tighter">UPTM</span>
                    <i class="fa-solid fa-boxes-packing text-xs mt-0.5"></i>
                </div>
                <div>
                    <h1 class="text-base font-extrabold tracking-tight uppercase text-slate-900 leading-tight font-display">
                        UNIVERSITI POLY-TECH MALAYSIA (UPTM)
                    </h1>
                    <p class="text-xs font-bold text-slate-700 uppercase">
                        FACULTY OF COMPUTING & MULTIMEDIA (FCM)
                    </p>
                    <p class="text-[11px] text-slate-500 font-medium">
                        PinjamGeng • Campus Smart Event Equipment Booking & Inventory System
                    </p>
                </div>
            </div>
            <div class="text-right">
                <span class="inline-block px-3 py-1 bg-amber-50 border border-amber-300 rounded-lg font-mono font-bold text-sm text-slate-900">
                    <?= sanitize($booking['booking_reference']) ?>
                </span>
                <span class="block text-[10px] text-slate-500 mt-1">Print Date: <?= date('d/m/Y') ?></span>
                <span class="block text-[10px] font-bold text-amber-800 mt-0.5 uppercase">Status: <?= sanitize($booking['status']) ?></span>
            </div>
        </div>

        <div class="text-center py-2 bg-amber-50/70 border border-amber-200 rounded-xl">
            <h2 class="text-xs font-extrabold uppercase tracking-wider text-amber-950 font-display">
                OFFICIAL CAMPUS EVENT EQUIPMENT LOAN & APPROVAL SLIP
            </h2>
        </div>

        <!-- 1. Applicant & Event Details Grid -->
        <div class="grid grid-cols-2 gap-6 text-xs">
            <!-- Col 1: Applicant -->
            <div class="space-y-1.5 border border-slate-200 p-4 rounded-xl bg-slate-50/50">
                <span class="font-bold uppercase tracking-wider text-[10px] text-slate-600 block mb-1 font-display">
                    SECTION A: APPLICANT DETAILS
                </span>
                <div><strong>Applicant Name:</strong> <?= sanitize($booking['applicant_name']) ?></div>
                <div><strong>Matric / Staff ID:</strong> <?= sanitize($booking['applicant_matric']) ?></div>
                <div><strong>Faculty / Department:</strong> <?= sanitize($booking['applicant_faculty']) ?></div>
                <div><strong>Phone Number:</strong> <?= sanitize($booking['applicant_phone']) ?></div>
                <div><strong>Official Email:</strong> <?= sanitize($booking['applicant_email']) ?></div>
            </div>

            <!-- Col 2: Event Information -->
            <div class="space-y-1.5 border border-slate-200 p-4 rounded-xl bg-slate-50/50">
                <span class="font-bold uppercase tracking-wider text-[10px] text-slate-600 block mb-1 font-display">
                    SECTION B: EVENT INFORMATION
                </span>
                <div><strong>Event Name:</strong> <?= sanitize($booking['event_name']) ?></div>
                <div><strong>Event Type:</strong> <?= sanitize($booking['event_type']) ?></div>
                <div><strong>Location / Hall:</strong> <?= sanitize($booking['event_location']) ?></div>
                <div><strong>Start Date & Time:</strong> <?= formatDateTime($booking['start_datetime'], 'd/m/Y h:i A') ?></div>
                <div><strong>End Date & Time:</strong> <?= formatDateTime($booking['end_datetime'], 'd/m/Y h:i A') ?></div>
            </div>
        </div>

        <!-- 2. Equipment Schedule Table -->
        <div>
            <span class="font-bold uppercase tracking-wider text-[10px] text-slate-600 block mb-2 font-display">
                SECTION C: BORROWED EQUIPMENT SCHEDULE (<?= count($items) ?> ITEMS)
            </span>
            <table class="w-full text-left border-collapse border border-slate-300 text-[11px]">
                <thead>
                    <tr class="bg-slate-100 text-slate-800 border-b border-slate-300">
                        <th class="p-2 border border-slate-300 w-10 text-center">No.</th>
                        <th class="p-2 border border-slate-300 w-32">Asset Tag</th>
                        <th class="p-2 border border-slate-300">Equipment Name & Model</th>
                        <th class="p-2 border border-slate-300 w-28">Category</th>
                        <th class="p-2 border border-slate-300 w-16 text-center">Quantity</th>
                        <th class="p-2 border border-slate-300 w-28 text-center">Return Status</th>
                    </tr>
                </thead>
                <tbody>
                    <?php $no = 1; foreach ($items as $it): ?>
                        <tr class="border-b border-slate-200">
                            <td class="p-2 border border-slate-300 text-center"><?= $no++ ?></td>
                            <td class="p-2 border border-slate-300 font-mono font-bold"><?= sanitize($it['asset_tag']) ?></td>
                            <td class="p-2 border border-slate-300">
                                <strong><?= sanitize($it['equipment_name']) ?></strong>
                                <span class="block text-[10px] text-slate-500"><?= sanitize($it['brand_model']) ?></span>
                            </td>
                            <td class="p-2 border border-slate-300 text-slate-600"><?= sanitize($it['category_name']) ?></td>
                            <td class="p-2 border border-slate-300 text-center font-bold"><?= $it['quantity'] ?></td>
                            <td class="p-2 border border-slate-300 text-center">
                                <?= $it['return_condition'] ? sanitize($it['return_condition']) : 'Not Returned Yet' ?>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>

        <!-- 3. Terms & Regulations -->
        <div class="border border-slate-200 p-3.5 rounded-xl text-[10px] text-slate-600 leading-tight space-y-1 bg-slate-50/40">
            <strong class="text-slate-800 block">EQUIPMENT LOAN TERMS & REGULATIONS (PINJAMGENG UPTM):</strong>
            <p>1. The borrower assumes full responsibility for the safety, care, and cleanliness of all equipment during the loan period.</p>
            <p>2. Any damage or loss due to negligence must be reimbursed based on the actual repair or replacement cost.</p>
            <p>3. Equipment must be returned promptly according to the agreed schedule in the PinjamGeng system.</p>
        </div>

        <!-- 4. Signatures Box -->
        <div class="pt-4 grid grid-cols-3 gap-6 text-[11px] text-slate-800">
            <!-- Applicant Signature -->
            <div class="border-t-2 border-slate-400 pt-2 text-center">
                <div class="h-16 flex items-center justify-center italic text-slate-400 text-xs">
                    (Digitally signed upon submission)
                </div>
                <div class="border-t border-slate-300 pt-1">
                    <strong>Applicant Signature</strong>
                    <div class="text-[10px] text-slate-600"><?= sanitize($booking['applicant_name']) ?></div>
                    <div class="text-[10px] text-slate-400">Date: <?= formatDateOnly($booking['created_at']) ?></div>
                </div>
            </div>

            <!-- Lab Officer Signature -->
            <div class="border-t-2 border-slate-400 pt-2 text-center">
                <div class="h-16 flex items-center justify-center italic text-slate-400 text-xs">
                    <?php if ($booking['approved_by_name']): ?>
                        <span class="text-emerald-700 font-bold">APPROVED (ADMIN)</span>
                    <?php else: ?>
                        (Officer on Duty Signature)
                    <?php endif; ?>
                </div>
                <div class="border-t border-slate-300 pt-1">
                    <strong>Authorizing Officer / AV Support</strong>
                    <div class="text-[10px] text-slate-600"><?= sanitize($booking['approved_by_name'] ?: 'En. Khairul / Lab Officer') ?></div>
                    <div class="text-[10px] text-slate-400">Date: <?= $booking['approved_at'] ? formatDateOnly($booking['approved_at']) : '...............' ?></div>
                </div>
            </div>

            <!-- Return Inspection Signature -->
            <div class="border-t-2 border-slate-400 pt-2 text-center">
                <div class="h-16 flex items-center justify-center italic text-slate-400 text-xs">
                    <?php if ($booking['returned_at']): ?>
                        <span class="text-slate-800 font-bold">RETURNED & VERIFIED</span>
                    <?php else: ?>
                        (Return Desk Stamp / Signature)
                    <?php endif; ?>
                </div>
                <div class="border-t border-slate-300 pt-1">
                    <strong>Return Acceptance Officer</strong>
                    <div class="text-[10px] text-slate-600">FCM Asset Management Unit</div>
                    <div class="text-[10px] text-slate-400">Date: <?= $booking['returned_at'] ? formatDateOnly($booking['returned_at']) : '...............' ?></div>
                </div>
            </div>
        </div>

        <div class="pt-4 border-t border-slate-200 text-center text-[9px] text-slate-400">
            Automatically generated from PinjamGeng System • UPTM Final Year Project (FYP).
        </div>

    </div>

</body>
</html>
