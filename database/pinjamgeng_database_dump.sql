-- ==========================================================
-- PinjamGeng Database Dump for Deployment
-- System: Smart Event Equipment Booking and Inventory Management System
-- Faculty of Computing & Multimedia, UPTM
-- Student: Nursyafiqah Zulaikha Binti Zilkamal (AM2412018113)
-- ==========================================================

SET FOREIGN_KEY_CHECKS = 0;
SET SQL_MODE = 'NO_AUTO_VALUE_ON_ZERO';
SET time_zone = '+08:00';

DROP TABLE IF EXISTS `maintenance_records`;
DROP TABLE IF EXISTS `returns_log`;
DROP TABLE IF EXISTS `booking_items`;
DROP TABLE IF EXISTS `bookings`;
DROP TABLE IF EXISTS `package_items`;
DROP TABLE IF EXISTS `packages`;
DROP TABLE IF EXISTS `equipment`;
DROP TABLE IF EXISTS `categories`;
DROP TABLE IF EXISTS `users`;

-- Table structure for `users`
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `full_name` varchar(100) NOT NULL,
  `matric_staff_id` varchar(30) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `role` enum('user','admin') DEFAULT 'user',
  `user_type` enum('student','lecturer','staff','committee') DEFAULT 'student',
  `faculty_department` varchar(100) DEFAULT 'Faculty of Computing & Multimedia',
  `password_hash` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `matric_staff_id` (`matric_staff_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for `users`
INSERT INTO `users` (`id`, `full_name`, `matric_staff_id`, `email`, `phone`, `role`, `user_type`, `faculty_department`, `password_hash`, `created_at`, `updated_at`) VALUES
('1', 'Madam Jihadah Binti Ahmad', 'UPTM-STF1023', 'admin@uptm.edu.my', '019-3829102', 'admin', 'staff', 'Faculty of Computing & Multimedia', '$2y$10$HIOw.qMMAhTBbZzPqaGxWui8481z4vr4KDeSJH75ii5AdowbusFrK', '2026-10-02 18:06:11', '2026-10-02 18:06:11'),
('2', 'En. Khairul Azman Bin Razali', 'UPTM-TEC2045', 'khairul@uptm.edu.my', '012-8472910', 'admin', 'staff', 'Audio Visual & IT Support Unit', '$2y$10$HIOw.qMMAhTBbZzPqaGxWui8481z4vr4KDeSJH75ii5AdowbusFrK', '2026-10-02 18:06:11', '2026-10-02 18:06:11'),
('3', 'Nursyafiqah Zulaikha Binti Zilkamal', 'AM2412018113', 'syafiqah@student.uptm.edu.my', '017-6281934', 'user', 'student', 'Faculty of Computing & Multimedia', '$2y$10$HIOw.qMMAhTBbZzPqaGxWui8481z4vr4KDeSJH75ii5AdowbusFrK', '2026-10-02 18:06:12', '2026-10-02 18:06:12'),
('4', 'Muhammad Amirul Bin Haziq', 'AM2412019554', 'amirul@student.uptm.edu.my', '013-9182741', 'user', 'committee', 'Multimedia & Computing Student Club (MCSC)', '$2y$10$HIOw.qMMAhTBbZzPqaGxWui8481z4vr4KDeSJH75ii5AdowbusFrK', '2026-10-02 18:06:12', '2026-10-02 18:06:12'),
('5', 'Dr. Faridah Binti Mansor', 'UPTM-LEC5512', 'faridah@uptm.edu.my', '019-4820193', 'user', 'lecturer', 'Department of Computer Science', '$2y$10$HIOw.qMMAhTBbZzPqaGxWui8481z4vr4KDeSJH75ii5AdowbusFrK', '2026-10-02 18:06:12', '2026-10-02 18:06:12'),
('6', 'LUQMAN HAKEEM SYAH BIN MOHAMAD NAZRIN', 'AM2412018282', 'kl2412018282@student.uptm.edu.my', '0187765125', 'user', 'student', 'Faculty of Computing & Multimedia', '$2y$10$cw3cq.X4Ee6C35Blst3rBu3b/9L4UCltlmk73/Pvc0NMLJ9SRe75y', '2026-10-02 18:19:48', '2026-10-02 18:19:48');

-- Table structure for `categories`
CREATE TABLE `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `icon` varchar(50) DEFAULT 'fa-box',
  `color_class` varchar(50) DEFAULT 'bg-blue-500',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for `categories`
INSERT INTO `categories` (`id`, `name`, `description`, `icon`, `color_class`, `created_at`) VALUES
('1', 'Visual & Projection', 'Projectors, motorized screens, large LED displays, and video monitors.', 'fa-video', 'bg-blue-600', '2026-10-02 18:06:12'),
('2', 'Audio & Sound Systems', 'Microphones, wireless PA speakers, sound mixers, and conference speakerphones.', 'fa-volume-high', 'bg-emerald-600', '2026-10-02 18:06:12'),
('3', 'Computing & IT Hardware', 'Laptops, tablets, networking switches, and interactive smart displays.', 'fa-laptop', 'bg-indigo-600', '2026-10-02 18:06:12'),
('4', 'Photography & Media', 'Professional DSLR/Mirrorless cameras, studio lighting, gimbals, and tripods.', 'fa-camera', 'bg-purple-600', '2026-10-02 18:06:12'),
('5', 'Presentation & Accessories', 'Wireless clickers, HDMI matrices, extension cables, and whiteboard kits.', 'fa-sliders', 'bg-amber-600', '2026-10-02 18:06:12');

-- Table structure for `equipment`
CREATE TABLE `equipment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category_id` int(11) NOT NULL,
  `asset_tag` varchar(50) NOT NULL,
  `name` varchar(150) NOT NULL,
  `brand_model` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `total_qty` int(11) NOT NULL DEFAULT 1,
  `available_qty` int(11) NOT NULL DEFAULT 1,
  `location` varchar(100) NOT NULL DEFAULT 'Main IT Store / AV Lab',
  `condition_status` enum('Good','Fair','Needs Maintenance','Damaged') DEFAULT 'Good',
  `item_status` enum('Available','Borrowed','Under Maintenance','Damaged','Reserved') DEFAULT 'Available',
  `image_url` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `asset_tag` (`asset_tag`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `equipment_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for `equipment`
INSERT INTO `equipment` (`id`, `category_id`, `asset_tag`, `name`, `brand_model`, `description`, `total_qty`, `available_qty`, `location`, `condition_status`, `item_status`, `image_url`, `created_at`, `updated_at`) VALUES
('1', '1', 'UPTM-PRJ-001', 'Epson EB-2250U Full HD Projector', 'Epson EB-2250U (5000 Lumens)', 'High brightness projector with HDMI/VGA for large lecture halls and auditoriums.', '5', '3', 'AV Lab Storage B-1', 'Good', 'Available', 'assets/img/projector.jpg', '2026-10-02 18:06:12', '2026-10-02 18:29:02'),
('2', '1', 'UPTM-PRJ-002', 'BenQ Short-Throw Interactive Projector', 'BenQ MW826ST', 'Short throw projector suitable for workshops and interactive small classrooms.', '3', '3', 'AV Lab Storage B-1', 'Good', 'Available', 'assets/img/projector2.jpg', '2026-10-02 18:06:12', '2026-10-02 18:06:12'),
('3', '1', 'UPTM-SCR-001', 'Tripod Portable Projection Screen 84\"', 'Grandview 84\" Tripod', 'Heavy duty matte white mobile projection screen with carrying case.', '6', '4', 'AV Lab Storage B-3', 'Good', 'Available', 'assets/img/screen.jpg', '2026-10-02 18:06:12', '2026-10-02 18:29:02'),
('4', '1', 'UPTM-MON-001', 'Samsung 55\" 4K Mobile Smart Display', 'Samsung Crystal UHD 55 on Mobile Cart', 'Mobile TV cart with 4K display and HDMI/AirPlay support for meetings and presentations.', '2', '2', 'Executive Meeting Room B', 'Good', 'Available', 'assets/img/display.jpg', '2026-10-02 18:06:12', '2026-10-02 18:06:12'),
('5', '2', 'UPTM-MIC-001', 'Shure Dual Wireless Handheld Microphone Kit', 'Shure BLX288/PG58', 'UHF dual-channel wireless microphones with receiver and anti-roll rings.', '8', '6', 'Sound Rack A-1', 'Good', 'Available', 'assets/img/mic.jpg', '2026-10-02 18:06:12', '2026-10-02 18:29:02'),
('6', '2', 'UPTM-MIC-002', 'Rode Wireless GO II Dual Lavalier Mic', 'Rode Wireless GO II', 'Ultra-compact dual wireless clip-on microphone system for hands-free presentations.', '4', '3', 'Sound Rack A-2', 'Good', 'Available', 'assets/img/lavalier.jpg', '2026-10-02 18:06:12', '2026-10-02 18:06:12'),
('7', '2', 'UPTM-SPK-001', 'JBL EON ONE Compact Portable PA System', 'JBL EON ONE Compact', 'Rechargeable battery-powered PA speaker with Bluetooth, 4-channel digital mixer.', '4', '2', 'Audio Storage Area C', 'Good', 'Available', 'assets/img/speaker.jpg', '2026-10-02 18:06:12', '2026-10-02 18:29:02'),
('8', '2', 'UPTM-SPK-002', 'Jabra Speak 750 Conference Speakerphone', 'Jabra Speak 750 USB/Bluetooth', 'Omnidirectional 360-degree microphone and HD speaker for hybrid board meetings.', '3', '3', 'IT Store Shelf 2', 'Good', 'Available', 'assets/img/speakerphone.jpg', '2026-10-02 18:06:12', '2026-10-02 18:06:12'),
('9', '3', 'UPTM-LAP-001', 'Lenovo ThinkPad Core i5 Workshop Laptop', 'ThinkPad L14 Gen 2 (16GB RAM / 512GB SSD)', 'Configured with Microsoft Office, Python, VS Code, and development environments.', '12', '10', 'IT Laptop Cart 1', 'Good', 'Available', 'assets/img/laptop.jpg', '2026-10-02 18:06:12', '2026-10-02 18:06:12'),
('10', '3', 'UPTM-CAM-002', 'Logitech Brio 4K Ultra HD Conference Webcam', 'Logitech Brio Ultra HD 4K', 'Wide-angle webcam with RightLight 3 and HDR for premium virtual meeting clarity.', '4', '4', 'IT Store Shelf 1', 'Good', 'Available', 'assets/img/webcam.jpg', '2026-10-02 18:06:12', '2026-10-02 18:06:12'),
('11', '4', 'UPTM-DSLR-001', 'Canon EOS R6 Mirrorless Camera Body + 24-105mm Lens', 'Canon EOS R6 Mark II + RF 24-105mm f/4L', 'Full-frame mirrorless camera for high-res event photography and 4K 60fps video recording.', '3', '2', 'Media Studio Safe 1', 'Good', 'Available', 'assets/img/camera.jpg', '2026-10-02 18:06:12', '2026-10-02 18:06:12'),
('12', '4', 'UPTM-TRP-001', 'Manfrotto Professional Video Fluid Head Tripod', 'Manfrotto 504X Fluid Video Head & 645 FAST Tripod', 'Heavy duty fluid head video and camera tripod with quick release plate.', '5', '4', 'Media Studio Rack', 'Good', 'Available', 'assets/img/tripod.jpg', '2026-10-02 18:06:12', '2026-10-02 18:06:12'),
('13', '4', 'UPTM-LGT-001', 'Godox SL60W Studio LED Video Light Kit (Pair)', 'Godox SL-60W + Softbox + Light Stands (2x)', '5600K daylight-balanced continuous LED light kit with Bowens mount softboxes and stands.', '3', '2', 'Media Studio Light Room', 'Good', 'Available', 'assets/img/lights.jpg', '2026-10-02 18:06:12', '2026-10-02 18:06:12'),
('14', '4', 'UPTM-GMB-001', 'DJI RS 3 Pro 3-Axis Camera Gimbal Stabilizer', 'DJI RS 3 Pro Combo', 'Carbon fiber motorized camera gimbal for smooth cinematic moving event coverage.', '2', '2', 'Media Studio Safe 2', 'Good', 'Available', 'assets/img/gimbal.jpg', '2026-10-02 18:06:12', '2026-10-02 18:06:12'),
('15', '4', 'UPTM-MIC-003', 'Rode VideoMic Pro+ Directional Shotgun Mic', 'Rode VideoMic Pro Plus', 'On-camera directional shotgun condenser microphone for crystal clear audio.', '4', '3', 'Media Studio Safe 2', 'Good', 'Available', 'assets/img/shotgun.jpg', '2026-10-02 18:06:12', '2026-10-02 18:06:12'),
('16', '5', 'UPTM-CLK-001', 'Logitech Spotlight Wireless Presentation Clicker', 'Logitech Spotlight / R400', 'Ergonomic presentation remote with red laser pointer, slide advance, and timer vibrating alert.', '10', '7', 'AV Lab Storage Drawer A', 'Good', 'Available', 'assets/img/clicker.jpg', '2026-10-02 18:06:12', '2026-10-02 18:29:02'),
('17', '5', 'UPTM-PWR-001', 'Heavy Duty 10-Gang 10m Extension Cable Drum', 'Sirim Approved 10-Gang Surge Protected Drum', 'Heavy duty safety industrial power extension cord for workshop booths and event halls.', '8', '6', 'Store Room Electrical Bin', 'Good', 'Available', 'assets/img/power.jpg', '2026-10-02 18:06:12', '2026-10-02 18:06:12'),
('18', '5', 'UPTM-CBL-001', 'UGREEN 4K HDMI Kit (10m + 5m + USB-C Hub Switcher)', 'UGREEN HDMI 2.0 Cable & 7-in-1 USB Hub', 'High-speed 4K cables with Type-C to HDMI adapters and 3-port switcher for laptops.', '8', '6', 'AV Lab Cable Drawer', 'Good', 'Available', 'assets/img/cables.jpg', '2026-10-02 18:06:12', '2026-10-02 18:29:02');

-- Table structure for `packages`
CREATE TABLE `packages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  `event_type` enum('Seminar','Workshop','Meeting','Photography','Sports','Other') NOT NULL,
  `description` text NOT NULL,
  `target_audience` varchar(100) DEFAULT 'Students & Staff',
  `suggested_attendees` varchar(50) DEFAULT '20 - 100 pax',
  `icon` varchar(50) DEFAULT 'fa-cubes',
  `badge_color` varchar(50) DEFAULT 'blue',
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for `packages`
INSERT INTO `packages` (`id`, `name`, `event_type`, `description`, `target_audience`, `suggested_attendees`, `icon`, `badge_color`, `is_active`, `created_at`, `updated_at`) VALUES
('1', 'Complete Seminar & Lecture Package', 'Seminar', 'Comprehensive AV setup designed for academic seminars, guest lectures, and symposiums in halls or auditoriums. Ensures clear presentation visuals and crisp voice amplification.', 'Academic Seminars, Talk Sessions, Guest Lectures', '50 - 300 pax', 'fa-chalkboard-user', 'blue', '1', '2026-10-02 18:06:12', '2026-10-02 18:06:12'),
('2', 'Interactive Workshop & Hands-on Lab Package', 'Workshop', 'Designed for interactive training, coding bootcamps, and technical workshops. Provides participants with computing power, short-throw projection, hands-free lapel mic, and extension power.', 'Coding Bootcamps, Design Labs, Technical Workshops', '20 - 50 pax', 'fa-laptop-code', 'emerald', '1', '2026-10-02 18:06:12', '2026-10-02 18:06:12'),
('3', 'Executive Meeting & Hybrid Boardroom Package', 'Meeting', 'Ideal for student council board meetings, committee presentations, and hybrid Google Meet / Zoom meetings. Features 360° voice pickup and high clarity 4K webcam.', 'Committee Meetings, Department Discussions, Hybrid Calls', '10 - 25 pax', 'fa-handshake', 'indigo', '1', '2026-10-02 18:06:12', '2026-10-02 18:06:12'),
('4', 'Professional Photography & Media Production Package', 'Photography', 'Equipped for official event coverage, convocation media, faculty photography sessions, and campus promotional videos with full-frame camera, studio softbox lighting, and gimbal.', 'Event Coverage, Video Interviews, Photo Shoots', 'Media Team & Crews', 'fa-camera-retro', 'purple', '1', '2026-10-02 18:06:12', '2026-10-02 18:06:12'),
('5', 'Campus Outdoor Activities & Sports Day Package', 'Sports', 'Compact and portable mobile sound and coordination package for sports tournaments, outdoor carnivals, and student orientation games.', 'Sports Carnival, Campus Runs, Outdoor Festival', '100 - 500 pax', 'fa-bullhorn', 'amber', '1', '2026-10-02 18:06:12', '2026-10-02 18:06:12');

-- Table structure for `package_items`
CREATE TABLE `package_items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `package_id` int(11) NOT NULL,
  `equipment_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `notes` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `package_id` (`package_id`),
  KEY `equipment_id` (`equipment_id`),
  CONSTRAINT `package_items_ibfk_1` FOREIGN KEY (`package_id`) REFERENCES `packages` (`id`) ON DELETE CASCADE,
  CONSTRAINT `package_items_ibfk_2` FOREIGN KEY (`equipment_id`) REFERENCES `equipment` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for `package_items`
INSERT INTO `package_items` (`id`, `package_id`, `equipment_id`, `quantity`, `notes`) VALUES
('1', '1', '1', '1', 'High lumen main projector'),
('2', '1', '3', '1', '84\" Tripod projection screen'),
('3', '1', '5', '1', 'Dual wireless handheld mics for speakers/Q&A'),
('4', '1', '7', '1', 'JBL portable PA system'),
('5', '1', '16', '1', 'Presentation clicker with laser pointer'),
('6', '1', '18', '1', 'HDMI kit with USB-C adapter'),
('7', '2', '9', '4', 'Student participant laptops with dev environments'),
('8', '2', '2', '1', 'Short throw workshop projector'),
('9', '2', '6', '1', 'Rode wireless clip-on mic for trainer ease of movement'),
('10', '2', '7', '1', 'Portable speaker for multimedia audio playback'),
('11', '2', '17', '2', 'Extension power drums for participant table stations'),
('12', '3', '8', '1', 'Jabra Speak 750 360-degree conference speakerphone'),
('13', '3', '10', '1', 'Logitech Brio 4K conference webcam'),
('14', '3', '4', '1', '55\" 4K Smart Display on mobile trolley'),
('15', '3', '16', '1', 'Presentation remote with discreet timer alert'),
('16', '3', '18', '1', 'Multi-port USB-C & HDMI conference cables'),
('17', '4', '11', '1', 'Canon EOS R6 full-frame mirrorless camera body & lens'),
('18', '4', '12', '1', 'Manfrotto fluid head video tripod'),
('19', '4', '13', '1', 'Godox studio continuous softbox lighting kit (2x lights)'),
('20', '4', '14', '1', 'DJI RS 3 Pro 3-axis camera gimbal stabilizer'),
('21', '4', '15', '1', 'Rode directional shotgun mic for crisp video audio'),
('22', '5', '7', '1', 'Battery-powered JBL outdoor mobile PA speaker'),
('23', '5', '5', '1', 'Shure wireless handheld microphones for announcers'),
('24', '5', '17', '2', 'Heavy duty weather-resistant cable drums');

-- Table structure for `bookings`
CREATE TABLE `bookings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `booking_reference` varchar(30) NOT NULL,
  `user_id` int(11) NOT NULL,
  `package_id` int(11) DEFAULT NULL,
  `event_name` varchar(150) NOT NULL,
  `event_type` enum('Seminar','Workshop','Meeting','Photography','Sports','Other') NOT NULL,
  `event_location` varchar(150) NOT NULL,
  `expected_attendees` int(11) DEFAULT 0,
  `start_datetime` datetime NOT NULL,
  `end_datetime` datetime NOT NULL,
  `purpose` text NOT NULL,
  `status` enum('Pending','Approved','Rejected','Borrowed','Returned','Cancelled') DEFAULT 'Pending',
  `admin_remarks` text DEFAULT NULL,
  `approved_by` int(11) DEFAULT NULL,
  `approved_at` datetime DEFAULT NULL,
  `issued_at` datetime DEFAULT NULL,
  `returned_at` datetime DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `booking_reference` (`booking_reference`),
  KEY `user_id` (`user_id`),
  KEY `package_id` (`package_id`),
  KEY `approved_by` (`approved_by`),
  CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `bookings_ibfk_2` FOREIGN KEY (`package_id`) REFERENCES `packages` (`id`) ON DELETE SET NULL,
  CONSTRAINT `bookings_ibfk_3` FOREIGN KEY (`approved_by`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for `bookings`
INSERT INTO `bookings` (`id`, `booking_reference`, `user_id`, `package_id`, `event_name`, `event_type`, `event_location`, `expected_attendees`, `start_datetime`, `end_datetime`, `purpose`, `status`, `admin_remarks`, `approved_by`, `approved_at`, `issued_at`, `returned_at`, `created_at`, `updated_at`) VALUES
('1', 'UPTM-BK-2026-001', '3', '1', 'AI & Cloud Computing Innovation Symposium 2026', 'Seminar', 'Dewan Gemilang, Level 2 UPTM', '120', '2026-10-05 09:00:00', '2026-10-05 17:00:00', 'Final Year Project symposium and student presentation showcase for FCM faculty students.', 'Pending', NULL, NULL, NULL, NULL, NULL, '2026-10-02 18:06:12', '2026-10-02 18:06:12'),
('2', 'UPTM-BK-2026-002', '4', '2', 'Hands-on Web Development with PHP & MySQL Workshop', 'Workshop', 'Computer Lab 4, Block C UPTM', '35', '2026-10-07 10:00:00', '2026-10-07 16:00:00', 'Hands-on workshop organized by Computing Club to train 1st year students on web programming.', 'Approved', 'Approved by AV Officer. Please collect equipment 30 minutes before the workshop starts.', '1', '2026-10-01 12:06:12', NULL, NULL, '2026-10-02 18:06:12', '2026-10-02 18:06:12'),
('3', 'UPTM-BK-2026-003', '4', '4', 'Faculty Dean List Award Ceremony Media Coverage', 'Photography', 'Auditorium Perdana, UPTM', '80', '2026-10-02 08:30:00', '2026-10-02 15:30:00', 'Official photographic and videographic documentation for faculty award recipients.', 'Borrowed', 'Equipment checked out and tested in working condition at 8:15 AM.', '1', '2026-10-02 08:15:00', '2026-10-02 08:20:00', NULL, '2026-10-02 18:06:12', '2026-10-02 18:06:12'),
('4', 'UPTM-BK-2026-004', '3', '3', 'FYP Progress Review & Committee Evaluation', 'Meeting', 'Meeting Room B2, Faculty FCM', '15', '2026-09-28 14:00:00', '2026-09-28 17:00:00', 'Project proposal presentation and committee discussion.', 'Returned', 'All equipment returned in good and complete condition. No damages found.', '1', '2026-09-28 13:45:00', '2026-09-28 13:50:00', '2026-09-28 17:15:00', '2026-10-02 18:06:12', '2026-10-02 18:06:12'),
('5', 'UPTM-BK-2026-005', '6', '1', 'University Seminar Session', 'Seminar', 'UPTM HALL 2', '50', '2026-10-03 09:00:00', '2026-10-03 17:00:00', 'teaching student past year questions for spm.', 'Approved', '', '1', '2026-10-02 18:29:02', NULL, NULL, '2026-10-02 18:26:28', '2026-10-02 18:29:02'),
('6', 'UPTM-BK-2026-006', '3', '1', 'Seminar Kecerdasan Buatan PinjamGeng 2026', 'Seminar', 'Dewan Gemilang Aras 2', '80', '2026-10-04 19:28:00', '2026-10-04 23:28:00', 'Mengadakan seminar pendedahan AI kepada pelajar Tahun Akhir UPTM', 'Pending', NULL, NULL, NULL, NULL, NULL, '2026-10-02 19:28:06', '2026-10-02 19:28:06');

-- Table structure for `booking_items`
CREATE TABLE `booking_items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `booking_id` int(11) NOT NULL,
  `equipment_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `return_condition` enum('Good','Fair','Damaged','Lost') DEFAULT NULL,
  `return_notes` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `booking_id` (`booking_id`),
  KEY `equipment_id` (`equipment_id`),
  CONSTRAINT `booking_items_ibfk_1` FOREIGN KEY (`booking_id`) REFERENCES `bookings` (`id`) ON DELETE CASCADE,
  CONSTRAINT `booking_items_ibfk_2` FOREIGN KEY (`equipment_id`) REFERENCES `equipment` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for `booking_items`
INSERT INTO `booking_items` (`id`, `booking_id`, `equipment_id`, `quantity`, `return_condition`, `return_notes`) VALUES
('1', '1', '1', '1', NULL, NULL),
('2', '1', '3', '1', NULL, NULL),
('3', '1', '5', '1', NULL, NULL),
('4', '1', '16', '1', NULL, NULL),
('5', '2', '9', '2', NULL, NULL),
('6', '2', '6', '1', NULL, NULL),
('7', '2', '17', '2', NULL, NULL),
('8', '3', '11', '1', NULL, NULL),
('9', '3', '12', '1', NULL, NULL),
('10', '3', '13', '1', NULL, NULL),
('11', '4', '8', '1', 'Good', 'Returned on time, no scratches'),
('12', '4', '16', '1', 'Good', 'Laser pointer functional, batteries replaced'),
('13', '5', '7', '1', NULL, NULL),
('14', '5', '5', '1', NULL, NULL),
('15', '5', '16', '1', NULL, NULL),
('16', '5', '18', '1', NULL, NULL),
('17', '5', '1', '1', NULL, NULL),
('18', '5', '3', '1', NULL, NULL),
('19', '6', '2', '2', NULL, NULL),
('20', '6', '3', '1', NULL, NULL),
('21', '6', '1', '1', NULL, NULL);

-- Table structure for `returns_log`
CREATE TABLE `returns_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `booking_id` int(11) NOT NULL,
  `equipment_id` int(11) NOT NULL,
  `received_by` int(11) NOT NULL,
  `return_datetime` datetime NOT NULL,
  `condition_on_return` enum('Good','Fair','Damaged','Lost') NOT NULL DEFAULT 'Good',
  `notes` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `booking_id` (`booking_id`),
  KEY `equipment_id` (`equipment_id`),
  KEY `received_by` (`received_by`),
  CONSTRAINT `returns_log_ibfk_1` FOREIGN KEY (`booking_id`) REFERENCES `bookings` (`id`) ON DELETE CASCADE,
  CONSTRAINT `returns_log_ibfk_2` FOREIGN KEY (`equipment_id`) REFERENCES `equipment` (`id`) ON DELETE CASCADE,
  CONSTRAINT `returns_log_ibfk_3` FOREIGN KEY (`received_by`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for `returns_log`
INSERT INTO `returns_log` (`id`, `booking_id`, `equipment_id`, `received_by`, `return_datetime`, `condition_on_return`, `notes`, `created_at`) VALUES
('1', '4', '8', '1', '2026-09-28 17:15:00', 'Good', 'Clean and working.', '2026-10-02 18:06:12'),
('2', '4', '16', '1', '2026-09-28 17:15:00', 'Good', 'Clean and working.', '2026-10-02 18:06:12');

-- Table structure for `maintenance_records`
CREATE TABLE `maintenance_records` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `equipment_id` int(11) NOT NULL,
  `reported_by` int(11) NOT NULL,
  `issue_description` text NOT NULL,
  `start_date` date NOT NULL,
  `completion_date` date DEFAULT NULL,
  `status` enum('Pending','In Progress','Completed','Scrapped') DEFAULT 'Pending',
  `cost` decimal(10,2) DEFAULT 0.00,
  `service_vendor` varchar(150) DEFAULT NULL,
  `resolution_notes` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `equipment_id` (`equipment_id`),
  KEY `reported_by` (`reported_by`),
  CONSTRAINT `maintenance_records_ibfk_1` FOREIGN KEY (`equipment_id`) REFERENCES `equipment` (`id`) ON DELETE CASCADE,
  CONSTRAINT `maintenance_records_ibfk_2` FOREIGN KEY (`reported_by`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for `maintenance_records`
INSERT INTO `maintenance_records` (`id`, `equipment_id`, `reported_by`, `issue_description`, `start_date`, `completion_date`, `status`, `cost`, `service_vendor`, `resolution_notes`, `created_at`, `updated_at`) VALUES
('1', '1', '1', 'Projector lamp flickering after 3,000 operational hours. Bulb needs optical replacement.', '2026-09-22', '2026-09-30', 'Completed', '250.00', 'Epson Malaysia Authorized Service Centre', 'Installed original Epson ELPLP96 replacement bulb and cleaned dust filters. Brightness calibrated.', '2026-10-02 18:06:12', '2026-10-02 18:06:12'),
('2', '5', '1', 'Channel B battery housing latch loose and intermittent audio buzz on receiver.', '2026-10-01', '2026-10-02', 'Completed', '80.00', 'Audiophile Pro Sound Services', '', '2026-10-02 18:06:12', '2026-10-02 18:32:11');

SET FOREIGN_KEY_CHECKS = 1;
-- ==========================================================
-- End of Dump
-- ==========================================================
