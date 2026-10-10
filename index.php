<?php
// Landing Page - PinjamGeng
// Smart Event Equipment Booking and Inventory Management System (UPTM)

require_once __DIR__ . '/config/db.php';
require_once __DIR__ . '/config/auth.php';
require_once __DIR__ . '/config/helpers.php';

$pageTitle = "Home • PinjamGeng UPTM";

// Fetch Stats for hero counters
$totalEquip = (int)$pdo->query("SELECT SUM(total_qty) FROM equipment")->fetchColumn();
$availableEquip = (int)$pdo->query("SELECT SUM(available_qty) FROM equipment WHERE item_status = 'Available'")->fetchColumn();
$totalPackages = (int)$pdo->query("SELECT COUNT(*) FROM packages WHERE is_active = 1")->fetchColumn();
$activeBookings = (int)$pdo->query("SELECT COUNT(*) FROM bookings WHERE status IN ('Approved', 'Borrowed')")->fetchColumn();

// Fetch Packages
$packages = $pdo->query("SELECT * FROM packages WHERE is_active = 1 ORDER BY id ASC")->fetchAll();

// Fetch Package Items for display
$pkgItemsMap = [];
$pItemsStmt = $pdo->query("SELECT pi.*, e.name as equipment_name, e.brand_model 
                           FROM package_items pi 
                           JOIN equipment e ON pi.equipment_id = e.id");
while ($row = $pItemsStmt->fetch()) {
    $pkgItemsMap[$row['package_id']][] = $row;
}

// Fetch Categories
$categories = $pdo->query("SELECT c.*, COUNT(e.id) as item_count 
                          FROM categories c 
                          LEFT JOIN equipment e ON c.id = e.category_id 
                          GROUP BY c.id ORDER BY c.id ASC")->fetchAll();

// Fetch Featured Equipment
$featuredItems = $pdo->query("SELECT e.*, c.name as category_name 
                              FROM equipment e 
                              JOIN categories c ON e.category_id = c.id 
                              ORDER BY e.id ASC LIMIT 6")->fetchAll();

include __DIR__ . '/includes/header.php';
?>

<!-- Hero Section with Warm Aesthetic Brown Theme -->
<section class="relative gradient-coffee text-white overflow-hidden py-16 lg:py-24 border-b border-coffee-800 shadow-warm">
    <!-- Ambient Warm Decorative Glow -->
    <div class="absolute -top-32 -left-32 w-96 h-96 bg-caramel/20 rounded-full blur-3xl pointer-events-none"></div>
    <div class="absolute -bottom-32 -right-32 w-96 h-96 bg-amber-gold/15 rounded-full blur-3xl pointer-events-none"></div>

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div class="lg:col-span-7 space-y-6">
                <!-- Academic & Campus Badge -->
                <div class="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-amber-gold">
                    <span class="w-2 h-2 rounded-full bg-amber-gold animate-pulse"></span>
                    <span>UPTM Campus • Final Year Project (FYP) Supervisor: Madam Jihadah</span>
                </div>
                
                <div class="space-y-2">
                    <span class="font-display uppercase tracking-widest text-xs font-black text-caramel block">
                        Smart & Centralized Equipment Booking Platform
                    </span>
                    <h1 class="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15]">
                        Hassle-Free Event Equipment Loans with <span class="text-amber-gold underline decoration-caramel/50 underline-offset-8">PinjamGeng</span>
                    </h1>
                </div>
                
                <p class="text-base sm:text-lg text-coffee-200 max-w-2xl leading-relaxed font-normal">
                    Unsure what projectors, microphones, or cables your seminar requires? <strong>PinjamGeng</strong> provides ready-to-use event packages tailored to your event type (Seminars, Workshops, Meetings, and Media Coverage) with real-time stock checks to prevent scheduling conflicts.
                </p>

                <!-- Action Buttons -->
                <div class="flex flex-wrap gap-4 pt-3">
                    <a href="<?= base_url('user/packages.php') ?>" class="inline-flex items-center px-6 py-3.5 rounded-2xl font-bold bg-gradient-to-r from-caramel to-amber-gold hover:from-caramel-hover hover:to-amber-500 text-coffee-950 shadow-warm hover:shadow-warm-lg transition-all transform hover:-translate-y-0.5">
                        <i class="fa-solid fa-cubes-stacked mr-2.5"></i> Explore Event Packages (Star FYP)
                    </a>
                    <a href="<?= base_url('user/equipment.php') ?>" class="inline-flex items-center px-6 py-3.5 rounded-2xl font-semibold bg-white/10 hover:bg-white/20 text-coffee-100 border border-white/20 backdrop-blur transition-all">
                        <i class="fa-solid fa-layer-group mr-2.5 text-amber-gold"></i> Equipment Catalog
                    </a>
                </div>

                <!-- Academic Metadata Byline -->
                <div class="pt-5 border-t border-coffee-800/80 flex items-center space-x-4 text-xs text-coffee-300">
                    <div class="w-10 h-10 rounded-full bg-coffee-800 border border-coffee-700 flex items-center justify-center text-amber-gold font-bold text-sm">
                        NZ
                    </div>
                    <div>
                        <span class="block text-white font-semibold">Nursyafiqah Zulaikha Binti Zilkamal (AM2412018113)</span>
                        <span class="text-coffee-400">Supervisor: Madam Jihadah Binti Ahmad • Faculty of Computing & Multimedia</span>
                    </div>
                </div>
            </div>

            <!-- Hero Highlights Card (Warm Aesthetic Glass) -->
            <div class="lg:col-span-5">
                <div class="bg-coffee-900/70 backdrop-blur-xl border border-coffee-700/80 rounded-3xl p-6 sm:p-8 text-white shadow-warm-lg space-y-6">
                    <div class="flex items-center justify-between border-b border-coffee-800 pb-4">
                        <h3 class="font-display font-bold text-lg text-amber-gold flex items-center">
                            <i class="fa-solid fa-sparkles mr-2 text-caramel"></i> Quick Demo Access
                        </h3>
                        <span class="text-[11px] bg-emerald-500/20 text-emerald-300 font-bold px-2.5 py-1 rounded-full border border-emerald-500/30">
                            System Online
                        </span>
                    </div>

                    <p class="text-xs text-coffee-200 leading-relaxed">
                        Testing the system for evaluation or demonstration? Select a role below to auto-fill credentials:
                    </p>

                    <div class="space-y-3">
                        <!-- Admin Login Quick Link -->
                        <div class="bg-coffee-950/80 rounded-2xl p-4 border border-coffee-800 flex items-center justify-between hover:border-amber-gold/50 transition-colors">
                            <div>
                                <span class="text-xs font-bold text-amber-gold block font-display">Administrator / AV Lab Officer</span>
                                <span class="text-[11px] text-coffee-300 font-mono">admin@uptm.edu.my</span>
                            </div>
                            <a href="<?= base_url('login.php?fill=admin') ?>" class="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-amber-gold text-coffee-950 hover:bg-amber-400 shadow-sm transition-all flex items-center">
                                Admin Login <i class="fa-solid fa-arrow-right ml-1.5 text-[10px]"></i>
                            </a>
                        </div>

                        <!-- Student Login Quick Link -->
                        <div class="bg-coffee-950/80 rounded-2xl p-4 border border-coffee-800 flex items-center justify-between hover:border-caramel/50 transition-colors">
                            <div>
                                <span class="text-xs font-bold text-coffee-100 block font-display">Student / Club Secretariat</span>
                                <span class="text-[11px] text-coffee-300 font-mono">syafiqah@student.uptm.edu.my</span>
                            </div>
                            <a href="<?= base_url('login.php?fill=student') ?>" class="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-caramel hover:bg-caramel-hover text-white shadow-sm transition-all flex items-center">
                                Student Login <i class="fa-solid fa-arrow-right ml-1.5 text-[10px]"></i>
                            </a>
                        </div>
                    </div>

                    <!-- Mini Metric Counters -->
                    <div class="grid grid-cols-2 gap-3 pt-2 text-center">
                        <div class="bg-white/5 rounded-2xl p-3 border border-white/10">
                            <span class="font-display text-2xl font-black text-white"><?= $availableEquip ?></span>
                            <span class="block text-[11px] text-coffee-300 mt-0.5">Units Available in Store</span>
                        </div>
                        <div class="bg-white/5 rounded-2xl p-3 border border-white/10">
                            <span class="font-display text-2xl font-black text-amber-gold"><?= $totalPackages ?></span>
                            <span class="block text-[11px] text-coffee-300 mt-0.5">Curated Event Packages</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</section>

<!-- "Why PinjamGeng?" Highlights in Warm Aesthetic Cards -->
<section class="py-14 bg-[#fdfbf7] border-b border-coffee-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="text-center max-w-2xl mx-auto mb-10">
            <span class="text-xs font-bold uppercase tracking-wider text-caramel font-display block mb-1">Key Advantages</span>
            <h2 class="font-display text-2xl sm:text-3xl font-extrabold text-coffee-950">
                Solving Traditional Booking Dilemmas
            </h2>
            <p class="text-xs sm:text-sm text-coffee-600 mt-1">
                Transitioning paper-based manual loan forms into a smart, organized digital ecosystem.
            </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div class="p-6 rounded-3xl bg-white border border-coffee-200 shadow-warm hover:shadow-warm-lg hover:border-caramel/60 transition-all group">
                <div class="w-12 h-12 rounded-2xl bg-amber-50 text-caramel flex items-center justify-center text-xl mb-4 group-hover:scale-105 transition-transform">
                    <i class="fa-solid fa-boxes-stacked"></i>
                </div>
                <h3 class="font-display font-bold text-coffee-950 text-base mb-1.5">Curated Event Packages (Star FYP)</h3>
                <p class="text-xs text-coffee-600 leading-relaxed">
                    No more picking equipment piece by piece. Pre-configured packages tailored for Seminars, Workshops, Meetings, and Photography in just one click!
                </p>
            </div>

            <div class="p-6 rounded-3xl bg-white border border-coffee-200 shadow-warm hover:shadow-warm-lg hover:border-caramel/60 transition-all group">
                <div class="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center text-xl mb-4 group-hover:scale-105 transition-transform">
                    <i class="fa-solid fa-calendar-check"></i>
                </div>
                <h3 class="font-display font-bold text-coffee-950 text-base mb-1.5">Real-Time Conflict-Free Booking</h3>
                <p class="text-xs text-coffee-600 leading-relaxed">
                    The system validates equipment availability automatically. Eliminates double-booking and disappointments on the event day.
                </p>
            </div>

            <div class="p-6 rounded-3xl bg-white border border-coffee-200 shadow-warm hover:shadow-warm-lg hover:border-caramel/60 transition-all group">
                <div class="w-12 h-12 rounded-2xl bg-coffee-100 text-coffee-800 flex items-center justify-center text-xl mb-4 group-hover:scale-105 transition-transform">
                    <i class="fa-solid fa-clipboard-check"></i>
                </div>
                <h3 class="font-display font-bold text-coffee-950 text-base mb-1.5">Inspection Desk & Official Slips</h3>
                <p class="text-xs text-coffee-600 leading-relaxed">
                    Dedicated return counter with damage auditing and downloadable official UPTM loan authorization slips.
                </p>
            </div>

        </div>
    </div>
</section>

<!-- Event Packages (Star FYP Feature Section) -->
<section id="packages" class="py-16 bg-[#f7f2ea] border-b border-coffee-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="text-center max-w-3xl mx-auto mb-12">
            <span class="inline-block px-3.5 py-1 rounded-full bg-caramel/15 text-caramel text-xs font-bold uppercase tracking-wider mb-2 font-display">
                Core Innovation • FYP Objective 2
            </span>
            <h2 class="font-display text-3xl sm:text-4xl font-extrabold text-coffee-950 tracking-tight">
                Curated Event Packages
            </h2>
            <p class="mt-2 text-coffee-700 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
                Select your event type. The system automatically loads the exact equipment list directly into your booking form.
            </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <?php foreach ($packages as $pkg): ?>
                <?php $pkgItems = $pkgItemsMap[$pkg['id']] ?? []; ?>
                <div class="bg-white rounded-3xl border border-coffee-200 shadow-warm hover:shadow-warm-lg hover:border-caramel/70 transition-all duration-300 flex flex-col justify-between overflow-hidden group">
                    <!-- Package Card Body -->
                    <div class="p-6">
                        <div class="flex items-center justify-between mb-4">
                            <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-coffee-100 text-coffee-900 border border-coffee-200">
                                <i class="fa-solid <?= sanitize($pkg['icon']) ?> mr-1.5 text-caramel"></i> <?= sanitize($pkg['event_type']) ?>
                            </span>
                            <span class="text-[11px] text-coffee-500 font-medium">
                                <i class="fa-solid fa-users mr-1"></i> <?= sanitize($pkg['suggested_attendees']) ?>
                            </span>
                        </div>

                        <h3 class="font-display font-bold text-coffee-950 text-lg group-hover:text-caramel transition-colors">
                            <?= sanitize($pkg['name']) ?>
                        </h3>

                        <p class="text-xs text-coffee-600 mt-2 line-clamp-3 leading-relaxed">
                            <?= sanitize($pkg['description']) ?>
                        </p>

                        <!-- Items Checklist -->
                        <div class="mt-5 pt-4 border-t border-coffee-100">
                            <span class="text-[10px] font-bold text-coffee-400 uppercase tracking-wider block mb-2 font-display">
                                Included in Package (<?= count($pkgItems) ?> items):
                            </span>
                            <ul class="space-y-1.5 text-xs text-coffee-800">
                                <?php foreach (array_slice($pkgItems, 0, 4) as $item): ?>
                                    <li class="flex items-center">
                                        <i class="fa-solid fa-circle-check text-emerald-600 text-[10px] mr-2 flex-shrink-0"></i>
                                        <span class="truncate font-medium"><?= $item['quantity'] ?>x <?= sanitize($item['equipment_name']) ?></span>
                                    </li>
                                <?php endforeach; ?>
                                <?php if (count($pkgItems) > 4): ?>
                                    <li class="text-[11px] text-caramel font-bold pl-4">
                                        + <?= count($pkgItems) - 4 ?> more items...
                                    </li>
                                <?php endif; ?>
                            </ul>
                        </div>
                    </div>

                    <!-- Package Action -->
                    <div class="p-4 bg-coffee-50 border-t border-coffee-100">
                        <a href="<?= base_url('user/book.php?package_id=' . $pkg['id']) ?>" class="w-full inline-flex items-center justify-center px-4 py-2.5 rounded-2xl text-xs font-bold bg-coffee-900 hover:bg-caramel text-white shadow-sm transition-all">
                            <i class="fa-solid fa-calendar-plus mr-1.5"></i> Book This Package
                        </a>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>

        <div class="mt-10 text-center">
            <a href="<?= base_url('user/packages.php') ?>" class="inline-flex items-center px-5 py-2.5 rounded-2xl text-xs font-bold bg-white border border-coffee-300 text-coffee-800 hover:bg-coffee-100 shadow-sm transition-all">
                View Full Packages & Specifications <i class="fa-solid fa-arrow-right ml-2 text-[10px]"></i>
            </a>
        </div>

    </div>
</section>

<!-- Equipment Catalog Section -->
<section id="catalog" class="py-16 bg-[#fdfbf7]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-8">
            <div>
                <span class="text-xs font-bold text-caramel uppercase tracking-wider font-display">Individual Equipment</span>
                <h2 class="font-display text-2xl sm:text-3xl font-extrabold text-coffee-950 mt-1">UPTM Campus Inventory Catalog</h2>
                <p class="text-xs sm:text-sm text-coffee-600 mt-1">Browse and check individual AV, IT, sound, and media capture equipment.</p>
            </div>
            <div class="mt-4 md:mt-0">
                <a href="<?= base_url('user/equipment.php') ?>" class="text-xs font-bold text-caramel hover:text-caramel-hover inline-flex items-center">
                    View All (<?= $totalEquip ?> units) <i class="fa-solid fa-arrow-right ml-1.5 text-[10px]"></i>
                </a>
            </div>
        </div>

        <!-- Categories Pills -->
        <div class="flex flex-wrap gap-2 mb-8">
            <a href="<?= base_url('user/equipment.php') ?>" class="px-4 py-2 rounded-2xl text-xs font-bold bg-coffee-900 text-white shadow-sm">
                All Categories
            </a>
            <?php foreach ($categories as $cat): ?>
                <a href="<?= base_url('user/equipment.php?category=' . $cat['id']) ?>" class="px-3.5 py-1.5 rounded-2xl text-xs font-medium bg-white text-coffee-800 hover:bg-coffee-100 border border-coffee-200 transition-colors">
                    <i class="fa-solid <?= sanitize($cat['icon']) ?> mr-1.5 text-caramel"></i>
                    <?= sanitize($cat['name']) ?> (<?= $cat['item_count'] ?>)
                </a>
            <?php endforeach; ?>
        </div>

        <!-- Featured Items Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <?php foreach ($featuredItems as $eq): ?>
                <div class="bg-white rounded-3xl border border-coffee-200 p-5 shadow-warm hover:shadow-warm-lg hover:border-caramel/50 transition-all flex flex-col justify-between">
                    <div>
                        <div class="flex items-center justify-between mb-3">
                            <span class="text-[11px] font-mono font-bold text-coffee-600 bg-coffee-100 px-2 py-0.5 rounded-md">
                                <?= sanitize($eq['asset_tag']) ?>
                            </span>
                            <?= equipmentStatusBadge($eq['item_status'], (int)$eq['available_qty']) ?>
                        </div>

                        <h4 class="font-display font-bold text-coffee-950 text-base leading-snug">
                            <?= sanitize($eq['name']) ?>
                        </h4>
                        
                        <p class="text-xs text-caramel font-semibold mt-0.5">
                            <?= sanitize($eq['brand_model']) ?>
                        </p>

                        <p class="text-xs text-coffee-600 mt-2 line-clamp-2 leading-relaxed">
                            <?= sanitize($eq['description']) ?>
                        </p>
                    </div>

                    <div class="mt-5 pt-4 border-t border-coffee-100 flex items-center justify-between text-xs">
                        <div class="text-coffee-500">
                            <i class="fa-solid fa-map-pin mr-1 text-coffee-400"></i> <?= sanitize($eq['location']) ?>
                        </div>
                        <a href="<?= base_url('user/book.php?equipment_id=' . $eq['id']) ?>" class="font-bold text-caramel hover:text-caramel-hover">
                            Select Unit <i class="fa-solid fa-arrow-right ml-1 text-[10px]"></i>
                        </a>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>

    </div>
</section>

<?php include __DIR__ . '/includes/footer.php'; ?>
