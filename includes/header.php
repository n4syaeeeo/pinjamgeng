<?php
// Main Header Component - PinjamGeng
require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../config/auth.php';
require_once __DIR__ . '/../config/helpers.php';

$user = currentUser();
$currentPage = basename($_SERVER['PHP_SELF'] ?? '');
$currentDir = basename(dirname($_SERVER['PHP_SELF'] ?? ''));

// Get pending bookings count for admin badge
$pendingCount = 0;
if (isAdmin()) {
    try {
        $pendingStmt = $pdo->query("SELECT COUNT(*) FROM bookings WHERE status = 'Pending'");
        $pendingCount = (int)$pendingStmt->fetchColumn();
    } catch (Exception $e) {
        $pendingCount = 0;
    }
}
?>
<!DOCTYPE html>
<html lang="en" class="h-full bg-[#fdfbf7]">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= isset($pageTitle) ? sanitize($pageTitle) . ' | ' : '' ?>PinjamGeng • UPTM Event Equipment</title>
    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        coffee: {
                            50: '#fdfbf7',   // warm linen cream
                            100: '#f7f2ea',  // warm oat
                            200: '#ece3d5',  // soft border
                            300: '#ded0bf',  // muted sand
                            400: '#c2a88f',  // warm tan
                            500: '#a68263',  // hazelnut
                            600: '#8c6544',  // rich caramel
                            700: '#6f4a2d',  // mocha roast
                            800: '#52341d',  // dark espresso
                            900: '#382112',  // deep chocolate
                            950: '#231308',  // midnight bean
                        },
                        caramel: {
                            light: '#fff5ed',
                            DEFAULT: '#d97736',
                            hover: '#c46222',
                            dark: '#9a4714'
                        },
                        amber: {
                            gold: '#e5a953'
                        }
                    },
                    fontFamily: {
                        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
                        display: ['Outfit', 'Plus Jakarta Sans', 'sans-serif']
                    },
                    boxShadow: {
                        'warm': '0 4px 20px -2px rgba(82, 52, 29, 0.08)',
                        'warm-lg': '0 10px 25px -3px rgba(82, 52, 29, 0.12)',
                    }
                }
            }
        }
    </script>
    <!-- Font Awesome 6 -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <!-- Google Fonts: Plus Jakarta Sans & Outfit -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Plus Jakarta Sans', sans-serif; }
        .font-display { font-family: 'Outfit', sans-serif; }
        .gradient-coffee {
            background: linear-gradient(135deg, #241308 0%, #3a2012 50%, #54331c 100%);
        }
        .gradient-caramel {
            background: linear-gradient(135deg, #d97736 0%, #b45309 100%);
        }
        @media print {
            .no-print { display: none !important; }
            .print-only { display: block !important; }
        }
    </style>
</head>
<body class="flex flex-col min-h-screen bg-[#fdfbf7] text-coffee-950 antialiased selection:bg-caramel selection:text-white">

    <!-- Top Announcement Strip -->
    <div class="bg-coffee-950 text-coffee-300 text-xs py-1.5 px-4 sm:px-8 border-b border-coffee-900/80 no-print flex flex-wrap justify-between items-center">
        <div class="flex items-center space-x-3">
            <span class="inline-flex items-center text-amber-gold font-semibold tracking-wide">
                <i class="fa-solid fa-graduation-cap mr-1.5"></i> Universiti Poly-Tech Malaysia (UPTM)
            </span>
            <span class="hidden md:inline text-coffee-700">•</span>
            <span class="hidden md:inline text-coffee-400">Faculty of Computing & Multimedia</span>
            <span class="hidden lg:inline text-coffee-700">•</span>
            <span class="hidden lg:inline text-coffee-300">
                <i class="fa-solid fa-sparkles text-amber-gold mr-1"></i> PinjamGeng Official Portal
            </span>
        </div>
        <div class="flex items-center space-x-4">
            <?php if (isLoggedIn()): ?>
                <span class="text-coffee-200 flex items-center">
                    <span class="w-2 h-2 rounded-full bg-emerald-400 mr-2 animate-pulse"></span>
                    <?= sanitize($user['name']) ?> 
                    <span class="ml-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase <?= $user['role'] === 'admin' ? 'bg-amber-gold text-coffee-950' : 'bg-coffee-700 text-coffee-100' ?>">
                        <?= sanitize($user['role']) ?>
                    </span>
                </span>
                <a href="<?= base_url('logout.php') ?>" class="text-rose-300 hover:text-rose-200 transition-colors font-medium">
                    <i class="fa-solid fa-arrow-right-from-bracket mr-1"></i> Sign Out
                </a>
            <?php else: ?>
                <a href="<?= base_url('login.php') ?>" class="text-amber-gold hover:text-amber-300 font-semibold transition-colors">
                    <i class="fa-solid fa-user-lock mr-1"></i> Staff / Student Sign In
                </a>
            <?php endif; ?>
        </div>
    </div>

    <!-- Main Navigation Bar -->
    <header class="gradient-coffee text-white shadow-warm sticky top-0 z-50 no-print border-b border-coffee-800/60 backdrop-blur-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-16 sm:h-18">
                
                <!-- Logo & Brand Title: PinjamGeng -->
                <div class="flex items-center space-x-3">
                    <a href="<?= base_url(isLoggedIn() ? (isAdmin() ? 'admin/dashboard.php' : 'user/dashboard.php') : 'index.php') ?>" class="flex items-center space-x-3 group">
                        <div class="w-10 h-10 rounded-2xl bg-gradient-to-br from-caramel to-amber-gold p-2 shadow-md flex items-center justify-center text-white group-hover:scale-105 transition-transform">
                            <i class="fa-solid fa-boxes-packing text-lg"></i>
                        </div>
                        <div>
                            <div class="flex items-center space-x-1.5">
                                <span class="font-display font-extrabold text-xl tracking-tight text-white group-hover:text-amber-gold transition-colors">
                                    Pinjam<span class="text-amber-gold">Geng</span>
                                </span>
                                <span class="px-1.5 py-0.2 rounded text-[10px] font-black uppercase bg-white/10 text-coffee-200 border border-white/15">
                                    UPTM
                                </span>
                            </div>
                            <span class="text-[11px] text-coffee-300 block -mt-0.5 tracking-wide font-medium">
                                Smart Event Equipment Booking & Inventory System
                            </span>
                        </div>
                    </a>
                </div>

                <!-- Desktop Navigation Links -->
                <nav class="hidden md:flex items-center space-x-1.5 text-xs font-semibold">
                    <?php if (!isLoggedIn()): ?>
                        <a href="<?= base_url('index.php') ?>" class="px-3.5 py-2 rounded-xl transition-all <?= $currentPage === 'index.php' ? 'bg-white/15 text-white shadow-sm' : 'text-coffee-200 hover:text-white hover:bg-white/10' ?>">
                            <i class="fa-solid fa-house mr-1.5 text-amber-gold"></i> Home
                        </a>
                        <a href="<?= base_url('user/packages.php') ?>" class="px-3.5 py-2 rounded-xl transition-all <?= $currentPage === 'packages.php' ? 'bg-white/15 text-white shadow-sm' : 'text-coffee-200 hover:text-white hover:bg-white/10' ?>">
                            <i class="fa-solid fa-cubes-stacked mr-1.5 text-caramel"></i> Event Packages
                        </a>
                        <a href="<?= base_url('user/equipment.php') ?>" class="px-3.5 py-2 rounded-xl transition-all <?= $currentPage === 'equipment.php' ? 'bg-white/15 text-white shadow-sm' : 'text-coffee-200 hover:text-white hover:bg-white/10' ?>">
                            <i class="fa-solid fa-layer-group mr-1.5 opacity-80"></i> Equipment Catalog
                        </a>
                        <a href="<?= base_url('login.php') ?>" class="ml-2 px-4 py-2 rounded-xl font-bold bg-gradient-to-r from-caramel to-amber-gold hover:from-caramel-hover hover:to-amber-500 text-coffee-950 shadow-md transition-all flex items-center">
                            <i class="fa-solid fa-arrow-right-to-bracket mr-1.5"></i> Sign In
                        </a>
                    <?php elseif (isAdmin() && $currentDir === 'admin'): ?>
                        <!-- ADMIN NAV -->
                        <a href="<?= base_url('admin/dashboard.php') ?>" class="px-3 py-2 rounded-xl transition-all <?= $currentPage === 'dashboard.php' ? 'bg-white/15 text-white shadow-sm' : 'text-coffee-200 hover:text-white hover:bg-white/10' ?>">
                            <i class="fa-solid fa-chart-pie mr-1.5 text-amber-gold"></i> Dashboard
                        </a>
                        <a href="<?= base_url('admin/bookings.php') ?>" class="relative px-3 py-2 rounded-xl transition-all <?= $currentPage === 'bookings.php' || $currentPage === 'booking_view.php' ? 'bg-white/15 text-white shadow-sm' : 'text-coffee-200 hover:text-white hover:bg-white/10' ?>">
                            <i class="fa-solid fa-calendar-check mr-1.5 text-caramel"></i> Bookings
                            <?php if ($pendingCount > 0): ?>
                                <span class="ml-1.5 px-2 py-0.5 rounded-full text-[10px] font-black bg-rose-500 text-white animate-pulse">
                                    <?= $pendingCount ?>
                                </span>
                            <?php endif; ?>
                        </a>
                        <a href="<?= base_url('admin/equipment.php') ?>" class="px-3 py-2 rounded-xl transition-all <?= $currentPage === 'equipment.php' ? 'bg-white/15 text-white shadow-sm' : 'text-coffee-200 hover:text-white hover:bg-white/10' ?>">
                            <i class="fa-solid fa-boxes-stacked mr-1.5 opacity-80"></i> Inventory
                        </a>
                        <a href="<?= base_url('admin/packages.php') ?>" class="px-3 py-2 rounded-xl transition-all <?= $currentPage === 'packages.php' ? 'bg-white/15 text-white shadow-sm' : 'text-coffee-200 hover:text-white hover:bg-white/10' ?>">
                            <i class="fa-solid fa-cubes mr-1.5 text-amber-gold"></i> Packages
                        </a>
                        <a href="<?= base_url('admin/returns.php') ?>" class="px-3 py-2 rounded-xl transition-all <?= $currentPage === 'returns.php' ? 'bg-white/15 text-white shadow-sm' : 'text-coffee-200 hover:text-white hover:bg-white/10' ?>">
                            <i class="fa-solid fa-rotate-left mr-1.5 opacity-80"></i> Returns Desk
                        </a>
                        <a href="<?= base_url('admin/maintenance.php') ?>" class="px-3 py-2 rounded-xl transition-all <?= $currentPage === 'maintenance.php' ? 'bg-white/15 text-white shadow-sm' : 'text-coffee-200 hover:text-white hover:bg-white/10' ?>">
                            <i class="fa-solid fa-wrench mr-1.5 opacity-80"></i> Maintenance
                        </a>
                        <a href="<?= base_url('admin/reports.php') ?>" class="px-3 py-2 rounded-xl transition-all <?= $currentPage === 'reports.php' ? 'bg-white/15 text-white shadow-sm' : 'text-coffee-200 hover:text-white hover:bg-white/10' ?>">
                            <i class="fa-solid fa-chart-column mr-1.5 opacity-80"></i> Reports
                        </a>
                        <a href="<?= base_url('user/dashboard.php') ?>" title="Switch to Student / Requester View" class="px-2.5 py-1.5 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-amber-gold border border-white/20 transition-all ml-1.5">
                            <i class="fa-solid fa-shuffle mr-1"></i> Student View
                        </a>
                    <?php else: ?>
                        <!-- USER NAV -->
                        <a href="<?= base_url('user/dashboard.php') ?>" class="px-3 py-2 rounded-xl transition-all <?= $currentPage === 'dashboard.php' ? 'bg-white/15 text-white shadow-sm' : 'text-coffee-200 hover:text-white hover:bg-white/10' ?>">
                            <i class="fa-solid fa-gauge-high mr-1.5 text-amber-gold"></i> Dashboard
                        </a>
                        <a href="<?= base_url('user/packages.php') ?>" class="px-3 py-2 rounded-xl transition-all <?= $currentPage === 'packages.php' ? 'bg-white/15 text-white shadow-sm' : 'text-coffee-200 hover:text-white hover:bg-white/10' ?>">
                            <span class="inline-flex items-center">
                                <i class="fa-solid fa-cubes-stacked mr-1.5 text-caramel"></i> Event Packages
                                <span class="ml-1.5 px-1.5 py-0.2 bg-caramel/30 text-amber-gold border border-caramel/40 text-[9px] rounded font-bold">Star FYP</span>
                            </span>
                        </a>
                        <a href="<?= base_url('user/equipment.php') ?>" class="px-3 py-2 rounded-xl transition-all <?= $currentPage === 'equipment.php' ? 'bg-white/15 text-white shadow-sm' : 'text-coffee-200 hover:text-white hover:bg-white/10' ?>">
                            <i class="fa-solid fa-layer-group mr-1.5 opacity-80"></i> Equipment Catalog
                        </a>
                        <a href="<?= base_url('user/book.php') ?>" class="px-3 py-2 rounded-xl transition-all <?= $currentPage === 'book.php' ? 'bg-white/15 text-white shadow-sm' : 'text-coffee-200 hover:text-white hover:bg-white/10' ?>">
                            <i class="fa-solid fa-calendar-plus mr-1.5 text-emerald-400"></i> New Booking
                        </a>
                        <a href="<?= base_url('user/my_bookings.php') ?>" class="px-3 py-2 rounded-xl transition-all <?= $currentPage === 'my_bookings.php' || $currentPage === 'booking_details.php' ? 'bg-white/15 text-white shadow-sm' : 'text-coffee-200 hover:text-white hover:bg-white/10' ?>">
                            <i class="fa-solid fa-clock-rotate-left mr-1.5 opacity-80"></i> My Bookings
                        </a>
                        <?php if (isAdmin()): ?>
                            <a href="<?= base_url('admin/dashboard.php') ?>" class="px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-gold text-coffee-950 hover:bg-amber-300 transition-all ml-1.5 shadow">
                                <i class="fa-solid fa-shield-halved mr-1"></i> Admin Portal
                                <?php if ($pendingCount > 0): ?>
                                    <span class="ml-1 px-1.5 py-0.2 rounded-full bg-rose-600 text-white text-[10px] font-black"><?= $pendingCount ?></span>
                                <?php endif; ?>
                            </a>
                        <?php endif; ?>
                    <?php endif; ?>
                </nav>

                <!-- Mobile menu button -->
                <div class="flex items-center md:hidden">
                    <button type="button" onclick="document.getElementById('mobile-menu').classList.toggle('hidden')" class="p-2 rounded-xl text-coffee-200 hover:text-white hover:bg-white/10 focus:outline-none">
                        <i class="fa-solid fa-bars text-xl"></i>
                    </button>
                </div>
            </div>
        </div>

        <!-- Mobile Navigation Menu -->
        <div id="mobile-menu" class="hidden md:hidden border-t border-white/10 bg-coffee-950/95 backdrop-blur px-4 pt-3 pb-4 space-y-1.5 text-sm font-semibold">
            <?php if (!isLoggedIn()): ?>
                <a href="<?= base_url('index.php') ?>" class="block px-3 py-2 rounded-lg text-white hover:bg-white/10">Home</a>
                <a href="<?= base_url('user/packages.php') ?>" class="block px-3 py-2 rounded-lg text-amber-gold hover:bg-white/10">Event Packages (Star FYP)</a>
                <a href="<?= base_url('user/equipment.php') ?>" class="block px-3 py-2 rounded-lg text-white hover:bg-white/10">Equipment Catalog</a>
                <a href="<?= base_url('login.php') ?>" class="block px-3 py-2 rounded-lg text-caramel hover:bg-white/10">Sign In</a>
            <?php elseif (isAdmin() && $currentDir === 'admin'): ?>
                <a href="<?= base_url('admin/dashboard.php') ?>" class="block px-3 py-2 rounded-lg text-white hover:bg-white/10">Admin Dashboard</a>
                <a href="<?= base_url('admin/bookings.php') ?>" class="block px-3 py-2 rounded-lg text-white hover:bg-white/10">Bookings (<?= $pendingCount ?>)</a>
                <a href="<?= base_url('admin/equipment.php') ?>" class="block px-3 py-2 rounded-lg text-white hover:bg-white/10">Inventory</a>
                <a href="<?= base_url('admin/packages.php') ?>" class="block px-3 py-2 rounded-lg text-white hover:bg-white/10">Manage Packages</a>
                <a href="<?= base_url('admin/returns.php') ?>" class="block px-3 py-2 rounded-lg text-white hover:bg-white/10">Returns Desk</a>
                <a href="<?= base_url('admin/maintenance.php') ?>" class="block px-3 py-2 rounded-lg text-white hover:bg-white/10">Maintenance</a>
                <a href="<?= base_url('admin/reports.php') ?>" class="block px-3 py-2 rounded-lg text-white hover:bg-white/10">Reports</a>
                <a href="<?= base_url('user/dashboard.php') ?>" class="block px-3 py-2 rounded-lg text-amber-gold hover:bg-white/10">Switch to Student View</a>
            <?php else: ?>
                <a href="<?= base_url('user/dashboard.php') ?>" class="block px-3 py-2 rounded-lg text-white hover:bg-white/10">Dashboard</a>
                <a href="<?= base_url('user/packages.php') ?>" class="block px-3 py-2 rounded-lg text-amber-gold hover:bg-white/10">Event Packages</a>
                <a href="<?= base_url('user/equipment.php') ?>" class="block px-3 py-2 rounded-lg text-white hover:bg-white/10">Equipment Catalog</a>
                <a href="<?= base_url('user/book.php') ?>" class="block px-3 py-2 rounded-lg text-emerald-400 hover:bg-white/10">New Booking</a>
                <a href="<?= base_url('user/my_bookings.php') ?>" class="block px-3 py-2 rounded-lg text-white hover:bg-white/10">My Bookings</a>
                <?php if (isAdmin()): ?>
                    <a href="<?= base_url('admin/dashboard.php') ?>" class="block px-3 py-2 rounded-lg text-amber-gold hover:bg-white/10">Admin Portal</a>
                <?php endif; ?>
            <?php endif; ?>
            <a href="<?= base_url('logout.php') ?>" class="block px-3 py-2 rounded-lg text-rose-300 hover:bg-white/10">Sign Out</a>
        </div>
    </header>

    <!-- Main Content Container -->
    <main class="flex-grow">
