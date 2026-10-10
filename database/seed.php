<?php
// Database Configuration and Seeder
// Smart Event Equipment Booking and Inventory Management System

require_once __DIR__ . '/../config/db.php';

echo "=== Initializing Smart Event Equipment System Database ===\n";

try {
    // 1. Run Schema
    $schemaSql = file_get_contents(__DIR__ . '/schema.sql');
    $pdo->exec($schemaSql);
    echo "✔ Schema tables created successfully!\n";

    // 2. Insert Users
    $passwordHash = password_hash('password123', PASSWORD_BCRYPT);

    $stmt = $pdo->prepare("INSERT INTO users (full_name, matric_staff_id, email, phone, role, user_type, faculty_department, password_hash) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
    
    // Admin 1 (System Admin / Lab Officer)
    $stmt->execute([
        'Madam Jihadah Binti Ahmad',
        'UPTM-STF1023',
        'admin@uptm.edu.my',
        '019-3829102',
        'admin',
        'staff',
        'Faculty of Computing & Multimedia',
        $passwordHash
    ]);
    $adminId = $pdo->lastInsertId();

    // Admin 2 (AV Lab Technician)
    $stmt->execute([
        'En. Khairul Azman Bin Razali',
        'UPTM-TEC2045',
        'khairul@uptm.edu.my',
        '012-8472910',
        'admin',
        'staff',
        'Audio Visual & IT Support Unit',
        $passwordHash
    ]);

    // Student User 1 (The FYP author)
    $stmt->execute([
        'Nursyafiqah Zulaikha Binti Zilkamal',
        'AM2412018113',
        'syafiqah@student.uptm.edu.my',
        '017-6281934',
        'user',
        'student',
        'Faculty of Computing & Multimedia',
        $passwordHash
    ]);
    $syafiqahId = $pdo->lastInsertId();

    // Student User 2 (Club Committee President)
    $stmt->execute([
        'Muhammad Amirul Bin Haziq',
        'AM2412019554',
        'amirul@student.uptm.edu.my',
        '013-9182741',
        'user',
        'committee',
        'Multimedia & Computing Student Club (MCSC)',
        $passwordHash
    ]);
    $amirulId = $pdo->lastInsertId();

    // Lecturer User
    $stmt->execute([
        'Dr. Faridah Binti Mansor',
        'UPTM-LEC5512',
        'faridah@uptm.edu.my',
        '019-4820193',
        'user',
        'lecturer',
        'Department of Computer Science',
        $passwordHash
    ]);

    echo "✔ Users seeded successfully (Default password: password123)!\n";

    // 3. Insert Categories
    $categories = [
        ['Visual & Projection', 'Projectors, motorized screens, large LED displays, and video monitors.', 'fa-video', 'bg-blue-600'],
        ['Audio & Sound Systems', 'Microphones, wireless PA speakers, sound mixers, and conference speakerphones.', 'fa-volume-high', 'bg-emerald-600'],
        ['Computing & IT Hardware', 'Laptops, tablets, networking switches, and interactive smart displays.', 'fa-laptop', 'bg-indigo-600'],
        ['Photography & Media', 'Professional DSLR/Mirrorless cameras, studio lighting, gimbals, and tripods.', 'fa-camera', 'bg-purple-600'],
        ['Presentation & Accessories', 'Wireless clickers, HDMI matrices, extension cables, and whiteboard kits.', 'fa-sliders', 'bg-amber-600']
    ];

    $catStmt = $pdo->prepare("INSERT INTO categories (name, description, icon, color_class) VALUES (?, ?, ?, ?)");
    $catMap = [];
    foreach ($categories as $cat) {
        $catStmt->execute($cat);
        $catMap[$cat[0]] = $pdo->lastInsertId();
    }
    echo "✔ Categories seeded!\n";

    // 4. Insert Equipment
    $equipmentData = [
        // Visual
        [$catMap['Visual & Projection'], 'UPTM-PRJ-001', 'Epson EB-2250U Full HD Projector', 'Epson EB-2250U (5000 Lumens)', 'High brightness projector with HDMI/VGA for large lecture halls and auditoriums.', 5, 4, 'AV Lab Storage B-1', 'Good', 'Available', 'assets/img/projector.jpg'],
        [$catMap['Visual & Projection'], 'UPTM-PRJ-002', 'BenQ Short-Throw Interactive Projector', 'BenQ MW826ST', 'Short throw projector suitable for workshops and interactive small classrooms.', 3, 3, 'AV Lab Storage B-1', 'Good', 'Available', 'assets/img/projector2.jpg'],
        [$catMap['Visual & Projection'], 'UPTM-SCR-001', 'Tripod Portable Projection Screen 84"', 'Grandview 84" Tripod', 'Heavy duty matte white mobile projection screen with carrying case.', 6, 5, 'AV Lab Storage B-3', 'Good', 'Available', 'assets/img/screen.jpg'],
        [$catMap['Visual & Projection'], 'UPTM-MON-001', 'Samsung 55" 4K Mobile Smart Display', 'Samsung Crystal UHD 55 on Mobile Cart', 'Mobile TV cart with 4K display and HDMI/AirPlay support for meetings and presentations.', 2, 2, 'Executive Meeting Room B', 'Good', 'Available', 'assets/img/display.jpg'],

        // Audio
        [$catMap['Audio & Sound Systems'], 'UPTM-MIC-001', 'Shure Dual Wireless Handheld Microphone Kit', 'Shure BLX288/PG58', 'UHF dual-channel wireless microphones with receiver and anti-roll rings.', 8, 7, 'Sound Rack A-1', 'Good', 'Available', 'assets/img/mic.jpg'],
        [$catMap['Audio & Sound Systems'], 'UPTM-MIC-002', 'Rode Wireless GO II Dual Lavalier Mic', 'Rode Wireless GO II', 'Ultra-compact dual wireless clip-on microphone system for hands-free presentations.', 4, 3, 'Sound Rack A-2', 'Good', 'Available', 'assets/img/lavalier.jpg'],
        [$catMap['Audio & Sound Systems'], 'UPTM-SPK-001', 'JBL EON ONE Compact Portable PA System', 'JBL EON ONE Compact', 'Rechargeable battery-powered PA speaker with Bluetooth, 4-channel digital mixer.', 4, 3, 'Audio Storage Area C', 'Good', 'Available', 'assets/img/speaker.jpg'],
        [$catMap['Audio & Sound Systems'], 'UPTM-SPK-002', 'Jabra Speak 750 Conference Speakerphone', 'Jabra Speak 750 USB/Bluetooth', 'Omnidirectional 360-degree microphone and HD speaker for hybrid board meetings.', 3, 3, 'IT Store Shelf 2', 'Good', 'Available', 'assets/img/speakerphone.jpg'],

        // IT & Computing
        [$catMap['Computing & IT Hardware'], 'UPTM-LAP-001', 'Lenovo ThinkPad Core i5 Workshop Laptop', 'ThinkPad L14 Gen 2 (16GB RAM / 512GB SSD)', 'Configured with Microsoft Office, Python, VS Code, and development environments.', 12, 10, 'IT Laptop Cart 1', 'Good', 'Available', 'assets/img/laptop.jpg'],
        [$catMap['Computing & IT Hardware'], 'UPTM-CAM-002', 'Logitech Brio 4K Ultra HD Conference Webcam', 'Logitech Brio Ultra HD 4K', 'Wide-angle webcam with RightLight 3 and HDR for premium virtual meeting clarity.', 4, 4, 'IT Store Shelf 1', 'Good', 'Available', 'assets/img/webcam.jpg'],

        // Photography & Media
        [$catMap['Photography & Media'], 'UPTM-DSLR-001', 'Canon EOS R6 Mirrorless Camera Body + 24-105mm Lens', 'Canon EOS R6 Mark II + RF 24-105mm f/4L', 'Full-frame mirrorless camera for high-res event photography and 4K 60fps video recording.', 3, 2, 'Media Studio Safe 1', 'Good', 'Available', 'assets/img/camera.jpg'],
        [$catMap['Photography & Media'], 'UPTM-TRP-001', 'Manfrotto Professional Video Fluid Head Tripod', 'Manfrotto 504X Fluid Video Head & 645 FAST Tripod', 'Heavy duty fluid head video and camera tripod with quick release plate.', 5, 4, 'Media Studio Rack', 'Good', 'Available', 'assets/img/tripod.jpg'],
        [$catMap['Photography & Media'], 'UPTM-LGT-001', 'Godox SL60W Studio LED Video Light Kit (Pair)', 'Godox SL-60W + Softbox + Light Stands (2x)', '5600K daylight-balanced continuous LED light kit with Bowens mount softboxes and stands.', 3, 2, 'Media Studio Light Room', 'Good', 'Available', 'assets/img/lights.jpg'],
        [$catMap['Photography & Media'], 'UPTM-GMB-001', 'DJI RS 3 Pro 3-Axis Camera Gimbal Stabilizer', 'DJI RS 3 Pro Combo', 'Carbon fiber motorized camera gimbal for smooth cinematic moving event coverage.', 2, 2, 'Media Studio Safe 2', 'Good', 'Available', 'assets/img/gimbal.jpg'],
        [$catMap['Photography & Media'], 'UPTM-MIC-003', 'Rode VideoMic Pro+ Directional Shotgun Mic', 'Rode VideoMic Pro Plus', 'On-camera directional shotgun condenser microphone for crystal clear audio.', 4, 3, 'Media Studio Safe 2', 'Good', 'Available', 'assets/img/shotgun.jpg'],

        // Presentation & Accessories
        [$catMap['Presentation & Accessories'], 'UPTM-CLK-001', 'Logitech Spotlight Wireless Presentation Clicker', 'Logitech Spotlight / R400', 'Ergonomic presentation remote with red laser pointer, slide advance, and timer vibrating alert.', 10, 8, 'AV Lab Storage Drawer A', 'Good', 'Available', 'assets/img/clicker.jpg'],
        [$catMap['Presentation & Accessories'], 'UPTM-PWR-001', 'Heavy Duty 10-Gang 10m Extension Cable Drum', 'Sirim Approved 10-Gang Surge Protected Drum', 'Heavy duty safety industrial power extension cord for workshop booths and event halls.', 8, 6, 'Store Room Electrical Bin', 'Good', 'Available', 'assets/img/power.jpg'],
        [$catMap['Presentation & Accessories'], 'UPTM-CBL-001', 'UGREEN 4K HDMI Kit (10m + 5m + USB-C Hub Switcher)', 'UGREEN HDMI 2.0 Cable & 7-in-1 USB Hub', 'High-speed 4K cables with Type-C to HDMI adapters and 3-port switcher for laptops.', 8, 7, 'AV Lab Cable Drawer', 'Good', 'Available', 'assets/img/cables.jpg']
    ];

    $eqStmt = $pdo->prepare("INSERT INTO equipment (category_id, asset_tag, name, brand_model, description, total_qty, available_qty, location, condition_status, item_status, image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $eqMap = [];
    foreach ($equipmentData as $eq) {
        $eqStmt->execute($eq);
        $eqMap[$eq[1]] = $pdo->lastInsertId();
    }
    echo "✔ Equipment inventory seeded (" . count($equipmentData) . " items)!\n";

    // 5. Insert FYP Event-Based Packages (Objective 2: Predefined packages for at least 4 event types)
    $packagesData = [
        [
            'name' => 'Complete Seminar & Lecture Package',
            'event_type' => 'Seminar',
            'description' => 'Comprehensive AV setup designed for academic seminars, guest lectures, and symposiums in halls or auditoriums. Ensures clear presentation visuals and crisp voice amplification.',
            'target_audience' => 'Academic Seminars, Talk Sessions, Guest Lectures',
            'suggested_attendees' => '50 - 300 pax',
            'icon' => 'fa-chalkboard-user',
            'badge_color' => 'blue',
            'items' => [
                ['tag' => 'UPTM-PRJ-001', 'qty' => 1, 'notes' => 'High lumen main projector'],
                ['tag' => 'UPTM-SCR-001', 'qty' => 1, 'notes' => '84" Tripod projection screen'],
                ['tag' => 'UPTM-MIC-001', 'qty' => 1, 'notes' => 'Dual wireless handheld mics for speakers/Q&A'],
                ['tag' => 'UPTM-SPK-001', 'qty' => 1, 'notes' => 'JBL portable PA system'],
                ['tag' => 'UPTM-CLK-001', 'qty' => 1, 'notes' => 'Presentation clicker with laser pointer'],
                ['tag' => 'UPTM-CBL-001', 'qty' => 1, 'notes' => 'HDMI kit with USB-C adapter']
            ]
        ],
        [
            'name' => 'Interactive Workshop & Hands-on Lab Package',
            'event_type' => 'Workshop',
            'description' => 'Designed for interactive training, coding bootcamps, and technical workshops. Provides participants with computing power, short-throw projection, hands-free lapel mic, and extension power.',
            'target_audience' => 'Coding Bootcamps, Design Labs, Technical Workshops',
            'suggested_attendees' => '20 - 50 pax',
            'icon' => 'fa-laptop-code',
            'badge_color' => 'emerald',
            'items' => [
                ['tag' => 'UPTM-LAP-001', 'qty' => 4, 'notes' => 'Student participant laptops with dev environments'],
                ['tag' => 'UPTM-PRJ-002', 'qty' => 1, 'notes' => 'Short throw workshop projector'],
                ['tag' => 'UPTM-MIC-002', 'qty' => 1, 'notes' => 'Rode wireless clip-on mic for trainer ease of movement'],
                ['tag' => 'UPTM-SPK-001', 'qty' => 1, 'notes' => 'Portable speaker for multimedia audio playback'],
                ['tag' => 'UPTM-PWR-001', 'qty' => 2, 'notes' => 'Extension power drums for participant table stations']
            ]
        ],
        [
            'name' => 'Executive Meeting & Hybrid Boardroom Package',
            'event_type' => 'Meeting',
            'description' => 'Ideal for student council board meetings, committee presentations, and hybrid Google Meet / Zoom meetings. Features 360° voice pickup and high clarity 4K webcam.',
            'target_audience' => 'Committee Meetings, Department Discussions, Hybrid Calls',
            'suggested_attendees' => '10 - 25 pax',
            'icon' => 'fa-handshake',
            'badge_color' => 'indigo',
            'items' => [
                ['tag' => 'UPTM-SPK-002', 'qty' => 1, 'notes' => 'Jabra Speak 750 360-degree conference speakerphone'],
                ['tag' => 'UPTM-CAM-002', 'qty' => 1, 'notes' => 'Logitech Brio 4K conference webcam'],
                ['tag' => 'UPTM-MON-001', 'qty' => 1, 'notes' => '55" 4K Smart Display on mobile trolley'],
                ['tag' => 'UPTM-CLK-001', 'qty' => 1, 'notes' => 'Presentation remote with discreet timer alert'],
                ['tag' => 'UPTM-CBL-001', 'qty' => 1, 'notes' => 'Multi-port USB-C & HDMI conference cables']
            ]
        ],
        [
            'name' => 'Professional Photography & Media Production Package',
            'event_type' => 'Photography',
            'description' => 'Equipped for official event coverage, convocation media, faculty photography sessions, and campus promotional videos with full-frame camera, studio softbox lighting, and gimbal.',
            'target_audience' => 'Event Coverage, Video Interviews, Photo Shoots',
            'suggested_attendees' => 'Media Team & Crews',
            'icon' => 'fa-camera-retro',
            'badge_color' => 'purple',
            'items' => [
                ['tag' => 'UPTM-DSLR-001', 'qty' => 1, 'notes' => 'Canon EOS R6 full-frame mirrorless camera body & lens'],
                ['tag' => 'UPTM-TRP-001', 'qty' => 1, 'notes' => 'Manfrotto fluid head video tripod'],
                ['tag' => 'UPTM-LGT-001', 'qty' => 1, 'notes' => 'Godox studio continuous softbox lighting kit (2x lights)'],
                ['tag' => 'UPTM-GMB-001', 'qty' => 1, 'notes' => 'DJI RS 3 Pro 3-axis camera gimbal stabilizer'],
                ['tag' => 'UPTM-MIC-003', 'qty' => 1, 'notes' => 'Rode directional shotgun mic for crisp video audio']
            ]
        ],
        [
            'name' => 'Campus Outdoor Activities & Sports Day Package',
            'event_type' => 'Sports',
            'description' => 'Compact and portable mobile sound and coordination package for sports tournaments, outdoor carnivals, and student orientation games.',
            'target_audience' => 'Sports Carnival, Campus Runs, Outdoor Festival',
            'suggested_attendees' => '100 - 500 pax',
            'icon' => 'fa-bullhorn',
            'badge_color' => 'amber',
            'items' => [
                ['tag' => 'UPTM-SPK-001', 'qty' => 1, 'notes' => 'Battery-powered JBL outdoor mobile PA speaker'],
                ['tag' => 'UPTM-MIC-001', 'qty' => 1, 'notes' => 'Shure wireless handheld microphones for announcers'],
                ['tag' => 'UPTM-PWR-001', 'qty' => 2, 'notes' => 'Heavy duty weather-resistant cable drums']
            ]
        ]
    ];

    $pkgStmt = $pdo->prepare("INSERT INTO packages (name, event_type, description, target_audience, suggested_attendees, icon, badge_color) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $itemStmt = $pdo->prepare("INSERT INTO package_items (package_id, equipment_id, quantity, notes) VALUES (?, ?, ?, ?)");

    $pkgMap = [];
    foreach ($packagesData as $pkg) {
        $pkgStmt->execute([
            $pkg['name'],
            $pkg['event_type'],
            $pkg['description'],
            $pkg['target_audience'],
            $pkg['suggested_attendees'],
            $pkg['icon'],
            $pkg['badge_color']
        ]);
        $pkgId = $pdo->lastInsertId();
        $pkgMap[$pkg['event_type']] = $pkgId;

        foreach ($pkg['items'] as $item) {
            $eqId = $eqMap[$item['tag']];
            $itemStmt->execute([$pkgId, $eqId, $item['qty'], $item['notes']]);
        }
    }
    echo "✔ Event-Based Packages seeded (All 4 Proposal Requirements + Sports)!\n";

    // 6. Insert Sample Bookings for realistic demo
    $bookingStmt = $pdo->prepare("INSERT INTO bookings (booking_reference, user_id, package_id, event_name, event_type, event_location, expected_attendees, start_datetime, end_datetime, purpose, status, admin_remarks, approved_by, approved_at, issued_at, returned_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $bItemStmt = $pdo->prepare("INSERT INTO booking_items (booking_id, equipment_id, quantity, return_condition, return_notes) VALUES (?, ?, ?, ?, ?)");

    // Booking 1: Pending Request by Syafiqah
    $bookingStmt->execute([
        'UPTM-BK-2026-001',
        $syafiqahId,
        $pkgMap['Seminar'],
        'AI & Cloud Computing Innovation Symposium 2026',
        'Seminar',
        'Dewan Gemilang, Level 2 UPTM',
        120,
        date('Y-m-d 09:00:00', strtotime('+3 days')),
        date('Y-m-d 17:00:00', strtotime('+3 days')),
        'Final Year Project symposium and student presentation showcase for FCM faculty students.',
        'Pending',
        null,
        null,
        null,
        null,
        null
    ]);
    $b1Id = $pdo->lastInsertId();
    $bItemStmt->execute([$b1Id, $eqMap['UPTM-PRJ-001'], 1, null, null]);
    $bItemStmt->execute([$b1Id, $eqMap['UPTM-SCR-001'], 1, null, null]);
    $bItemStmt->execute([$b1Id, $eqMap['UPTM-MIC-001'], 1, null, null]);
    $bItemStmt->execute([$b1Id, $eqMap['UPTM-CLK-001'], 1, null, null]);

    // Booking 2: Approved Request by Amirul
    $bookingStmt->execute([
        'UPTM-BK-2026-002',
        $amirulId,
        $pkgMap['Workshop'],
        'Hands-on Web Development with PHP & MySQL Workshop',
        'Workshop',
        'Computer Lab 4, Block C UPTM',
        35,
        date('Y-m-d 10:00:00', strtotime('+5 days')),
        date('Y-m-d 16:00:00', strtotime('+5 days')),
        'Hands-on workshop organized by Computing Club to train 1st year students on web programming.',
        'Approved',
        'Approved by AV Officer. Please collect equipment 30 minutes before the workshop starts.',
        $adminId,
        date('Y-m-d H:i:s', strtotime('-1 day')),
        null,
        null
    ]);
    $b2Id = $pdo->lastInsertId();
    $bItemStmt->execute([$b2Id, $eqMap['UPTM-LAP-001'], 2, null, null]);
    $bItemStmt->execute([$b2Id, $eqMap['UPTM-MIC-002'], 1, null, null]);
    $bItemStmt->execute([$b2Id, $eqMap['UPTM-PWR-001'], 2, null, null]);

    // Booking 3: Currently Borrowed / Active Loan by Amirul
    $bookingStmt->execute([
        'UPTM-BK-2026-003',
        $amirulId,
        $pkgMap['Photography'],
        'Faculty Dean List Award Ceremony Media Coverage',
        'Photography',
        'Auditorium Perdana, UPTM',
        80,
        date('Y-m-d 08:30:00', strtotime('-2 hours')),
        date('Y-m-d 15:30:00', strtotime('+4 hours')),
        'Official photographic and videographic documentation for faculty award recipients.',
        'Borrowed',
        'Equipment checked out and tested in working condition at 8:15 AM.',
        $adminId,
        date('Y-m-d 08:15:00', strtotime('-2 hours')),
        date('Y-m-d 08:20:00', strtotime('-2 hours')),
        null
    ]);
    $b3Id = $pdo->lastInsertId();
    $bItemStmt->execute([$b3Id, $eqMap['UPTM-DSLR-001'], 1, null, null]);
    $bItemStmt->execute([$b3Id, $eqMap['UPTM-TRP-001'], 1, null, null]);
    $bItemStmt->execute([$b3Id, $eqMap['UPTM-LGT-001'], 1, null, null]);

    // Booking 4: Returned Past Booking by Syafiqah
    $bookingStmt->execute([
        'UPTM-BK-2026-004',
        $syafiqahId,
        $pkgMap['Meeting'],
        'FYP Progress Review & Committee Evaluation',
        'Meeting',
        'Meeting Room B2, Faculty FCM',
        15,
        date('Y-m-d 14:00:00', strtotime('-4 days')),
        date('Y-m-d 17:00:00', strtotime('-4 days')),
        'Project proposal presentation and committee discussion.',
        'Returned',
        'All equipment returned in good and complete condition. No damages found.',
        $adminId,
        date('Y-m-d 13:45:00', strtotime('-4 days')),
        date('Y-m-d 13:50:00', strtotime('-4 days')),
        date('Y-m-d 17:15:00', strtotime('-4 days'))
    ]);
    $b4Id = $pdo->lastInsertId();
    $bItemStmt->execute([$b4Id, $eqMap['UPTM-SPK-002'], 1, 'Good', 'Returned on time, no scratches']);
    $bItemStmt->execute([$b4Id, $eqMap['UPTM-CLK-001'], 1, 'Good', 'Laser pointer functional, batteries replaced']);

    // Log return
    $retStmt = $pdo->prepare("INSERT INTO returns_log (booking_id, equipment_id, received_by, return_datetime, condition_on_return, notes) VALUES (?, ?, ?, ?, ?, ?)");
    $retStmt->execute([$b4Id, $eqMap['UPTM-SPK-002'], $adminId, date('Y-m-d 17:15:00', strtotime('-4 days')), 'Good', 'Clean and working.']);
    $retStmt->execute([$b4Id, $eqMap['UPTM-CLK-001'], $adminId, date('Y-m-d 17:15:00', strtotime('-4 days')), 'Good', 'Clean and working.']);

    // 7. Insert Maintenance Records
    $maintStmt = $pdo->prepare("INSERT INTO maintenance_records (equipment_id, reported_by, issue_description, start_date, completion_date, status, cost, service_vendor, resolution_notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $maintStmt->execute([
        $eqMap['UPTM-PRJ-001'],
        $adminId,
        'Projector lamp flickering after 3,000 operational hours. Bulb needs optical replacement.',
        date('Y-m-d', strtotime('-10 days')),
        date('Y-m-d', strtotime('-2 days')),
        'Completed',
        250.00,
        'Epson Malaysia Authorized Service Centre',
        'Installed original Epson ELPLP96 replacement bulb and cleaned dust filters. Brightness calibrated.'
    ]);

    $maintStmt->execute([
        $eqMap['UPTM-MIC-001'],
        $adminId,
        'Channel B battery housing latch loose and intermittent audio buzz on receiver.',
        date('Y-m-d', strtotime('-1 day')),
        null,
        'In Progress',
        80.00,
        'Audiophile Pro Sound Services',
        'Unit sent to technician for RF filter replacement and housing repair.'
    ]);

    echo "✔ Bookings, Returns Log, and Maintenance Records seeded!\n";
    echo "=== Database Setup Successfully Completed! ===\n";

} catch (PDOException $e) {
    echo "❌ Database Error: " . $e->getMessage() . "\n";
    exit(1);
}
